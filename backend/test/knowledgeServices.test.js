import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanPageText } from '../src/services/knowledge/cleaningService.js';
import { chunkPages } from '../src/services/knowledge/chunkingService.js';

test('cleaning retains page text while normalizing whitespace', () => {
  assert.equal(cleanPageText('  A\tclean\n\n\npage  '), 'A clean\n\npage');
});

test('chunking keeps page numbers, order, headings and sentence boundaries', () => {
  const chunks = chunkPages([
    { pageNumber: 5, text: '3 REQUIREMENTS\n\nFirst sentence is retained. Second sentence is retained.' },
    { pageNumber: 6, text: '4 TESTING\n\nA new-page sentence is retained.' },
  ], { chunkSize: 45 });
  assert.deepEqual(chunks.map(({ chunkIndex, pageNumber, sectionTitle }) => ({ chunkIndex, pageNumber, sectionTitle })), [
    { chunkIndex: 0, pageNumber: 5, sectionTitle: '3 REQUIREMENTS' }, { chunkIndex: 1, pageNumber: 5, sectionTitle: '3 REQUIREMENTS' }, { chunkIndex: 2, pageNumber: 6, sectionTitle: '4 TESTING' },
  ]);
  assert.ok(chunks[0].content.endsWith('.'));
});
