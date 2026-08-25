import prisma from '../lib/prisma.js';
import { ingestLocalPdf } from '../services/knowledge/ingestionService.js';

const source = (chunk) => ({
  documentId: chunk.document.id,
  sourceUrl: chunk.document.sourceUrl,
  fileName: chunk.document.fileName,
  documentVersion: chunk.document.documentVersion,
});
const searchResult = (chunk) => ({ content: chunk.content, pageNumber: chunk.pageNumber, sectionTitle: chunk.sectionTitle, standardNumber: chunk.document.standard.number, standardTitle: chunk.document.standard.title, source: source(chunk) });

export const ingestDocument = async (req, res, next) => {
  try { res.status(201).json({ success: true, data: await ingestLocalPdf(req.body) }); } catch (error) { next(error); }
};

export const searchKnowledge = async (req, res, next) => {
  try {
    const query = String(req.query.q || '').trim();
    if (!query) return res.status(400).json({ success: false, message: 'Query parameter q is required' });
    const chunks = await prisma.standardChunk.findMany({
      where: { OR: [
        { content: { contains: query, mode: 'insensitive' } },
        { sectionTitle: { contains: query, mode: 'insensitive' } },
        { document: { standard: { number: { contains: query, mode: 'insensitive' } } } },
        { document: { standard: { title: { contains: query, mode: 'insensitive' } } } },
      ] },
      include: { document: { include: { standard: true } } }, orderBy: [{ documentId: 'asc' }, { chunkIndex: 'asc' }], take: 50,
    });
    return res.json({ success: true, data: chunks.map(searchResult) });
  } catch (error) { return next(error); }
};

export const getDocument = async (req, res, next) => {
  try {
    const document = await prisma.standardDocument.findUnique({ where: { id: req.params.id }, include: { standard: true, _count: { select: { chunks: true } } } });
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });
    return res.json({ success: true, data: document });
  } catch (error) { return next(error); }
};

export const getChunk = async (req, res, next) => {
  try {
    const chunk = await prisma.standardChunk.findUnique({ where: { id: req.params.id }, include: { document: { include: { standard: true } } } });
    if (!chunk) return res.status(404).json({ success: false, message: 'Chunk not found' });
    return res.json({ success: true, data: { id: chunk.id, chunkIndex: chunk.chunkIndex, content: chunk.content, pageNumber: chunk.pageNumber, sectionTitle: chunk.sectionTitle, metadata: chunk.metadata, standardNumber: chunk.document.standard.number, standardTitle: chunk.document.standard.title, source: source(chunk) } });
  } catch (error) { return next(error); }
};
