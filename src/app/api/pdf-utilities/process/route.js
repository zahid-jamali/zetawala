import { NextResponse } from 'next/server';
import { PDF_UTILITY_ACTIONS, runPdfUtilityTool } from '../../../../lib/pdfUtilities/runTool';

export const runtime = 'nodejs';
export const maxDuration = 60;

const LIMITS = {
  pdf: 10 * 1024 * 1024,
  image: 8 * 1024 * 1024,
  ocr: 6 * 1024 * 1024,
  excel: 8 * 1024 * 1024,
};

const ACTION_LIMIT_KEY = {
  'pdf-to-markdown': 'pdf',
  'pdf-table-extractor': 'pdf',
  'pdf-link-extractor': 'pdf',
  'pdf-metadata-viewer': 'pdf',
  'pdf-image-extractor': 'pdf',
  'excel-to-json': 'excel',
  'json-to-excel': null,
  'csv-to-excel': 'excel',
  'image-metadata-viewer': 'image',
  'exif-metadata-remover': 'image',
  'image-color-palette': 'image',
  'social-image-resizer': 'image',
  'screenshot-to-text': 'ocr',
};

const MIME_GROUPS = {
  pdf: {
    mimes: ['application/pdf'],
    exts: ['.pdf'],
  },
  excel: {
    mimes: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/csv',
      'text/plain',
      'application/octet-stream',
    ],
    exts: ['.xlsx', '.xls', '.csv', '.tsv'],
  },
  image: {
    mimes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/tiff',
      'image/bmp',
      'application/octet-stream',
    ],
    exts: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tif', '.tiff', '.bmp'],
  },
  ocr: {
    mimes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/bmp',
      'application/octet-stream',
    ],
    exts: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'],
  },
};

function extOf(name = '') {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}

function validateFile(action, file) {
  const limitKey = ACTION_LIMIT_KEY[action];
  if (!limitKey) return null;

  if (!file || typeof file === 'string') {
    if (action === 'csv-to-excel') return null; // text body allowed
    return 'A file upload is required for this tool.';
  }

  const max = LIMITS[limitKey];
  if (typeof file.size === 'number' && file.size > max) {
    const mb = Math.round(max / (1024 * 1024));
    return `File is too large. Maximum size for this tool is ${mb}MB.`;
  }

  const group = MIME_GROUPS[limitKey];
  const mime = (file.type || '').toLowerCase();
  const ext = extOf(file.name || '');
  const mimeOk = !mime || group.mimes.includes(mime);
  const extOk = !ext || group.exts.includes(ext);
  if (!mimeOk && !extOk) {
    return `Unsupported file type for "${action}". Expected: ${group.exts.join(', ')}`;
  }
  if (ext && !group.exts.includes(ext) && mime && !group.mimes.includes(mime)) {
    return `Unsupported file type for "${action}". Expected: ${group.exts.join(', ')}`;
  }
  return null;
}

function statusForError(message) {
  if (/required|invalid|unsupported|too large|empty|provide|unknown|must/i.test(message)) {
    return 400;
  }
  if (/password|encrypt/i.test(message)) return 400;
  return 500;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const action = String(formData.get('action') || '').trim();

    if (!action || !PDF_UTILITY_ACTIONS.includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid action. Allowed: ${PDF_UTILITY_ACTIONS.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const file = formData.get('file');
    const textValue = formData.get('text');
    const text = textValue != null ? String(textValue) : undefined;
    const optionsRaw = formData.get('options');

    let options = {};
    if (optionsRaw != null && String(optionsRaw).trim() !== '') {
      try {
        options = JSON.parse(String(optionsRaw));
        if (!options || typeof options !== 'object' || Array.isArray(options)) {
          throw new Error('options must be a JSON object');
        }
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid options JSON. Expected a JSON object string.' },
          { status: 400 }
        );
      }
    }

    const fileError = validateFile(action, file);
    if (fileError) {
      return NextResponse.json({ success: false, error: fileError }, { status: 400 });
    }

    let buffer;
    if (file && typeof file !== 'string' && typeof file.arrayBuffer === 'function') {
      buffer = Buffer.from(await file.arrayBuffer());
      if (!buffer.length && ACTION_LIMIT_KEY[action]) {
        return NextResponse.json(
          { success: false, error: 'Uploaded file is empty.' },
          { status: 400 }
        );
      }
    }

    const data = await runPdfUtilityTool(action, { buffer, text, options });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('pdf-utilities process error:', err);
    const message = err?.message || 'Processing failed.';
    return NextResponse.json(
      { success: false, error: message },
      { status: statusForError(message) }
    );
  }
}
