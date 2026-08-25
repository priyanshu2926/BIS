/**
 * @file backend/src/services/knowledge/inMemoryKnowledgeStore.js
 * In-memory fallback knowledge store seeded with clearly fictional demo standards (DEMO-STD-001 and DEMO-STD-002).
 * Ensures zero-configuration developer reliability while PostgreSQL integration is enabled via Prisma.
 */

const DEMO_STANDARDS = [
  {
    id: 'demo-std-001',
    number: 'DEMO-STD-001',
    title: 'Demo Household Water Container Standard (Fictional)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-std-002',
    number: 'DEMO-STD-002',
    title: 'Demo Electrical Plug Guidance (Fictional)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEMO_DOCUMENTS = [
  {
    id: 'demo-doc-001',
    standardId: 'demo-std-001',
    fileName: 'DEMO-STD-001-fictional.pdf',
    fileType: 'application/pdf',
    filePath: 'demo:///DEMO-STD-001-fictional.pdf',
    sourceUrl: 'https://example.invalid/bis-knowledge-demo-001',
    documentVersion: 'demo-1.0',
    pageCount: 2,
    extractionStatus: 'COMPLETED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-doc-002',
    standardId: 'demo-std-002',
    fileName: 'DEMO-STD-002-fictional.pdf',
    fileType: 'application/pdf',
    filePath: 'demo:///DEMO-STD-002-fictional.pdf',
    sourceUrl: 'https://example.invalid/bis-knowledge-demo-002',
    documentVersion: 'demo-1.0',
    pageCount: 2,
    extractionStatus: 'COMPLETED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEMO_CHUNKS = [
  {
    id: 'demo-chunk-001-0',
    documentId: 'demo-doc-001',
    chunkIndex: 0,
    content: 'This is fictional demonstration content for testing the BIS knowledge base. It is not an Indian Standard and must not be used for compliance decisions.',
    pageNumber: 1,
    sectionTitle: '1 SCOPE',
    metadata: {
      standardNumber: 'DEMO-STD-001',
      standardTitle: 'Demo Household Water Container Standard (Fictional)',
      documentId: 'demo-doc-001',
      pageNumber: 1,
      sectionTitle: '1 SCOPE',
      sourceUrl: 'https://example.invalid/bis-knowledge-demo-001',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-chunk-001-1',
    documentId: 'demo-doc-001',
    chunkIndex: 1,
    content: 'Requirements: the demonstration container should be clean, clearly labelled and suitable for the illustrative use case described in this test document.',
    pageNumber: 2,
    sectionTitle: '3 REQUIREMENTS',
    metadata: {
      standardNumber: 'DEMO-STD-001',
      standardTitle: 'Demo Household Water Container Standard (Fictional)',
      documentId: 'demo-doc-001',
      pageNumber: 2,
      sectionTitle: '3 REQUIREMENTS',
      sourceUrl: 'https://example.invalid/bis-knowledge-demo-001',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-chunk-002-0',
    documentId: 'demo-doc-002',
    chunkIndex: 0,
    content: 'This fictional document exists solely to test ingestion, search and source citations. It is not published or approved by BIS.',
    pageNumber: 1,
    sectionTitle: '1 INTRODUCTION',
    metadata: {
      standardNumber: 'DEMO-STD-002',
      standardTitle: 'Demo Electrical Plug Guidance (Fictional)',
      documentId: 'demo-doc-002',
      pageNumber: 1,
      sectionTitle: '1 INTRODUCTION',
      sourceUrl: 'https://example.invalid/bis-knowledge-demo-002',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-chunk-002-1',
    documentId: 'demo-doc-002',
    chunkIndex: 1,
    content: 'Safety guidance in this demonstration requires an inspection before the fictional product is placed into the example workflow.',
    pageNumber: 2,
    sectionTitle: '4 SAFETY GUIDANCE',
    metadata: {
      standardNumber: 'DEMO-STD-002',
      standardTitle: 'Demo Electrical Plug Guidance (Fictional)',
      documentId: 'demo-doc-002',
      pageNumber: 2,
      sectionTitle: '4 SAFETY GUIDANCE',
      sourceUrl: 'https://example.invalid/bis-knowledge-demo-002',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class InMemoryKnowledgeStore {
  constructor() {
    this.standards = [...DEMO_STANDARDS];
    this.documents = [...DEMO_DOCUMENTS];
    this.chunks = [...DEMO_CHUNKS];
  }

  saveStandard(number, title) {
    let std = this.standards.find((s) => s.number.toLowerCase() === number.toLowerCase());
    if (std) {
      std.title = title;
      std.updatedAt = new Date().toISOString();
    } else {
      std = {
        id: `std-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        number,
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.standards.push(std);
    }
    return std;
  }

  saveDocument(data) {
    const doc = {
      id: data.id || `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      standardId: data.standardId,
      fileName: data.fileName,
      fileType: data.fileType || 'application/pdf',
      filePath: data.filePath,
      sourceUrl: data.sourceUrl || null,
      documentVersion: data.documentVersion || null,
      pageCount: data.pageCount || null,
      extractionStatus: data.extractionStatus || 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.documents.push(doc);
    return doc;
  }

  updateDocument(id, updates) {
    const doc = this.documents.find((d) => d.id === id);
    if (doc) {
      Object.assign(doc, updates, { updatedAt: new Date().toISOString() });
    }
    return doc;
  }

  saveChunks(chunkList) {
    for (const chunk of chunkList) {
      const entry = {
        id: chunk.id || `chunk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        documentId: chunk.documentId,
        chunkIndex: chunk.chunkIndex,
        content: chunk.content,
        pageNumber: chunk.pageNumber,
        sectionTitle: chunk.sectionTitle || null,
        metadata: chunk.metadata || {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.chunks.push(entry);
    }
    return chunkList;
  }

  findDocumentById(id) {
    const doc = this.documents.find((d) => d.id === id);
    if (!doc) return null;
    const std = this.standards.find((s) => s.id === doc.standardId);
    const chunkCount = this.chunks.filter((c) => c.documentId === doc.id).length;
    return {
      ...doc,
      standard: std || null,
      _count: { chunks: chunkCount },
    };
  }

  findChunkById(id) {
    const chunk = this.chunks.find((c) => c.id === id);
    if (!chunk) return null;
    const doc = this.documents.find((d) => d.id === chunk.documentId);
    const std = doc ? this.standards.find((s) => s.id === doc.standardId) : null;
    return {
      ...chunk,
      document: doc ? { ...doc, standard: std || null } : null,
    };
  }

  search(query) {
    const q = query.toLowerCase();
    const matches = [];

    for (const chunk of this.chunks) {
      const doc = this.documents.find((d) => d.id === chunk.documentId);
      const std = doc ? this.standards.find((s) => s.id === doc.standardId) : null;

      const stdNumber = std?.number || chunk.metadata?.standardNumber || '';
      const stdTitle = std?.title || chunk.metadata?.standardTitle || '';
      const section = chunk.sectionTitle || '';
      const content = chunk.content || '';

      if (
        content.toLowerCase().includes(q) ||
        section.toLowerCase().includes(q) ||
        stdNumber.toLowerCase().includes(q) ||
        stdTitle.toLowerCase().includes(q)
      ) {
        matches.push({
          id: chunk.id,
          chunkIndex: chunk.chunkIndex,
          content: chunk.content,
          pageNumber: chunk.pageNumber,
          sectionTitle: chunk.sectionTitle,
          standardNumber: stdNumber,
          standardTitle: stdTitle,
          metadata: chunk.metadata,
          source: {
            documentId: doc?.id || chunk.documentId,
            sourceUrl: doc?.sourceUrl || chunk.metadata?.sourceUrl || null,
            fileName: doc?.fileName || null,
            documentVersion: doc?.documentVersion || null,
          },
        });
      }
    }

    return matches;
  }
}

export const inMemoryStore = new InMemoryKnowledgeStore();
export default inMemoryStore;
