import { NextResponse } from 'next/server';
import { extractTextFromUpload } from '../../../../lib/writing/textExtract';
import { guardFormRequest } from '../../../../lib/apiGuard';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Extract text from PDF/DOCX/TXT for writing/study tools.
 * Heavy server work — protected by Turnstile. Client then sends text to /api/generate.
 */
export async function POST(request) {
  try {
    const guard = await guardFormRequest(request);
    if (!guard.ok) return guard.response;

    const file = guard.formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ success: false, error: 'File must be under 8MB.' }, { status: 400 });
    }

    const text = await extractTextFromUpload(file);
    return NextResponse.json({
      success: true,
      data: {
        text,
        wordCount: text.split(/\s+/).filter(Boolean).length,
        characterCount: text.length,
        filename: file.name || 'document',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to extract text from file.' },
      { status: 400 }
    );
  }
}
