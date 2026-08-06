import {
  pdfToMarkdown,
  pdfExtractTables,
  pdfExtractLinks,
  pdfGetMetadata,
  pdfExtractImages,
} from './pdfService';
import { excelToJson, jsonToExcel, csvToExcel } from './excelService';
import {
  getImageMetadata,
  stripExif,
  extractColorPalette,
  resizeForSocial,
} from './imageService';
import { screenshotToText } from './ocrService';

export const PDF_UTILITY_ACTIONS = [
  'pdf-to-markdown',
  'pdf-table-extractor',
  'pdf-link-extractor',
  'pdf-metadata-viewer',
  'pdf-image-extractor',
  'excel-to-json',
  'json-to-excel',
  'csv-to-excel',
  'image-metadata-viewer',
  'exif-metadata-remover',
  'image-color-palette',
  'social-image-resizer',
  'screenshot-to-text',
];

function requireBuffer(buffer, label = 'file') {
  if (!buffer || !(buffer instanceof Uint8Array || Buffer.isBuffer(buffer)) || buffer.length === 0) {
    throw new Error(`A ${label} is required for this tool.`);
  }
}

function filePayload(buffer, mimeType, filename) {
  return {
    base64: Buffer.from(buffer).toString('base64'),
    mimeType,
    filename,
    size: buffer.length,
  };
}

/**
 * Run a PDF/Image utility tool and return a JSON-serializable payload.
 * @param {string} action
 * @param {{ buffer?: Buffer|Uint8Array, text?: string, options?: object }} ctx
 */
export async function runPdfUtilityTool(action, { buffer, text, options = {} } = {}) {
  switch (action) {
    case 'pdf-to-markdown': {
      requireBuffer(buffer, 'PDF');
      return pdfToMarkdown(buffer);
    }
    case 'pdf-table-extractor': {
      requireBuffer(buffer, 'PDF');
      const tablesResult = await pdfExtractTables(buffer);
      if (tablesResult.tables?.length) {
        const flat = tablesResult.tables.flatMap((t, i) => {
          const rows = (t.rows || []).map((r) => {
            const obj = {};
            r.forEach((cell, ci) => {
              obj[`col${ci + 1}`] = cell;
            });
            obj._page = t.page;
            obj._table = i + 1;
            return obj;
          });
          return rows;
        });
        try {
          const xlsx = await jsonToExcel(flat);
          return {
            ...tablesResult,
            excel: filePayload(
              xlsx.buffer,
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              xlsx.filename || 'tables.xlsx'
            ),
            json: true,
          };
        } catch {
          return { ...tablesResult, json: true };
        }
      }
      return tablesResult;
    }
    case 'pdf-link-extractor': {
      requireBuffer(buffer, 'PDF');
      const linksResult = await pdfExtractLinks(buffer);
      const csvLines = ['type,value,page', ...(linksResult.links || []).map((l) => `${l.type},"${String(l.value).replace(/"/g, '""')}",${l.page ?? ''}`)];
      const csv = csvLines.join('\n');
      return {
        ...linksResult,
        csv: filePayload(Buffer.from(csv, 'utf8'), 'text/csv', 'links.csv'),
      };
    }
    case 'pdf-metadata-viewer': {
      requireBuffer(buffer, 'PDF');
      return pdfGetMetadata(buffer);
    }
    case 'pdf-image-extractor': {
      requireBuffer(buffer, 'PDF');
      const extracted = await pdfExtractImages(buffer);
      if (extracted.images?.length) {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        for (const img of extracted.images) {
          zip.file(img.name || `image-${img.key || 'x'}.png`, Buffer.from(img.base64, 'base64'));
        }
        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
        return {
          ...extracted,
          zip: filePayload(zipBuffer, 'application/zip', 'pdf-images.zip'),
        };
      }
      return extracted;
    }
    case 'excel-to-json': {
      requireBuffer(buffer, 'Excel file');
      return excelToJson(buffer, options);
    }
    case 'json-to-excel': {
      const input = text != null && String(text).trim() !== '' ? text : options.json;
      if (input == null) {
        throw new Error('Provide JSON text in the "text" field (array of objects or { "data": [] }).');
      }
      const result = await jsonToExcel(input);
      return {
        ...filePayload(result.buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', result.filename),
        download: true,
      };
    }
    case 'csv-to-excel': {
      const csvInput =
        buffer && buffer.length
          ? buffer
          : text != null
            ? text
            : null;
      if (csvInput == null || (typeof csvInput === 'string' && !csvInput.trim())) {
        throw new Error('A CSV file or CSV text is required.');
      }
      const result = await csvToExcel(csvInput);
      return {
        ...filePayload(result.buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', result.filename),
        previewRows: result.previewRows,
        rowCount: result.rowCount,
        download: true,
      };
    }
    case 'image-metadata-viewer': {
      requireBuffer(buffer, 'image');
      return getImageMetadata(buffer);
    }
    case 'exif-metadata-remover': {
      requireBuffer(buffer, 'image');
      const result = await stripExif(buffer);
      return {
        ...filePayload(result.buffer, result.mimeType, result.filename),
        download: true,
      };
    }
    case 'image-color-palette': {
      requireBuffer(buffer, 'image');
      return extractColorPalette(buffer);
    }
    case 'social-image-resizer': {
      requireBuffer(buffer, 'image');
      const result = await resizeForSocial(buffer, options);
      return {
        variants: result.variants,
        zip: filePayload(
          Buffer.from(result.zipBase64, 'base64'),
          result.zipMimeType,
          result.zipFilename
        ),
        download: true,
      };
    }
    case 'screenshot-to-text': {
      requireBuffer(buffer, 'image');
      return screenshotToText(buffer, options);
    }
    default:
      throw new Error(`Unsupported action "${action}".`);
  }
}
