/**
 * @file backend/src/services/assistant/retrievalService.js
 * Retrieval service for Phase 3 BIS RAG pipeline.
 * Extracts relevant BIS standard chunks using PostgreSQL/Prisma or in-memory fallback.
 */

import prisma, { isDatabaseAvailable } from '../../lib/prisma.js';
import inMemoryStore from '../knowledge/inMemoryKnowledgeStore.js';
import config from '../../config/env.js';

/**
 * Tokenizes and extracts keywords from query string.
 * @param {string} text
 * @returns {string[]}
 */
const extractKeywords = (text) => {
  if (!text) return [];
  const stopWords = new Set([
    'what', 'is', 'the', 'of', 'in', 'and', 'for', 'to', 'a', 'an', 'are', 'how', 'do', 'i',
    'can', 'you', 'tell', 'me', 'about', 'this', 'that', 'with', 'on', 'at', 'by', 'from',
    'which', 'standard', 'standards', 'apply', 'applies', 'under', 'please', 'give', 'detail', 'bis',
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3 && !stopWords.has(word));
};

/**
 * Calculates a relevance score for a chunk against query keywords.
 * @param {Object} chunk
 * @param {string[]} keywords
 * @param {string} rawQuery
 * @returns {number}
 */
const scoreChunk = (chunk, keywords, rawQuery) => {
  let score = 0;
  const contentLower = (chunk.content || '').toLowerCase();
  const sectionLower = (chunk.sectionTitle || '').toLowerCase();
  const stdNumberLower = (chunk.standardNumber || chunk.metadata?.standardNumber || '').toLowerCase();
  const stdTitleLower = (chunk.standardTitle || chunk.metadata?.standardTitle || '').toLowerCase();
  const queryLower = rawQuery.toLowerCase();

  // Exact phrase matches receive the highest weight
  if (contentLower.includes(queryLower)) score += 20;
  if (stdNumberLower.includes(queryLower)) score += 25;
  if (stdTitleLower.includes(queryLower)) score += 20;
  if (sectionLower.includes(queryLower)) score += 15;

  // Keyword matches
  for (const keyword of keywords) {
    if (stdNumberLower.includes(keyword)) score += 12;
    if (stdTitleLower.includes(keyword)) score += 8;
    if (sectionLower.includes(keyword)) score += 6;
    if (contentLower.includes(keyword)) score += 3;
  }

  return score;
};

/**
 * Retrieve top relevant BIS standard chunks for a given user query.
 * @param {string} query - User question or query
 * @param {Object} [options={}] - Options like topK and conversation context
 * @returns {Promise<Array<Object>>} Top scored chunks with complete source metadata
 */
export const retrieveRelevantChunks = async (query, { topK = config.ASSISTANT_TOP_K, contextQuery = '' } = {}) => {
  const cleanQuery = String(query || '').trim();
  if (!cleanQuery) return [];

  const combinedSearch = contextQuery ? `${cleanQuery} ${contextQuery}` : cleanQuery;
  const keywords = extractKeywords(combinedSearch);

  let rawChunks = [];

  if (await isDatabaseAvailable()) {
    try {
      const searchTerms = [cleanQuery, ...keywords.slice(0, 4)].filter(Boolean);
      const orClauses = searchTerms.flatMap((term) => [
        { content: { contains: term, mode: 'insensitive' } },
        { sectionTitle: { contains: term, mode: 'insensitive' } },
        { document: { standard: { number: { contains: term, mode: 'insensitive' } } } },
        { document: { standard: { title: { contains: term, mode: 'insensitive' } } } },
      ]);

      const dbResults = await prisma.standardChunk.findMany({
        where: { OR: orClauses },
        include: { document: { include: { standard: true } } },
        take: 50,
      });

      rawChunks = dbResults.map((chunk) => ({
        id: chunk.id,
        chunkIndex: chunk.chunkIndex,
        content: chunk.content,
        pageNumber: chunk.pageNumber,
        sectionTitle: chunk.sectionTitle,
        standardNumber: chunk.document?.standard?.number || chunk.metadata?.standardNumber || '',
        standardTitle: chunk.document?.standard?.title || chunk.metadata?.standardTitle || '',
        documentId: chunk.documentId,
        sourceUrl: chunk.document?.sourceUrl || chunk.metadata?.sourceUrl || null,
        fileName: chunk.document?.fileName || null,
        documentVersion: chunk.document?.documentVersion || null,
      }));
    } catch {
      // Fallback if query execution fails
    }
  }

  // If no DB results, query in-memory store
  if (!rawChunks.length) {
    const memoryMatches = inMemoryStore.search(cleanQuery);
    if (!memoryMatches.length && keywords.length > 0) {
      for (const kw of keywords) {
        const kwMatches = inMemoryStore.search(kw);
        for (const m of kwMatches) {
          if (!memoryMatches.some((existing) => existing.content === m.content)) {
            memoryMatches.push(m);
          }
        }
      }
    }

    rawChunks = memoryMatches.map((m, index) => ({
      id: m.id || `chunk-mem-${index}`,
      chunkIndex: m.chunkIndex ?? index,
      content: m.content,
      pageNumber: m.pageNumber,
      sectionTitle: m.sectionTitle,
      standardNumber: m.standardNumber,
      standardTitle: m.standardTitle,
      documentId: m.source.documentId,
      sourceUrl: m.source.sourceUrl,
      fileName: m.source.fileName,
      documentVersion: m.source.documentVersion,
      metadata: m.metadata,
    }));
  }

  // Score and rank chunks
  const scored = rawChunks.map((chunk) => ({
    ...chunk,
    score: scoreChunk(chunk, keywords, cleanQuery),
  }));

  // Filter chunks with positive relevance and sort descending
  const relevant = scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return relevant;
};

export default { retrieveRelevantChunks };
