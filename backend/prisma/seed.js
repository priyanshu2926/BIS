<<<<<<< HEAD
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
=======
/**
 * @file backend/prisma/seed.js
 * Prisma Database Seeder for BIS AI Assistant.
 * Populates clean, clearly marked demonstration data for testing the API and frontend.
 */

import { PrismaClient, Role } from '@prisma/client';
import { startPostgresServer } from '../scripts/startPostgres.js';

// Auto-start local PostgreSQL wire server if not already running
await startPostgresServer(5432).catch(() => {});

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing records in sensible dependency order
  await prisma.complaint.deleteMany();
  await prisma.complianceCheck.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.testingLab.deleteMany();
  await prisma.standard.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database records.');

  // 2. Seed Users
  const industryUser = await prisma.user.create({
    data: {
      name: 'Demo Industry Manufacturer (Demo)',
      email: 'industry.demo@bis-assistant.local',
      role: Role.INDUSTRY,
    },
  });

  const consumerUser = await prisma.user.create({
    data: {
      name: 'Demo Consumer User (Demo)',
      email: 'consumer.demo@bis-assistant.local',
      role: Role.CONSUMER,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      name: 'Demo System Admin (Demo)',
      email: 'admin.demo@bis-assistant.local',
      role: Role.ADMIN,
    },
  });

  console.log(`👤 Created 3 Users: Industry (${industryUser.id}), Consumer (${consumerUser.id}), Admin (${adminUser.id})`);

  // 3. Seed Standards (Clearly marked as Demo Data)
  const stdPlugs = await prisma.standard.create({
    data: {
      standardNumber: 'IS 1293:2019 [DEMO]',
      title: 'Plugs and Socket-Outlets for Rated Voltage up to 250V (Demo Data)',
      description: 'DEMO DATA ONLY: Specification for household and similar electrical plugs and socket-outlets for testing and verification.',
      category: 'Electrical Engineering',
      year: 2019,
      status: 'Active',
      sourceUrl: 'https://www.services.bis.gov.in/demo',
    },
  });

  const stdWater = await prisma.standard.create({
    data: {
      standardNumber: 'IS 14543:2024 [DEMO]',
      title: 'Packaged Drinking Water (Other than Natural Mineral Water) - Specification (Demo Data)',
      description: 'DEMO DATA ONLY: Safety guidelines, microbiological purity limits, and packaging requirements for bottled drinking water.',
      category: 'Food & Agriculture',
      year: 2024,
      status: 'Active',
      sourceUrl: 'https://www.services.bis.gov.in/demo',
    },
  });

  const stdIT = await prisma.standard.create({
    data: {
      standardNumber: 'IS 13252 (Part 1):2010 [DEMO]',
      title: 'Information Technology Equipment - Safety - General Requirements (Demo Data)',
      description: 'DEMO DATA ONLY: Electrical, thermal, and mechanical safety benchmarks for commercial and consumer IT appliances.',
      category: 'Electronics & IT',
      year: 2010,
      status: 'Active',
      sourceUrl: 'https://www.services.bis.gov.in/demo',
    },
  });

  const stdLED = await prisma.standard.create({
    data: {
      standardNumber: 'IS 15885 (Part 2/Sec 13):2012 [DEMO]',
      title: 'Safety of Lamp Controlgear - Electronic Controlgear for LED Modules (Demo Data)',
      description: 'DEMO DATA ONLY: Construction, insulation resistance, and dielectric requirements for LED drivers and controllers.',
      category: 'Lighting & Electronics',
      year: 2012,
      status: 'Active',
      sourceUrl: 'https://www.services.bis.gov.in/demo',
    },
  });

  console.log('📜 Created 4 Demo Standards.');

  // 4. Seed Products (Demo Products)
  const prodAdapter = await prisma.product.create({
    data: {
      name: 'Smart USB-C Fast Charger 65W (Demo)',
      category: 'Electronics & IT',
      description: 'DEMO DATA: High efficiency GaN power adapter with dual USB-C ports.',
      manufacturer: 'Apex Electronics India Pvt. Ltd. (Demo)',
    },
  });

  const prodWater = await prisma.product.create({
    data: {
      name: 'Mineralized Packaged Water 1000ml (Demo)',
      category: 'Food & Agriculture',
      description: 'DEMO DATA: Purified bottled water with essential added minerals.',
      manufacturer: 'PureLife Beverages Ltd. (Demo)',
    },
  });

  const prodLuminaire = await prisma.product.create({
    data: {
      name: 'EcoBright LED Downlight Panel 15W (Demo)',
      category: 'Lighting & Electronics',
      description: 'DEMO DATA: Energy-efficient indoor recessed ceiling luminaire.',
      manufacturer: 'LumiTech India Innovations (Demo)',
    },
  });

  console.log('📦 Created 3 Demo Products.');

  // 5. Seed Certifications
  const certAdapter = await prisma.certification.create({
    data: {
      name: 'BIS Compulsory Registration Scheme (CRS) Certification (Demo)',
      description: 'DEMO DATA: Registration grant for IT and electronic equipment under Scheme II of BIS Regulations.',
      status: 'Active',
      productId: prodAdapter.id,
      standardId: stdIT.id,
    },
  });

  const certWater = await prisma.certification.create({
    data: {
      name: 'ISI Mark Certification - Packaged Water (Demo)',
      description: 'DEMO DATA: Product certification license for ISI Mark under Scheme I.',
      status: 'Active',
      productId: prodWater.id,
      standardId: stdWater.id,
    },
  });

  console.log('🏅 Created 2 Demo Certifications.');

  // 6. Seed Compliance Checks
  await prisma.complianceCheck.create({
    data: {
      userId: industryUser.id,
      productId: prodAdapter.id,
      status: 'PASSED',
      score: 94.5,
      notes: 'DEMO DATA: Electrical isolation and thermal dissipation verified against IS 13252 test clauses.',
    },
  });

  console.log('✅ Created Demo Compliance Check.');

  // 7. Seed Testing Labs (Demo Labs)
  await prisma.testingLab.createMany({
    data: [
      {
        name: 'National Test House - Northern Regional Laboratory (Demo Lab)',
        location: 'New Delhi',
        address: 'Plot No. 12, Sector 5, Dwarka, New Delhi - 110075',
        contact: '+91-11-23456789, contact@nth-delhi-demo.gov.in',
        website: 'https://nth.gov.in',
      },
      {
        name: 'Central Electronics Test & Compliance Lab (Demo Lab)',
        location: 'Bengaluru',
        address: 'Electronics City Phase 1, Hosur Road, Bengaluru - 560100',
        contact: '+91-80-87654321, info@cetcl-demo.org',
        website: 'https://cetcl-demo.org',
      },
      {
        name: 'Western Regional Food & Water Safety Testing Center (Demo Lab)',
        location: 'Mumbai',
        address: 'MIDC Industrial Area, Andheri East, Mumbai - 400093',
        contact: '+91-22-34567890, support@wr-waterlab-demo.in',
        website: 'https://wr-waterlab-demo.in',
      },
    ],
  });

  console.log('🔬 Created 3 Demo Testing Labs.');

  // 8. Seed Document
  await prisma.document.create({
    data: {
      userId: industryUser.id,
      fileName: 'Demo_IS13252_Safety_Test_Report.pdf',
      fileType: 'application/pdf',
      fileUrl: 'https://example.com/demo/IS13252_report.pdf',
      status: 'VERIFIED',
    },
  });

  console.log('📄 Created 1 Demo Document.');

  // 9. Seed Complaint
  await prisma.complaint.create({
    data: {
      userId: consumerUser.id,
      productId: prodAdapter.id,
      description: 'DEMO COMPLAINT: Charger runs hot after 30 minutes of continuous high load test.',
      status: 'INVESTIGATING',
    },
  });

  console.log('📢 Created 1 Demo Complaint.');

  // 10. Seed Chat Sessions
  await prisma.chatSession.createMany({
    data: [
      { userId: industryUser.id, mode: 'industry' },
      { userId: consumerUser.id, mode: 'consumer' },
    ],
  });

  console.log('💬 Created 2 Demo Chat Sessions.');
  console.log('✨ Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
>>>>>>> ed99aa5029fb2b3f561ad1cc7dee8cdb621096d5
