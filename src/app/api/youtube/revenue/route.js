import { NextResponse } from 'next/server';
import { calculateYouTubeRevenue } from '../../../../lib/youtube/revenueCalculator';

/**
 * Deterministic revenue calculator — no YouTube API / DeepSeek required.
 * Still available server-side for consistency; client may also compute locally.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const result = calculateYouTubeRevenue(body);
    if (!result.success) {
      return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Revenue calculation failed.' },
      { status: 500 }
    );
  }
}
