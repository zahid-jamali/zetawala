import { createWorker } from 'tesseract.js';

/**
 * OCR a screenshot / image buffer to plain text + light markdown.
 * @param {Buffer|Uint8Array} buffer
 * @param {{ lang?: string }} [options]
 * @returns {Promise<{ text: string, markdown: string, confidence?: number }>}
 */
export async function screenshotToText(buffer, options = {}) {
  const lang = options.lang || 'eng';
  const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  let worker;

  try {
    worker = await createWorker(lang);
    const result = await worker.recognize(data);
    const text = (result?.data?.text || '').trim();
    const confidence =
      typeof result?.data?.confidence === 'number' ? result.data.confidence : undefined;

    if (!text) {
      throw new Error(
        'No readable text was found in this image. Try a clearer screenshot or a different language.'
      );
    }

    const markdown = textToLightMarkdown(text);

    return {
      text,
      markdown,
      confidence,
      lang,
    };
  } catch (err) {
    const msg = String(err?.message || err || '');
    if (/No readable text/i.test(msg)) throw err;
    throw new Error(
      'OCR failed. The image may be unclear, unsupported, or the language pack could not load. Please try again.'
    );
  } finally {
    if (worker) {
      try {
        await worker.terminate();
      } catch {
        // ignore terminate errors
      }
    }
  }
}

function textToLightMarkdown(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const t = line.trimEnd();
    const trimmed = t.trim();
    if (!trimmed) {
      if (out.length && out[out.length - 1] !== '') out.push('');
      continue;
    }
    if (/^[-•*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      out.push(trimmed.replace(/^[-•*]\s+/, '- ').replace(/^(\d+)[.)]\s+/, '$1. '));
    } else if (
      trimmed.length <= 60 &&
      (trimmed === trimmed.toUpperCase() || /^[A-Z][^.!?]*$/.test(trimmed))
    ) {
      out.push(`## ${trimmed}`);
    } else {
      out.push(trimmed);
    }
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
