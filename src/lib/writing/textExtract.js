/**
 * Extract plain text from uploaded DOCX/PDF for writing tools (plagiarism, etc.).
 * No third-party upload — in-memory only.
 */

export async function extractTextFromUpload(file) {
  if (!file) throw new Error('No file provided.');
  const name = (file.name || '').toLowerCase();
  const type = file.type || '';
  const buffer = Buffer.from(await file.arrayBuffer());

  if (
    type === 'application/pdf' ||
    name.endsWith('.pdf')
  ) {
    const { extractText } = await import('unpdf');
    const result = await extractText(new Uint8Array(buffer), { mergePages: true });
    const text = typeof result === 'string' ? result : result?.text || '';
    if (!String(text).trim()) throw new Error('No extractable text found in this PDF.');
    return String(text).trim();
  }

  if (
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    name.endsWith('.docx')
  ) {
    const mammoth = await import('mammoth');
    const { value } = await mammoth.extractRawText({ buffer });
    if (!String(value || '').trim()) throw new Error('No extractable text found in this DOCX.');
    return String(value).trim();
  }

  if (type === 'text/plain' || name.endsWith('.txt')) {
    return buffer.toString('utf8').trim();
  }

  throw new Error('Unsupported file type. Upload PDF, DOCX, or TXT.');
}
