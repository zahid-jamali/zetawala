import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';

const PREVIEW_LIMIT = 20;

function friendlyExcelError(err) {
  const msg = String(err?.message || err || '');
  if (/corrupt|Invalid|CFB|ZIP|parse|Unexpected/i.test(msg)) {
    return new Error('This spreadsheet appears to be corrupt or unreadable. Please try another file.');
  }
  return err instanceof Error ? err : new Error(msg || 'Failed to process spreadsheet.');
}

function sheetToObjects(worksheet) {
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: null, raw: false });
  return rows;
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @param {{ sheetName?: string }} [options]
 */
export async function excelToJson(buffer, options = {}) {
  try {
    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const workbook = XLSX.read(data, { type: 'buffer', cellDates: true });
    const sheets = workbook.SheetNames || [];
    if (!sheets.length) {
      throw new Error('No sheets found in this workbook.');
    }

    const requested = options.sheetName?.trim();
    const activeSheet = requested && sheets.includes(requested) ? requested : sheets[0];
    if (requested && !sheets.includes(requested)) {
      throw new Error(`Sheet "${requested}" was not found. Available: ${sheets.join(', ')}`);
    }

    const worksheet = workbook.Sheets[activeSheet];
    const rows = sheetToObjects(worksheet);
    const preview = rows.slice(0, PREVIEW_LIMIT);

    return {
      sheets,
      activeSheet,
      rows,
      preview,
      rowCount: rows.length,
    };
  } catch (err) {
    throw friendlyExcelError(err);
  }
}

function normalizeJsonInput(jsonTextOrArray) {
  if (Array.isArray(jsonTextOrArray)) return jsonTextOrArray;
  if (jsonTextOrArray && typeof jsonTextOrArray === 'object' && Array.isArray(jsonTextOrArray.data)) {
    return jsonTextOrArray.data;
  }
  if (typeof jsonTextOrArray === 'string') {
    let parsed;
    try {
      parsed = JSON.parse(jsonTextOrArray);
    } catch {
      throw new Error('Invalid JSON. Please provide a valid JSON array of objects, or { "data": [...] }.');
    }
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.data)) return parsed.data;
    throw new Error('JSON must be an array of objects, or an object with a "data" array.');
  }
  throw new Error('Provide JSON text or an array of objects.');
}

/**
 * @param {string|object[]|{ data: object[] }} jsonTextOrArray
 * @returns {Promise<{ buffer: Buffer, filename: string }>}
 */
export async function jsonToExcel(jsonTextOrArray) {
  try {
    const rows = normalizeJsonInput(jsonTextOrArray);
    if (!rows.length) {
      throw new Error('JSON array is empty. Add at least one object to convert.');
    }
    if (rows.some((r) => r === null || typeof r !== 'object' || Array.isArray(r))) {
      throw new Error('Each JSON item must be a plain object (key/value row).');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');
    const keys = [];
    const seen = new Set();
    for (const row of rows) {
      for (const key of Object.keys(row)) {
        if (!seen.has(key)) {
          seen.add(key);
          keys.push(key);
        }
      }
    }

    sheet.columns = keys.map((key) => ({ header: key, key, width: Math.min(40, Math.max(12, key.length + 2)) }));
    for (const row of rows) {
      const out = {};
      for (const key of keys) out[key] = row[key] ?? null;
      sheet.addRow(out);
    }

    sheet.getRow(1).font = { bold: true };
    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      filename: 'converted.xlsx',
    };
  } catch (err) {
    throw friendlyExcelError(err);
  }
}

/**
 * @param {Buffer|Uint8Array|string} bufferOrText
 * @returns {Promise<{ buffer: Buffer, filename: string, previewRows: object[] }>}
 */
export async function csvToExcel(bufferOrText) {
  try {
    const text =
      typeof bufferOrText === 'string'
        ? bufferOrText
        : Buffer.from(bufferOrText).toString('utf8');

    if (!text.trim()) {
      throw new Error('CSV is empty. Please provide CSV content.');
    }

    const workbookX = XLSX.read(text, { type: 'string', raw: false });
    const sheetName = workbookX.SheetNames[0];
    if (!sheetName) {
      throw new Error('Could not parse CSV. Check the file format.');
    }
    const rows = sheetToObjects(workbookX.Sheets[sheetName]);
    if (!rows.length) {
      throw new Error('No data rows found in CSV.');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');
    const keys = Object.keys(rows[0]);
    sheet.columns = keys.map((key) => ({
      header: key,
      key,
      width: Math.min(40, Math.max(12, String(key).length + 2)),
    }));
    for (const row of rows) sheet.addRow(row);
    sheet.getRow(1).font = { bold: true };

    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      filename: 'converted.xlsx',
      previewRows: rows.slice(0, PREVIEW_LIMIT),
      rowCount: rows.length,
    };
  } catch (err) {
    throw friendlyExcelError(err);
  }
}
