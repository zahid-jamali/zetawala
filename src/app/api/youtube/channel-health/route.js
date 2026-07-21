import { NextResponse } from 'next/server';
import { guardYouTubeRequest, youtubeErrorResponse } from '../../../../lib/youtube/apiGuard';
import { analyzeChannelHealth } from '../../../../lib/youtube/youtubeAnalysisService';
import { interpretYouTubeMetrics } from '../../../../lib/youtube/youtubeAiInterpret';

export async function POST(request) {
  try {
    const guard = await guardYouTubeRequest(request);
    if (!guard.ok) return guard.response;

    const { channelInput, videoLimit } = guard.body;
    if (!channelInput?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Channel URL, @handle, or channel ID is required.' },
        { status: 400 }
      );
    }

    const analysis = await analyzeChannelHealth({ channelInput, videoLimit });

    const ai = await interpretYouTubeMetrics({
      task: 'channel-health',
      metricsPayload: {
        channel: analysis.channel,
        summary: analysis.summary,
        momentum: analysis.momentum,
        health: analysis.health,
        topVideos: analysis.topVideos,
        underperformingVideos: analysis.underperformingVideos,
        patterns: analysis.patterns,
      },
      instruction: `Return JSON:
{
  "diagnosis": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommendations": ["..."]
}
Reference actual provided metrics (e.g. momentumRatio, medianViews). Never invent numbers.`,
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
    console.error('channel-health error:', err);
    return youtubeErrorResponse(err);
  }
}
