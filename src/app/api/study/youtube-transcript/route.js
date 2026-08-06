import { NextResponse } from 'next/server';
import { fetchYouTubeTranscript } from '../../../../lib/study/youtubeTranscript';
import { guardJsonRequest } from '../../../../lib/apiGuard';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request) {
  try {
    const guard = await guardJsonRequest(request);
    if (!guard.ok) return guard.response;

    const url = guard.body?.url || guard.body?.youtubeUrl;
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
