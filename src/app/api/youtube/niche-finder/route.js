import { NextResponse } from 'next/server';
import { guardYouTubeRequest, youtubeErrorResponse } from '../../../../lib/youtube/apiGuard';
import { runNicheFinder } from '../../../../lib/youtube/nicheFinderService';
import { clampYoutubeProfile } from '../../../../config/aiInputLimits';

export async function POST(request) {
  try {
    const guard = await guardYouTubeRequest(request);
    if (!guard.ok) return guard.response;

    const data = await runNicheFinder(clampYoutubeProfile(guard.body));
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('niche-finder error:', err);
    return youtubeErrorResponse(err);
  }
}
