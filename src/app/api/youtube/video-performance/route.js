import { NextResponse } from 'next/server';
import { guardYouTubeRequest, youtubeErrorResponse } from '../../../../lib/youtube/apiGuard';
import { analyzeVideoPerformance } from '../../../../lib/youtube/youtubeAnalysisService';
import { interpretYouTubeMetrics } from '../../../../lib/youtube/youtubeAiInterpret';

export async function POST(request) {
  try {
    const guard = await guardYouTubeRequest(request);
    if (!guard.ok) return guard.response;

    const { videoInput } = guard.body;
    if (!videoInput?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Video URL or video ID is required.' },
        { status: 400 }
      );
    }

    const analysis = await analyzeVideoPerformance({ videoInput });

    const ai = await interpretYouTubeMetrics({
      task: 'video-performance',
      metricsPayload: {
        video: analysis.video,
        channel: analysis.channel,
        channelBaseline: analysis.channelBaseline,
        performance: analysis.performance,
        viewsPerDay: analysis.viewsPerDay,
        caveats: analysis.caveats,
      },
      instruction: `Return JSON:
{
  "whatWorked": ["..."],
  "potentialWeaknesses": ["..."],
  "contentPatternAnalysis": "...",
  "diagnosis": "...",
  "nextVideoOpportunities": [
    { "idea": "...", "why": "tie to observed data" }
  ]
}
Provide 5-10 nextVideoOpportunities grounded in this video/channel data. Do not invent stats.`,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...analysis,
        ai: ai.ok ? ai.data : null,
        aiError: ai.ok ? null : ai.error,
      },
    });
  } catch (err) {
    console.error('video-performance error:', err);
    return youtubeErrorResponse(err);
  }
}
