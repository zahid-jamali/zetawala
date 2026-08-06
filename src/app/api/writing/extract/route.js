import { NextResponse } from 'next/server';
import { extractTextFromUpload } from '../../../../lib/writing/textExtract';
import { getClientIp, detectBot, checkRateLimit } from '../../../../lib/security';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Extract text from PDF/DOCX/TXT for writing tools (e.g. plagiarism checker).
 * Does not call DeepSeek — client then sends text to /api/generate.
 */
export async function POST(request) {
  try {
    const ip = getClientIp(request.headers);
    const botCheck = detectBot(request.headers);
    if (!botCheck.success) {
      return NextResponse.json({ success: false, error: botCheck.error }, { status: 403 });
    }
    const limitCheck = checkRateLimit(ip);
    if (!limitCheck.success) {
      return NextResponse.json({ success: false, error: limitCheck.error }, { status: 429 });
    }

    const form = await request.formData();
    const file = form.get('file');
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
