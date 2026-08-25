import path from 'node:path';
import prisma from '../../lib/prisma.js';
import inMemoryStore from './inMemoryKnowledgeStore.js';
import { extractPdfPages } from './extractionService.js';
import { cleanPageText } from './cleaningService.js';
import { chunkPages } from './chunkingService.js';

const required = (value, label) => {
  if (!value || !String(value).trim()) throw Object.assign(new Error(`${label} is required`), { statusCode: 400 });
  return String(value).trim();
};

export const ingestLocalPdf = async ({ filePath, standardNumber, standardTitle, sourceUrl, documentVersion }) => {
  const resolvedPath = path.resolve(required(filePath, 'filePath'));
  const fileName = path.basename(resolvedPath);
  if (path.extname(fileName).toLowerCase() !== '.pdf') {
    throw Object.assign(new Error('Only PDF files are supported for Phase 2 ingestion'), { statusCode: 400 });
  }

  const sNumber = required(standardNumber, 'standardNumber');
  const sTitle = required(standardTitle, 'standardTitle');

  // Try Prisma / PostgreSQL
  try {
    const standard = await prisma.standard.upsert({
      where: { number: sNumber },
      update: { title: sTitle },
      create: { number: sNumber, title: sTitle },
    });

    const document = await prisma.standardDocument.create({
      data: {
        standardId: standard.id,
        fileName,
        fileType: 'application/pdf',
        filePath: resolvedPath,
        sourceUrl: sourceUrl || null,
        documentVersion: documentVersion || null,
        extractionStatus: 'PENDING',
      },
    });

    try {
      await prisma.standardDocument.update({
        where: { id: document.id },
        data: { extractionStatus: 'PROCESSING' },
      });

      const extractedPages = await extractPdfPages(resolvedPath);
      const cleanedPages = extractedPages
        .map((page) => ({ ...page, text: cleanPageText(page.text) }))
        .filter((page) => page.text);

      const chunks = chunkPages(cleanedPages);
      if (!chunks.length) throw new Error('No chunks could be created from the extracted PDF text.');

      await prisma.$transaction([
        prisma.standardChunk.createMany({
          data: chunks.map((chunk) => ({
            ...chunk,
            documentId: document.id,
            metadata: {
              standardNumber: standard.number,
              standardTitle: standard.title,
              documentId: document.id,
              pageNumber: chunk.pageNumber,
              sectionTitle: chunk.sectionTitle,
              sourceUrl: document.sourceUrl,
            },
          })),
        }),
        prisma.standardDocument.update({
          where: { id: document.id },
          data: { pageCount: extractedPages.length, extractionStatus: 'COMPLETED' },
        }),
      ]);

      return { documentId: document.id, pages: extractedPages.length, chunks: chunks.length, status: 'COMPLETED' };
    } catch (error) {
      await prisma.standardDocument.update({
        where: { id: document.id },
        data: { extractionStatus: 'FAILED' },
      });
      throw error;
    }
  } catch (dbErr) {
    // If DB error was a business logic error from extraction/processing, rethrow
    if (dbErr.statusCode === 400 || (dbErr.message && dbErr.message.includes('PDF'))) {
      throw dbErr;
    }

    // Database server not reachable - fallback to inMemoryStore
    const standard = inMemoryStore.saveStandard(sNumber, sTitle);
    const document = inMemoryStore.saveDocument({
      standardId: standard.id,
      fileName,
      fileType: 'application/pdf',
      filePath: resolvedPath,
      sourceUrl: sourceUrl || null,
      documentVersion: documentVersion || null,
      extractionStatus: 'PENDING',
    });

    try {
      inMemoryStore.updateDocument(document.id, { extractionStatus: 'PROCESSING' });
      const extractedPages = await extractPdfPages(resolvedPath);
      const cleanedPages = extractedPages
        .map((page) => ({ ...page, text: cleanPageText(page.text) }))
        .filter((page) => page.text);

      const chunks = chunkPages(cleanedPages);
      if (!chunks.length) throw new Error('No chunks could be created from the extracted PDF text.');

      const enrichedChunks = chunks.map((chunk) => ({
        ...chunk,
        documentId: document.id,
        metadata: {
          standardNumber: standard.number,
          standardTitle: standard.title,
          documentId: document.id,
          pageNumber: chunk.pageNumber,
          sectionTitle: chunk.sectionTitle,
          sourceUrl: document.sourceUrl,
        },
      }));

      inMemoryStore.saveChunks(enrichedChunks);
      inMemoryStore.updateDocument(document.id, {
        pageCount: extractedPages.length,
        extractionStatus: 'COMPLETED',
      });

      return { documentId: document.id, pages: extractedPages.length, chunks: chunks.length, status: 'COMPLETED' };
    } catch (err) {
      inMemoryStore.updateDocument(document.id, { extractionStatus: 'FAILED' });
      throw err;
    }
  }
};

export default ingestLocalPdf;
