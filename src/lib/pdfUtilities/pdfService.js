import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFArray,
  PDFString,
  PDFHexString,
} from 'pdf-lib';
import {
  extractText,
  getDocumentProxy,
  extractImages,
  getMeta,
  extractLinks as unpdfExtractLinks,
} from 'unpdf';

const MAX_IMAGES = 30;

function friendlyPdfError(err) {
  const msg = String(err?.message || err || '');
  if (/password|encrypt/i.test(msg)) {
    return new Error(
      'This PDF is password-protected or encrypted. Please unlock it and try again.'
    );
  }
  if (/Invalid PDF|corrupt|Unexpected|xref|trailer/i.test(msg)) {
    return new Error('This PDF appears to be corrupt or unreadable. Please try another file.');
  }
  return err instanceof Error ? err : new Error(msg || 'Failed to process PDF.');
}

function toUint8Array(buffer) {
  // unpdf rejects Node Buffer (a Uint8Array subclass) — always hand it a plain Uint8Array
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(buffer)) {
    return new Uint8Array(buffer);
  }
  if (buffer instanceof Uint8Array) return new Uint8Array(buffer);
  return new Uint8Array(buffer);
}

function isAllCaps(line) {
  const letters = line.replace(/[^A-Za-z]/g, '');
  return letters.length >= 3 && letters === letters.toUpperCase();
}

function isTitleCase(line) {
  const words = line.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 12) return false;
  return words.every((w) => /^[A-Z][a-z'’\-]*$/.test(w) || /^[A-Z]{2,}$/.test(w));
}

function looksLikeHeading(line) {
  const t = line.trim();
  if (!t || t.length > 80) return false;
  if (/^[\d]+[.)]\s/.test(t)) return false;
  if (/^[•\-\*\u2022]/.test(t)) return false;
  return isAllCaps(t) || isTitleCase(t);
}

function looksLikeBullet(line) {
  return /^\s*(?:[•\-\*\u2022]|\d+[.)])\s+/.test(line);
}

function splitTableColumns(line) {
  if (line.includes('\t')) {
    return line.split(/\t+/).map((c) => c.trim()).filter(Boolean);
  }
  const parts = line.trim().split(/\s{2,}/).map((c) => c.trim()).filter(Boolean);
  return parts.length >= 2 ? parts : null;
}

function pageTextToMarkdown(pageText) {
  const lines = String(pageText || '').split(/\r?\n/);
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      if (out.length && out[out.length - 1] !== '') out.push('');
      i += 1;
      continue;
    }

    // Detect aligned table blocks
    const cols = splitTableColumns(trimmed);
    if (cols && cols.length >= 2) {
      const start = i;
      const rows = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) break;
        const c = splitTableColumns(t);
        if (!c || c.length < 2) break;
        rows.push(c);
        i += 1;
      }
      if (rows.length >= 2) {
        const width = Math.max(...rows.map((r) => r.length));
        const norm = rows.map((r) => {
          const copy = [...r];
          while (copy.length < width) copy.push('');
          return copy;
        });
        out.push(`| ${norm[0].join(' | ')} |`);
        out.push(`| ${norm[0].map(() => '---').join(' | ')} |`);
        for (let r = 1; r < norm.length; r += 1) {
          out.push(`| ${norm[r].join(' | ')} |`);
        }
        out.push('');
        continue;
      }
      // Not enough rows — fall through as normal lines
      i = start;
    }

    if (looksLikeBullet(trimmed)) {
      let item = trimmed.replace(/^\s*[•\-\*\u2022]\s+/, '- ');
      item = item.replace(/^\s*(\d+)[.)]\s+/, '$1. ');
      out.push(item.startsWith('-') || /^\d+\.\s/.test(item) ? item : `- ${item}`);
      i += 1;
      continue;
    }

    if (looksLikeHeading(trimmed)) {
      const level = isAllCaps(trimmed) && trimmed.length <= 40 ? '#' : '##';
      out.push(`${level} ${trimmed}`);
      out.push('');
      i += 1;
      continue;
    }

    // Paragraph: gather consecutive non-blank, non-special lines
    const para = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || looksLikeHeading(next) || looksLikeBullet(next) || splitTableColumns(next)?.length >= 2) {
        break;
      }
      para.push(next);
      i += 1;
    }
    out.push(para.join(' '));
    out.push('');
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function extractTablesFromPageText(pageText, page) {
  const lines = String(pageText || '').split(/\r?\n/);
  const tables = [];
  let current = [];

  const flush = () => {
    if (current.length >= 2) {
      const width = Math.max(...current.map((r) => r.length));
      if (width >= 2) {
        tables.push({
          page,
          rows: current.map((r) => {
            const copy = [...r];
            while (copy.length < width) copy.push('');
            return copy;
          }),
        });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    const cols = splitTableColumns(trimmed);
    if (cols && cols.length >= 2) {
      current.push(cols);
    } else {
      flush();
    }
  }
  flush();
  return tables;
}

const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_RE = /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}\b/g;
const URL_RE = /\bhttps?:\/\/[^\s<>"'）)]+/gi;

function dedupeLinks(links) {
  const seen = new Set();
  return links.filter((l) => {
    const key = `${l.type}:${String(l.value).toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @returns {Promise<{ markdown: string, pageCount: number }>}
 */
export async function pdfToMarkdown(buffer) {
  try {
    const data = toUint8Array(buffer);
    const { totalPages, text } = await extractText(data, { mergePages: false });
    const pages = Array.isArray(text) ? text : [text];
    const parts = pages.map((pageText, idx) => {
      const md = pageTextToMarkdown(pageText);
      return md ? `<!-- Page ${idx + 1} -->\n\n${md}` : `<!-- Page ${idx + 1} -->\n\n`;
    });
    return {
      markdown: parts.join('\n\n').trim(),
      pageCount: totalPages || pages.length,
    };
  } catch (err) {
    throw friendlyPdfError(err);
  }
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @returns {Promise<{ tables: Array<{ page: number, rows: string[][] }> }>}
 */
export async function pdfExtractTables(buffer) {
  try {
    const data = toUint8Array(buffer);
    const { text } = await extractText(data, { mergePages: false });
    const pages = Array.isArray(text) ? text : [text];
    const tables = [];
    pages.forEach((pageText, idx) => {
      tables.push(...extractTablesFromPageText(pageText, idx + 1));
    });
    return { tables };
  } catch (err) {
    throw friendlyPdfError(err);
  }
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @returns {Promise<{ links: Array<{ type: string, value: string, page?: number }>, count: number }>}
 */
export async function pdfExtractLinks(buffer) {
  try {
    const data = toUint8Array(buffer);
    const links = [];

    // Annotation / unpdf links
    try {
      const { links: urlLinks } = await unpdfExtractLinks(new Uint8Array(data));
      for (const value of urlLinks || []) {
        if (!value) continue;
        const str = String(value);
        const lower = str.toLowerCase();
        if (lower.startsWith('mailto:')) {
          links.push({ type: 'email', value: str.replace(/^mailto:/i, '') });
        } else if (lower.startsWith('tel:')) {
          links.push({ type: 'phone', value: str.replace(/^tel:/i, '') });
        } else if (lower.startsWith('#') || (lower.startsWith('/') && !lower.startsWith('//'))) {
          links.push({ type: 'internal', value: str });
        } else {
          links.push({ type: 'url', value: str });
        }
      }
    } catch (err) {
      if (/password|encrypt/i.test(String(err?.message || ''))) throw friendlyPdfError(err);
    }

    // Regex on extracted text (before pdf-lib, which may detach buffers)
    const { text } = await extractText(new Uint8Array(data), { mergePages: false });
    const pages = Array.isArray(text) ? text : [text];
    pages.forEach((pageText, idx) => {
      const page = idx + 1;
      const content = String(pageText || '');
      for (const m of content.matchAll(URL_RE)) {
        links.push({ type: 'url', value: m[0].replace(/[.,;:!?)]+$/, ''), page });
      }
      for (const m of content.matchAll(EMAIL_RE)) {
        links.push({ type: 'email', value: m[0], page });
      }
      for (const m of content.matchAll(PHONE_RE)) {
        const value = m[0].trim();
        // Avoid matching years / short numbers
        const digits = value.replace(/\D/g, '');
        if (digits.length >= 7 && digits.length <= 15) {
          links.push({ type: 'phone', value, page });
        }
      }
    });

    // pdf-lib Link annotations (URI actions) — use a copy; load may detach the buffer
    try {
      const pdfDoc = await PDFDocument.load(new Uint8Array(data), { ignoreEncryption: false });
      const pdfPages = pdfDoc.getPages();
      for (let pageIndex = 0; pageIndex < pdfPages.length; pageIndex += 1) {
        const page = pdfPages[pageIndex];
        const annots =
          typeof page.node.Annots === 'function'
            ? page.node.Annots()
            : page.node.lookupMaybe(PDFName.of('Annots'), PDFArray);
        if (!annots) continue;
        for (let a = 0; a < annots.size(); a += 1) {
          try {
            const annot = annots.lookup(a, PDFDict);
            const subtype = annot.get(PDFName.of('Subtype'));
            if (subtype?.toString() !== '/Link') continue;
            const action = annot.lookupMaybe(PDFName.of('A'), PDFDict);
            const dest = annot.get(PDFName.of('Dest'));
            if (action) {
              const uriObj =
                action.lookupMaybe(PDFName.of('URI'), PDFString) ||
                action.lookupMaybe(PDFName.of('URI'), PDFHexString);
              if (uriObj) {
                const value = uriObj.decodeText ? uriObj.decodeText() : String(uriObj);
                const lower = value.toLowerCase();
                if (lower.startsWith('mailto:')) {
                  links.push({
                    type: 'email',
                    value: value.replace(/^mailto:/i, ''),
                    page: pageIndex + 1,
                  });
                } else if (lower.startsWith('tel:')) {
                  links.push({
                    type: 'phone',
                    value: value.replace(/^tel:/i, ''),
                    page: pageIndex + 1,
                  });
                } else {
                  links.push({ type: 'url', value, page: pageIndex + 1 });
                }
              }
            } else if (dest) {
              links.push({ type: 'internal', value: String(dest), page: pageIndex + 1 });
            }
          } catch {
            // skip bad annotation
          }
        }
      }
    } catch (err) {
      if (/password|encrypt/i.test(String(err?.message || ''))) throw friendlyPdfError(err);
    }

    const unique = dedupeLinks(links);
    return { links: unique, count: unique.length };
  } catch (err) {
    throw friendlyPdfError(err);
  }
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @returns {Promise<object>}
 */
export async function pdfGetMetadata(buffer) {
  try {
    const data = toUint8Array(buffer);
    let info = {};
    let pageCount = 0;
    let pdfVersion = null;
    let encrypted = false;
    let permissions = null;

    try {
      const meta = await getMeta(new Uint8Array(data), { parseDates: true });
      info = meta?.info || {};
    } catch (err) {
      if (/password|encrypt/i.test(String(err?.message || ''))) throw friendlyPdfError(err);
    }

    try {
      // Fresh copy — PDFDocument.load may detach the underlying ArrayBuffer
      const pdfDoc = await PDFDocument.load(new Uint8Array(data), {
        ignoreEncryption: false,
        updateMetadata: false,
      });
      pageCount = pdfDoc.getPageCount();
      encrypted = pdfDoc.isEncrypted;
      const title = pdfDoc.getTitle();
      const author = pdfDoc.getAuthor();
      const subject = pdfDoc.getSubject();
      const keywords = pdfDoc.getKeywords();
      const creator = pdfDoc.getCreator();
      const producer = pdfDoc.getProducer();
      const creationDate = pdfDoc.getCreationDate();
      const modificationDate = pdfDoc.getModificationDate();

      info = {
        Title: title ?? info.Title,
        Author: author ?? info.Author,
        Subject: subject ?? info.Subject,
        Keywords: keywords ?? info.Keywords,
        Creator: creator ?? info.Creator,
        Producer: producer ?? info.Producer,
        CreationDate: creationDate ?? info.CreationDate,
        ModDate: modificationDate ?? info.ModDate,
        ...info,
      };
    } catch (err) {
      if (/password|encrypt/i.test(String(err?.message || ''))) {
        encrypted = true;
        throw friendlyPdfError(err);
      }
      // Fall back to unpdf page count
      try {
        const proxy = await getDocumentProxy(new Uint8Array(data));
        pageCount = proxy.numPages;
        pdfVersion = proxy.pdfInfo?.PDFFormatVersion || null;
      } catch (inner) {
        throw friendlyPdfError(inner);
      }
    }

    try {
      const proxy = await getDocumentProxy(new Uint8Array(data));
      pageCount = pageCount || proxy.numPages;
      pdfVersion = proxy.pdfInfo?.PDFFormatVersion || pdfVersion;
      if (proxy.getPermissions) {
        permissions = await proxy.getPermissions();
      }
    } catch {
      // optional enrichment
    }

    const keywordsRaw = info.Keywords ?? info.keywords;
    let keywords = keywordsRaw;
    if (typeof keywordsRaw === 'string') {
      keywords = keywordsRaw.split(/[,;]/).map((k) => k.trim()).filter(Boolean);
    }

    return {
      title: info.Title ?? info.title ?? null,
      author: info.Author ?? info.author ?? null,
      subject: info.Subject ?? info.subject ?? null,
      keywords: keywords ?? null,
      creator: info.Creator ?? info.creator ?? null,
      producer: info.Producer ?? info.producer ?? null,
      creationDate: info.CreationDate ?? info.creationDate ?? null,
      modificationDate: info.ModDate ?? info.modificationDate ?? null,
      pageCount,
      pdfVersion,
      encrypted,
      permissions,
    };
  } catch (err) {
    throw friendlyPdfError(err);
  }
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @returns {Promise<{ images: Array<object>, count: number, note?: string }>}
 */
export async function pdfExtractImages(buffer) {
  try {
    const data = toUint8Array(buffer);
    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch {
      return {
        images: [],
        count: 0,
        note: 'Image encoding unavailable (sharp could not be loaded).',
      };
    }

    if (typeof extractImages !== 'function') {
      return {
        images: [],
        count: 0,
        note: 'Image extraction is not available in this environment.',
      };
    }

    const pdf = await getDocumentProxy(data);
    const images = [];
    const pageCount = pdf.numPages;

    for (let page = 1; page <= pageCount && images.length < MAX_IMAGES; page += 1) {
      let pageImages;
      try {
        pageImages = await extractImages(pdf, page);
      } catch {
        continue;
      }
      if (!Array.isArray(pageImages)) continue;

      for (const img of pageImages) {
        if (images.length >= MAX_IMAGES) break;
        try {
          const channels = img.channels || 3;
          const png = await sharp(Buffer.from(img.data), {
            raw: {
              width: img.width,
              height: img.height,
              channels,
            },
          })
            .png()
            .toBuffer();

          const idx = images.length + 1;
          images.push({
            name: `page${page}-image${idx}.png`,
            mimeType: 'image/png',
            base64: png.toString('base64'),
            width: img.width,
            height: img.height,
            page,
          });
        } catch {
          // skip undecodable image
        }
      }
    }

    const result = { images, count: images.length };
    if (images.length >= MAX_IMAGES) {
      result.note = `Capped at ${MAX_IMAGES} images.`;
    }
    if (images.length === 0) {
      result.note =
        'No extractable embedded images were found (or extraction is unavailable for this PDF).';
    }
    return result;
  } catch (err) {
    throw friendlyPdfError(err);
  }
}
