/**
 * @file backend/src/services/assistant/citationService.js
 * Citation Service for Phase 3 BIS RAG pipeline.
 * Constructs verified citations directly from database/knowledge-store chunks.
 */

/**
 * Builds verified citations directly from retrieved database chunks.
 * Ensures deduplication by document ID and page number.
 * 
 * @param {Array<Object>} retrievedChunks - Raw retrieved chunks from database/store
 * @returns {Array<Object>} Formatted citation list
 */
export const buildCitations = (retrievedChunks = []) => {
  if (!Array.isArray(retrievedChunks) || retrievedChunks.length === 0) {
    return [];
  }

  const citations = [];
  const seenKeys = new Set();

  for (const chunk of retrievedChunks) {
    const key = `${chunk.documentId || chunk.source?.documentId || 'doc'}_${chunk.pageNumber || 1}_${chunk.sectionTitle || ''}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);

    citations.push({
      id: chunk.id || `chunk-${chunk.chunkIndex || 0}`,
      standardNumber: chunk.standardNumber || chunk.metadata?.standardNumber || 'BIS Standard',
      standardTitle: chunk.standardTitle || chunk.metadata?.standardTitle || 'Indian Standard Specification',
      title: chunk.standardTitle || chunk.metadata?.standardTitle || 'Indian Standard Specification',
      section: chunk.sectionTitle || 'General Requirements',
      sectionTitle: chunk.sectionTitle || 'General Requirements',
      page: chunk.pageNumber || 1,
      pageNumber: chunk.pageNumber || 1,
      documentId: chunk.documentId || chunk.source?.documentId || chunk.id || 'doc-id',
      chunkId: chunk.id || `chunk-${chunk.chunkIndex || 0}`,
      sourceUrl: chunk.sourceUrl || chunk.source?.sourceUrl || chunk.metadata?.sourceUrl || null,
      // UI-friendly aliases, derived only from this retrieved chunk.
      document_id: chunk.standardNumber || chunk.metadata?.standardNumber || 'BIS Standard',
      document_type: 'BIS Standard',
      clause: chunk.sectionTitle || null,
      snippet: chunk.content || '',
      url: chunk.sourceUrl || chunk.source?.sourceUrl || chunk.metadata?.sourceUrl || null,
    });
  }

  return citations;
};

export default { buildCitations };
