import prisma, { isDatabaseAvailable } from '../lib/prisma.js';
import inMemoryStore from '../services/knowledge/inMemoryKnowledgeStore.js';
import { ingestLocalPdf } from '../services/knowledge/ingestionService.js';

const source = (chunk) => ({
  documentId: chunk.document?.id || chunk.documentId,
  sourceUrl: chunk.document?.sourceUrl || chunk.metadata?.sourceUrl || null,
  fileName: chunk.document?.fileName || null,
  documentVersion: chunk.document?.documentVersion || null,
});

const searchResult = (chunk) => ({
  content: chunk.content,
  pageNumber: chunk.pageNumber,
  sectionTitle: chunk.sectionTitle,
  standardNumber: chunk.document?.standard?.number || chunk.metadata?.standardNumber || '',
  standardTitle: chunk.document?.standard?.title || chunk.metadata?.standardTitle || '',
  source: source(chunk),
});

export const ingestDocument = async (req, res, next) => {
  try {
    const result = await ingestLocalPdf(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const searchKnowledge = async (req, res, next) => {
  try {
    const query = String(req.query.q || '').trim();
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter q is required' });
    }

    if (await isDatabaseAvailable()) {
      try {
        const chunks = await prisma.standardChunk.findMany({
          where: {
            OR: [
              { content: { contains: query, mode: 'insensitive' } },
              { sectionTitle: { contains: query, mode: 'insensitive' } },
              { document: { standard: { number: { contains: query, mode: 'insensitive' } } } },
              { document: { standard: { title: { contains: query, mode: 'insensitive' } } } },
            ],
          },
          include: { document: { include: { standard: true } } },
          orderBy: [{ documentId: 'asc' }, { chunkIndex: 'asc' }],
          take: 50,
        });

        if (chunks.length > 0) {
          return res.json({ success: true, data: chunks.map(searchResult) });
        }
      } catch {
        // Fallback to inMemoryStore if query failed
      }
    }

    const fallbackResults = inMemoryStore.search(query);
    return res.json({ success: true, data: fallbackResults });
  } catch (error) {
    return next(error);
  }
};

export const getDocument = async (req, res, next) => {
  try {
    if (await isDatabaseAvailable()) {
      try {
        const document = await prisma.standardDocument.findUnique({
          where: { id: req.params.id },
          include: { standard: true, _count: { select: { chunks: true } } },
        });
        if (document) return res.json({ success: true, data: document });
      } catch {
        // Fallback to inMemoryStore
      }
    }

    const fallbackDoc = inMemoryStore.findDocumentById(req.params.id);
    if (!fallbackDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    return res.json({ success: true, data: fallbackDoc });
  } catch (error) {
    return next(error);
  }
};

export const getChunk = async (req, res, next) => {
  try {
    if (await isDatabaseAvailable()) {
      try {
        const chunk = await prisma.standardChunk.findUnique({
          where: { id: req.params.id },
          include: { document: { include: { standard: true } } },
        });
        if (chunk) {
          return res.json({
            success: true,
            data: {
              id: chunk.id,
              chunkIndex: chunk.chunkIndex,
              content: chunk.content,
              pageNumber: chunk.pageNumber,
              sectionTitle: chunk.sectionTitle,
              metadata: chunk.metadata,
              standardNumber: chunk.document?.standard?.number || '',
              standardTitle: chunk.document?.standard?.title || '',
              source: source(chunk),
            },
          });
        }
      } catch {
        // Fallback to inMemoryStore
      }
    }

    const fallbackChunk = inMemoryStore.findChunkById(req.params.id);
    if (!fallbackChunk) {
      return res.status(404).json({ success: false, message: 'Chunk not found' });
    }
    return res.json({
      success: true,
      data: {
        id: fallbackChunk.id,
        chunkIndex: fallbackChunk.chunkIndex,
        content: fallbackChunk.content,
        pageNumber: fallbackChunk.pageNumber,
        sectionTitle: fallbackChunk.sectionTitle,
        metadata: fallbackChunk.metadata,
        standardNumber: fallbackChunk.document?.standard?.number || fallbackChunk.metadata?.standardNumber || '',
        standardTitle: fallbackChunk.document?.standard?.title || fallbackChunk.metadata?.standardTitle || '',
        source: source(fallbackChunk),
      },
    });
  } catch (error) {
    return next(error);
  }
};
