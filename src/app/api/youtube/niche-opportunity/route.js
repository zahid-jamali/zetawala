import { NextResponse } from 'next/server';
import { guardYouTubeRequest, youtubeErrorResponse } from '../../../../lib/youtube/apiGuard';
import { analyzeNicheOpportunity } from '../../../../lib/youtube/youtubeAnalysisService';
import { interpretYouTubeMetrics } from '../../../../lib/youtube/youtubeAiInterpret';

export async function POST(request) {
  try {
    const guard = await guardYouTubeRequest(request);
    if (!guard.ok) return guard.response;

    const { niche, country, language, contentFormat } = guard.body;
    if (!niche?.trim()) {
      return NextResponse.json({ success: false, error: 'Niche is required.' }, { status: 400 });
    }

    const analysis = await analyzeNicheOpportunity({
      niche,
      regionCode: undefined,
      language: language || undefined,
      contentFormat: contentFormat || 'Both',
    });

    const ai = await interpretYouTubeMetrics({
      task: 'niche-opportunity',
      metricsPayload: {
        niche,
        country: country || null,
        language: language || null,
        contentFormat: contentFormat || 'Both',
        metrics: analysis.metrics,
        opportunity: analysis.opportunity,
        titlePatterns: analysis.metrics.titlePatterns,
        sampleVideoTitles: analysis.observed.sampleVideos.map((v) => v.title),
      },
      instruction: `Return JSON:
{
  "marketSnapshot": "...",
  "topPerformingPatterns": ["..."],
  "contentGaps": ["..."],
  "risks": ["..."],
  "finalVerdictNarrative": "..."
}
Use only provided metrics. Do not invent statistics. Verdict label is already: ${analysis.opportunity.verdict}`,
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
    console.error('niche-opportunity error:', err);
    return youtubeErrorResponse(err);
  }
}
