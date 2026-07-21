import { analyzeNicheOpportunity } from './youtubeAnalysisService';
import {
  scoreUserFit,
  scoreFacelessSuitability,
  scoreNicheFinderCandidate,
  clampScore,
} from './youtubeScoring';
import { generateNicheCandidates, interpretYouTubeMetrics } from './youtubeAiInterpret';
import { cacheGet, cacheSet, cacheKey, getCacheTtl } from './youtubeCache';

/**
 * Niche Finder pipeline:
 * candidates → normalize → sample YT data for top candidates → score → rank → AI interpret
 */
export async function runNicheFinder(profile) {
  if (!profile?.interests?.trim() || !profile?.skills?.trim()) {
    throw new Error('Interests and skills are required.');
  }
  if (!profile?.targetAudienceCountry?.trim()) {
    throw new Error('Target audience country is required.');
  }
  if (!profile?.contentLanguage?.trim()) {
    throw new Error('Content language is required.');
  }

  const ck = cacheKey([
    'niche-finder',
    profile.interests,
    profile.skills,
    profile.targetAudienceCountry,
    profile.contentLanguage,
    profile.channelType,
    profile.mainGoal,
    profile.contentFormat,
    profile.topicsToAvoid,
  ]);
  const cached = cacheGet(ck);
  if (cached) return { ...cached, fromCache: true };

  const candidates = await generateNicheCandidates(profile);
  const avoid = (profile.topicsToAvoid || '').toLowerCase();

  const filtered = candidates
    .filter((c) => c?.name)
    .filter((c) => !avoid || !c.name.toLowerCase().split(' ').some((w) => avoid.includes(w)))
    .slice(0, 10);

  if (!filtered.length) {
    throw new Error('Could not generate niche candidates. Try broader interests/skills.');
  }

  // Deep-analyze a limited set for quota safety
  const toAnalyze = filtered.slice(0, 6);
  const scored = [];

  for (const candidate of toAnalyze) {
    try {
      const analysis = await analyzeNicheOpportunity({
        niche: candidate.name,
        regionCode: countryToRegionHint(profile.targetAudienceCountry),
        language: languageHint(profile.contentLanguage),
        contentFormat: profile.contentFormat || 'Both',
        maxChannels: 5,
        maxVideos: 12,
      });

      const userFit = scoreUserFit(profile, candidate.name);
      const faceless = scoreFacelessSuitability(candidate.name, profile.channelType);
      const monetizationAlign = scoreMonetizationAlign(profile.monetizationPreference, analysis.opportunity.breakdown.monetization.score);
      const finalScore = scoreNicheFinderCandidate({
        opportunityScore: analysis.opportunity.score,
        userFit,
        faceless,
        monetizationAlign,
      });

      scored.push({
        niche: candidate.name,
        candidateReason: candidate.reason || null,
        opportunityScore: analysis.opportunity.score,
        finalScore,
        demand: analysis.opportunity.breakdown.demand.score,
        competition: analysis.opportunity.breakdown.competition.score,
        contentOpportunity: analysis.opportunity.breakdown.contentGap.score,
        monetizationPotential: analysis.opportunity.breakdown.monetization.score,
        facelessSuitability: faceless,
        userFit,
        difficulty: analysis.opportunity.breakdown.entryDifficulty.score,
        confidence: confidenceFromSample(analysis.metrics),
        metrics: analysis.metrics,
        opportunity: analysis.opportunity,
      });
    } catch (err) {
      console.warn(`Niche candidate skipped (${candidate.name}):`, err.message);
    }
  }

  if (!scored.length) {
    throw new Error(
      'Unable to validate niches against YouTube data right now. Check YOUTUBE_API_KEY / quota and try again.'
    );
  }

  scored.sort((a, b) => b.finalScore - a.finalScore);
  const top = scored.slice(0, 8);

  const ai = await interpretYouTubeMetrics({
    task: 'niche-finder',
    metricsPayload: { profile: sanitizeProfile(profile), recommendations: top },
    instruction: `For each niche in recommendations (use the provided scores — do not invent new scores), return JSON:
{
  "niches": [
    {
      "niche": "exact name",
      "whyThisNiche": "...",
      "whyItFitsYou": "...",
      "targetAudience": "...",
      "contentOpportunities": ["..."],
      "monetizationOpportunities": ["..."],
      "recommendedFormat": "Shorts|Long-form|Both",
      "subNiches": ["..."],
      "first10VideoIdeas": ["..."],
      "channelPositioning": "...",
      "mainRisks": ["..."],
      "finalRecommendation": "..."
    }
  ],
  "overallAdvice": "..."
}`,
  });

  const result = {
    profile: sanitizeProfile(profile),
    recommendations: top,
    ai: ai.ok ? ai.data : null,
    aiError: ai.ok ? null : ai.error,
    labels: {
      score: 'Zetawala Score',
      searchVolume: 'N/A',
    },
  };

  cacheSet(ck, result, getCacheTtl('analysis'));
  return { ...result, fromCache: false };
}

function sanitizeProfile(p) {
  return {
    interests: p.interests,
    skills: p.skills,
    targetAudienceCountry: p.targetAudienceCountry,
    contentLanguage: p.contentLanguage,
    channelType: p.channelType,
    mainGoal: p.mainGoal,
    experienceLevel: p.experienceLevel || null,
    weeklyTime: p.weeklyTime || null,
    budget: p.budget || null,
    contentFormat: p.contentFormat || 'Both',
    monetizationPreference: p.monetizationPreference || 'Multiple',
    topicsToAvoid: p.topicsToAvoid || null,
  };
}

function scoreMonetizationAlign(pref, monetizationScore) {
  if (!pref || pref === 'Multiple' || pref === 'Ad revenue') return monetizationScore;
  return clampScore((monetizationScore || 50) * 0.9 + 10);
}

function confidenceFromSample(metrics) {
  const n = (metrics?.videosAnalyzed || 0) + (metrics?.channelsAnalyzed || 0);
  if (n >= 20) return 'High';
  if (n >= 10) return 'Medium';
  return 'Low';
}

function countryToRegionHint(country) {
  const c = (country || '').toLowerCase();
  if (c.includes('pakistan') || c.includes('pk')) return 'PK';
  if (c.includes('india') || c.includes('in')) return 'IN';
  if (c.includes('united states') || c.includes('usa') || c === 'us') return 'US';
  if (c.includes('united kingdom') || c.includes('uk')) return 'GB';
  return undefined;
}

function languageHint(lang) {
  const l = (lang || '').toLowerCase();
  if (l.startsWith('en')) return 'en';
  if (l.includes('urdu') || l === 'ur') return 'ur';
  if (l.includes('hindi') || l === 'hi') return 'hi';
  return undefined;
}
