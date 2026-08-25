/** Deterministic cleanup only; no model-based correction is performed. */
export const cleanPageText = (text = '') => text
  .replace(/\u0000/g, '')
  .replace(/[\u00ad]/g, '')
  .replace(/[\ufb00-\ufb06]/g, (character) => ({
    '\ufb00': 'ff', '\ufb01': 'fi', '\ufb02': 'fl', '\ufb03': 'ffi', '\ufb04': 'ffl', '\ufb05': 'st', '\ufb06': 'st',
  }[character]))
  .replace(/[^\S\r\n]+/g, ' ')
  .replace(/ *\r?\n */g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

export default cleanPageText;
