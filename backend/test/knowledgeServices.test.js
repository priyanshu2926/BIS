import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanPageText } from '../src/services/knowledge/cleaningService.js';
import { chunkPages } from '../src/services/knowledge/chunkingService.js';
import inMemoryStore from '../src/services/knowledge/inMemoryKnowledgeStore.js';
import app from '../src/app.js';

test('cleaning retains page text while normalizing whitespace and ligatures', () => {
  assert.equal(cleanPageText('  A\tclean\n\n\npage  '), 'A clean\n\npage');
  assert.equal(cleanPageText('speci\ufb01cation'), 'specification');
});

test('chunking keeps page numbers, order, headings and sentence boundaries', () => {
  const chunks = chunkPages([
    { pageNumber: 5, text: '3 REQUIREMENTS\n\nFirst sentence is retained. Second sentence is retained.' },
    { pageNumber: 6, text: '4 TESTING\n\nA new-page sentence is retained.' },
  ], { chunkSize: 45 });
  assert.deepEqual(chunks.map(({ chunkIndex, pageNumber, sectionTitle }) => ({ chunkIndex, pageNumber, sectionTitle })), [
    { chunkIndex: 0, pageNumber: 5, sectionTitle: '3 REQUIREMENTS' },
    { chunkIndex: 1, pageNumber: 5, sectionTitle: '3 REQUIREMENTS' },
    { chunkIndex: 2, pageNumber: 6, sectionTitle: '4 TESTING' },
  ]);
  assert.ok(chunks[0].content.endsWith('.'));
  assert.equal(chunks[0].pageNumber, 5);
  assert.equal(chunks[2].pageNumber, 6);
});

test('inMemoryStore contains seeded demo standards DEMO-STD-001 and DEMO-STD-002', () => {
  const waterResults = inMemoryStore.search('Water Container');
  assert.ok(waterResults.length > 0);
  assert.equal(waterResults[0].standardNumber, 'DEMO-STD-001');
  assert.ok(waterResults[0].source.documentId);
  assert.ok(waterResults[0].source.sourceUrl);

  const plugResults = inMemoryStore.search('DEMO-STD-002');
  assert.ok(plugResults.length > 0);
  assert.equal(plugResults[0].standardNumber, 'DEMO-STD-002');
  assert.equal(plugResults[0].sectionTitle, '1 INTRODUCTION');
});

test('chunk traceability returns complete source information', () => {
  const chunk = inMemoryStore.findChunkById('demo-chunk-001-0');
  assert.ok(chunk);
  assert.equal(chunk.id, 'demo-chunk-001-0');
  assert.equal(chunk.documentId, 'demo-doc-001');
  assert.equal(chunk.pageNumber, 1);
  assert.equal(chunk.metadata.standardNumber, 'DEMO-STD-001');
  assert.equal(chunk.document.fileName, 'DEMO-STD-001-fictional.pdf');
});

test('HTTP Knowledge APIs return expected schemas', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api/v1`;

  try {
    // 1. Health API
    const healthRes = await fetch(`${baseUrl}/health`);
    assert.equal(healthRes.status, 200);
    const healthJson = await healthRes.json();
    assert.equal(healthJson.success, true);

    // 2. Search Knowledge
    const searchRes = await fetch(`${baseUrl}/knowledge/search?q=compliance`);
    assert.equal(searchRes.status, 200);
    const searchJson = await searchRes.json();
    assert.equal(searchJson.success, true);
    assert.ok(Array.isArray(searchJson.data));
    assert.ok(searchJson.data.length > 0);
    assert.ok(searchJson.data[0].content);
    assert.ok(searchJson.data[0].standardNumber);
    assert.ok(searchJson.data[0].source.documentId);

    // 3. Get Document by ID
    const docRes = await fetch(`${baseUrl}/knowledge/documents/demo-doc-001`);
    assert.equal(docRes.status, 200);
    const docJson = await docRes.json();
    assert.equal(docJson.success, true);
    assert.equal(docJson.data.id, 'demo-doc-001');
    assert.equal(docJson.data.extractionStatus, 'COMPLETED');

    // 4. Get Chunk by ID
    const chunkRes = await fetch(`${baseUrl}/knowledge/chunks/demo-chunk-001-0`);
    assert.equal(chunkRes.status, 200);
    const chunkJson = await chunkRes.json();
    assert.equal(chunkJson.success, true);
    assert.equal(chunkJson.data.id, 'demo-chunk-001-0');
    assert.equal(chunkJson.data.standardNumber, 'DEMO-STD-001');
    assert.equal(chunkJson.data.source.documentId, 'demo-doc-001');
  } finally {
    server.close();
  }
});

test('assistant chat is grounded, persists history, and returns retrieved citations', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api/v1`;

  try {
    const chatRes = await fetch(`${baseUrl}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What are the requirements for the demonstration container?', mode: 'industry' }),
    });
    assert.equal(chatRes.status, 200);
    const chat = await chatRes.json();
    assert.equal(chat.success, true);
    assert.equal(chat.data.mode, 'industry');
    assert.ok(chat.data.answer.includes('demonstration container'));
    assert.ok(chat.data.sources.length > 0);
    assert.equal(chat.data.sources[0].chunkId, 'demo-chunk-001-1');

    const historyRes = await fetch(`${baseUrl}/assistant/sessions/${chat.data.sessionId}`);
    const history = await historyRes.json();
    assert.equal(history.success, true);
    assert.equal(history.data.messages.length, 2);

    const followUpRes = await fetch(`${baseUrl}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What are its requirements?', mode: 'industry', sessionId: chat.data.sessionId }),
    });
    const followUp = await followUpRes.json();
    assert.equal(followUp.success, true);
    assert.ok(followUp.data.sources.some((source) => source.chunkId === 'demo-chunk-001-1'));

    const unknownRes = await fetch(`${baseUrl}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What is the BIS rule for lunar mining permits?', mode: 'consumer' }),
    });
    const unknown = await unknownRes.json();
    assert.equal(unknown.success, true);
    assert.equal(unknown.data.sources.length, 0);
    assert.match(unknown.data.answer, /couldn't find sufficient information/i);
  } finally {
    server.close();
  }
});
