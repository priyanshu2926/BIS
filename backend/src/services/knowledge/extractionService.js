import fs from 'node:fs/promises';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const pageText = async (page) => {
  const textContent = await page.getTextContent();
  let previousY;
  let output = '';
  for (const item of textContent.items) {
    if (!('str' in item)) continue;
    const y = Math.round(item.transform[5]);
    if (previousY !== undefined && Math.abs(y - previousY) > 2) output += '\n';
    else if (output && !output.endsWith('\n') && item.str && !item.str.startsWith(' ')) output += ' ';
    output += item.str;
    previousY = y;
  }
  return output;
};

/** Returns extracted text as separate pages so page citations remain exact. */
export const extractPdfPages = async (filePath) => {
  const data = new Uint8Array(await fs.readFile(filePath));
  const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    pages.push({ pageNumber, text: await pageText(page) });
  }
  if (!pages.some((page) => page.text.trim())) {
    throw new Error('The PDF contains no extractable text. OCR is not part of this phase.');
  }
  return pages;
};

export default extractPdfPages;
