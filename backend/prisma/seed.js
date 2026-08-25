/** Seed clearly-labelled demo data for all public API modules. */
import { PrismaClient, Role } from '@prisma/client';
import { startPostgresServer } from '../scripts/startPostgres.js';

await startPostgresServer(5432).catch(() => {});
const prisma = new PrismaClient();

const knowledgeDemos = [
  {
    id: 'demo-std-001', number: 'DEMO-STD-001', title: 'Demo Household Water Container Standard (Fictional)', fileName: 'DEMO-STD-001-fictional.pdf',
    chunks: [
      { id: 'demo-chunk-001-0', content: 'This is fictional demonstration content for testing the BIS knowledge base. It is not an Indian Standard and must not be used for compliance decisions.', pageNumber: 1, sectionTitle: '1 SCOPE' },
      { id: 'demo-chunk-001-1', content: 'Requirements: the demonstration container should be clean, clearly labelled and suitable for the illustrative use case described in this test document.', pageNumber: 2, sectionTitle: '3 REQUIREMENTS' },
    ],
  },
  {
    id: 'demo-std-002', number: 'DEMO-STD-002', title: 'Demo Electrical Plug Guidance (Fictional)', fileName: 'DEMO-STD-002-fictional.pdf',
    chunks: [
      { id: 'demo-chunk-002-0', content: 'This fictional document exists solely to test ingestion, search and source citations. It is not published or approved by BIS.', pageNumber: 1, sectionTitle: '1 INTRODUCTION' },
      { id: 'demo-chunk-002-1', content: 'Safety guidance in this demonstration requires an inspection before the fictional product is placed into the example workflow.', pageNumber: 2, sectionTitle: '4 SAFETY GUIDANCE' },
    ],
  },
];

async function seedKnowledge() {
  for (const demo of knowledgeDemos) {
    const standard = await prisma.knowledgeStandard.upsert({
      where: { number: demo.number },
      update: { title: demo.title },
      create: { id: demo.id, number: demo.number, title: demo.title },
    });
    const documentId = `demo-doc-${demo.number.slice(-3)}`;
    const document = await prisma.standardDocument.upsert({
      where: { id: documentId },
      update: { extractionStatus: 'COMPLETED', pageCount: 2 },
      create: {
        id: documentId, standardId: standard.id, fileName: demo.fileName, fileType: 'application/pdf', filePath: `demo:///${demo.fileName}`,
        sourceUrl: `https://example.invalid/bis-knowledge-${demo.number.slice(-3)}`, documentVersion: 'demo-1.0', pageCount: 2, extractionStatus: 'COMPLETED',
      },
    });
    for (let index = 0; index < demo.chunks.length; index += 1) {
      const chunk = demo.chunks[index];
      await prisma.standardChunk.upsert({
        where: { documentId_chunkIndex: { documentId: document.id, chunkIndex: index } },
        update: { content: chunk.content, pageNumber: chunk.pageNumber, sectionTitle: chunk.sectionTitle },
        create: {
          ...chunk, documentId: document.id, chunkIndex: index,
          metadata: { standardNumber: standard.number, standardTitle: standard.title, documentId: document.id, pageNumber: chunk.pageNumber, sectionTitle: chunk.sectionTitle, sourceUrl: document.sourceUrl },
        },
      });
    }
  }
}

async function main() {
  // Delete dependent records first so this script can be safely re-run.
  await prisma.assistantMessage.deleteMany();
  await prisma.assistantSession.deleteMany();
  await prisma.standardChunk.deleteMany();
  await prisma.standardDocument.deleteMany();
  await prisma.knowledgeStandard.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.complianceCheck.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.testingLab.deleteMany();
  await prisma.standard.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const industryUser = await prisma.user.create({ data: { name: 'Demo Industry Manufacturer', email: 'industry.demo@bis-assistant.local', role: Role.INDUSTRY } });
  const consumerUser = await prisma.user.create({ data: { name: 'Demo Consumer User', email: 'consumer.demo@bis-assistant.local', role: Role.CONSUMER } });
  await prisma.user.create({ data: { name: 'Demo System Admin', email: 'admin.demo@bis-assistant.local', role: Role.ADMIN } });

  const electricalStandard = await prisma.standard.create({ data: { standardNumber: 'IS 13252 (Part 1):2010 [DEMO]', title: 'Information Technology Equipment - Safety - General Requirements (Demo Data)', description: 'DEMO DATA ONLY: Electrical, thermal, and mechanical safety benchmarks for IT appliances.', category: 'Electronics & IT', year: 2010, sourceUrl: 'https://www.services.bis.gov.in/demo' } });
  const waterStandard = await prisma.standard.create({ data: { standardNumber: 'IS 14543:2024 [DEMO]', title: 'Packaged Drinking Water - Specification (Demo Data)', description: 'DEMO DATA ONLY: Microbiological purity and packaging requirements for bottled drinking water.', category: 'Food & Agriculture', year: 2024, sourceUrl: 'https://www.services.bis.gov.in/demo' } });
  const adapter = await prisma.product.create({ data: { name: 'Smart USB-C Fast Charger 65W (Demo)', category: 'Electronics & IT', description: 'DEMO DATA: High-efficiency GaN power adapter.', manufacturer: 'Apex Electronics India Pvt. Ltd. (Demo)' } });
  const water = await prisma.product.create({ data: { name: 'Mineralized Packaged Water 1000ml (Demo)', category: 'Food & Agriculture', description: 'DEMO DATA: Purified bottled water.', manufacturer: 'PureLife Beverages Ltd. (Demo)' } });
  await prisma.certification.createMany({ data: [
    { name: 'BIS Compulsory Registration Scheme Certification (Demo)', description: 'DEMO DATA: Registration grant for electronic equipment.', productId: adapter.id, standardId: electricalStandard.id },
    { name: 'ISI Mark Certification - Packaged Water (Demo)', description: 'DEMO DATA: Product certification license under Scheme I.', productId: water.id, standardId: waterStandard.id },
  ] });
  await prisma.complianceCheck.create({ data: { userId: industryUser.id, productId: adapter.id, status: 'PASSED', score: 94.5, notes: 'DEMO DATA: Electrical isolation and thermal dissipation verified.' } });
  await prisma.testingLab.createMany({ data: [
    { name: 'National Test House - Northern Regional Laboratory (Demo Lab)', location: 'New Delhi', address: 'Plot No. 12, Sector 5, Dwarka, New Delhi - 110075', contact: '+91-11-23456789', website: 'https://nth.gov.in' },
    { name: 'Central Electronics Test & Compliance Lab (Demo Lab)', location: 'Bengaluru', address: 'Electronics City Phase 1, Bengaluru - 560100', contact: '+91-80-87654321', website: 'https://example.invalid/cetcl' },
  ] });
  await prisma.document.create({ data: { userId: industryUser.id, fileName: 'Demo_IS13252_Safety_Test_Report.pdf', fileType: 'application/pdf', fileUrl: 'https://example.invalid/IS13252_report.pdf', status: 'VERIFIED' } });
  await prisma.complaint.create({ data: { userId: consumerUser.id, productId: adapter.id, description: 'DEMO COMPLAINT: Charger runs hot after a continuous high-load test.', status: 'INVESTIGATING' } });
  await prisma.chatSession.createMany({ data: [{ userId: industryUser.id, mode: 'industry' }, { userId: consumerUser.id, mode: 'consumer' }] });
  await seedKnowledge();
  console.log('Seeded API and knowledge-base demo data.');
}

main().catch((error) => { console.error('Seeding failed:', error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
