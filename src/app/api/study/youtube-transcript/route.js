import { NextResponse } from 'next/server';
import { fetchYouTubeTranscript } from '../../../../lib/study/youtubeTranscript';
import { getClientIp, detectBot, checkRateLimit } from '../../../../lib/security';

export const runtime = 'nodejs';
export const maxDuration = 60;

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

    const body = await request.json();
    const url = body?.url || body?.youtubeUrl;
    if (!url) {
      return NextResponse.json({ success: false, error: 'YouTube URL is required.' }, { status: 400 });
    }

    const data = await fetchYouTubeTranscript(url);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Transcript fetch failed.' },
      { status: 400 }
    );
  }
}
