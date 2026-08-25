const DEFAULT_CHUNK_SIZE = 900;
const isHeading = (line) => {
  const compact = line.trim();
  return compact.length >= 3 && compact.length <= 120 && (
    /^(\d+(\.\d+)*\.?\s+)?[A-Z][A-Z0-9 ,&/()\-]{2,}$/.test(compact)
    || /^(\d+(\.\d+)*\.?\s+)[A-Z]/.test(compact)
  );
};
const sentences = (text) => text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) || [text];
const splitLongText = (text, maxLength) => {
  const parts = []; let current = '';
  for (const sentence of sentences(text)) {
    const next = current ? `${current} ${sentence.trim()}` : sentence.trim();
    if (current && next.length > maxLength) { parts.push(current); current = sentence.trim(); } else current = next;
  }
  if (current) parts.push(current);
  return parts;
};

/** Chunks independently by page so a chunk can always cite one exact page. */
export const chunkPages = (pages, { chunkSize = DEFAULT_CHUNK_SIZE } = {}) => {
  const chunks = []; let chunkIndex = 0; let latestSectionTitle = null;
  for (const page of pages) {
    const paragraphs = page.text.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean); let buffer = '';
    const flush = () => { if (buffer) { chunks.push({ chunkIndex: chunkIndex++, content: buffer, pageNumber: page.pageNumber, sectionTitle: latestSectionTitle }); buffer = ''; } };
    for (const paragraph of paragraphs) {
      const lines = paragraph.split('\n').map((line) => line.trim()).filter(Boolean);
      if (lines.length && isHeading(lines[0])) {
        flush(); latestSectionTitle = lines[0].replace(/\s+/g, ' '); if (lines.length === 1) continue;
        const rest = lines.slice(1).join(' ');
        for (const part of splitLongText(rest, chunkSize)) { if (buffer && `${buffer} ${part}`.length > chunkSize) flush(); buffer = buffer ? `${buffer} ${part}` : part; }
        continue;
      }
      const normalized = lines.join(' ');
      for (const part of splitLongText(normalized, chunkSize)) { if (buffer && `${buffer}\n\n${part}`.length > chunkSize) flush(); buffer = buffer ? `${buffer}\n\n${part}` : part; }
    }
    flush();
  }
  return chunks;
};
export default chunkPages;
