import prisma from '../src/lib/prisma.js';

const demos = [
  { number: 'DEMO-STD-001', title: 'Demo Household Water Container Standard (Fictional)', fileName: 'DEMO-STD-001-fictional.pdf', chunks: [
    { content: 'This is fictional demonstration content for testing the BIS knowledge base. It is not an Indian Standard and must not be used for compliance decisions.', pageNumber: 1, sectionTitle: '1 SCOPE' },
    { content: 'Requirements: the demonstration container should be clean, clearly labelled and suitable for the illustrative use case described in this test document.', pageNumber: 2, sectionTitle: '3 REQUIREMENTS' },
  ] },
  { number: 'DEMO-STD-002', title: 'Demo Electrical Plug Guidance (Fictional)', fileName: 'DEMO-STD-002-fictional.pdf', chunks: [
    { content: 'This fictional document exists solely to test ingestion, search and source citations. It is not published or approved by BIS.', pageNumber: 1, sectionTitle: '1 INTRODUCTION' },
    { content: 'Safety guidance in this demonstration requires an inspection before the fictional product is placed into the example workflow.', pageNumber: 2, sectionTitle: '4 SAFETY GUIDANCE' },
  ] },
];

for (const demo of demos) {
  const standard = await prisma.standard.upsert({ where: { number: demo.number }, update: { title: demo.title }, create: { number: demo.number, title: demo.title } });
  const document = await prisma.standardDocument.upsert({
    where: { id: `demo-${demo.number.toLowerCase()}` }, update: { extractionStatus: 'COMPLETED', pageCount: 2 },
    create: { id: `demo-${demo.number.toLowerCase()}`, standardId: standard.id, fileName: demo.fileName, fileType: 'application/pdf', filePath: `demo:///${demo.fileName}`, sourceUrl: 'https://example.invalid/bis-knowledge-demo', documentVersion: 'demo-1.0', pageCount: 2, extractionStatus: 'COMPLETED' },
  });
  for (let index = 0; index < demo.chunks.length; index += 1) {
    const chunk = demo.chunks[index];
    await prisma.standardChunk.upsert({
      where: { documentId_chunkIndex: { documentId: document.id, chunkIndex: index } }, update: { content: chunk.content, pageNumber: chunk.pageNumber, sectionTitle: chunk.sectionTitle },
      create: { documentId: document.id, chunkIndex: index, ...chunk, metadata: { standardNumber: standard.number, standardTitle: standard.title, documentId: document.id, pageNumber: chunk.pageNumber, sectionTitle: chunk.sectionTitle, sourceUrl: document.sourceUrl } },
    });
  }
}
console.log('Seeded two clearly fictional DEMO-STD knowledge documents.');
await prisma.$disconnect();
