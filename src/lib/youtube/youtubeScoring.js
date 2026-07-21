import {
  nicheOpportunityWeights,
  nicheFinderFitWeights,
  channelHealthWeights,
  videoPerformanceWeights,
  opportunityVerdict,
  clampScore,
} from '../../config/youtube/scoringWeights';
import { safeRatio, round } from './youtubeAnalytics';

export { clampScore, opportunityVerdict };

function scoreFromViews(medianViews) {
  if (medianViews == null) return 40;
  if (medianViews >= 100000) return 95;
  if (medianViews >= 25000) return 82;
  if (medianViews >= 8000) return 70;
  if (medianViews >= 2000) return 55;
  if (medianViews >= 500) return 40;
  return 25;
}

function competitionFromChannelCount(n, avgSubs) {
  // More relevant channels + higher avg subs → higher competition
  let base = 30;
  if (n >= 20) base = 75;
  else if (n >= 12) base = 62;
  else if (n >= 6) base = 48;
  else if (n >= 3) base = 35;
  else base = 22;

  if (avgSubs != null) {
    if (avgSubs > 500000) base += 15;
    else if (avgSubs > 100000) base += 10;
    else if (avgSubs > 25000) base += 5;
  }
  return clampScore(base);
}

function contentGapScore({ medianViews, competition, uploadFreq }) {
  // High views + lower competition + slower uploads → more gap
  let gap = 50;
  gap += (scoreFromViews(medianViews) - 50) * 0.35;
  gap -= ((competition || 50) - 50) * 0.4;
  if (uploadFreq != null && uploadFreq < 1) gap += 8;
  if (uploadFreq != null && uploadFreq > 4) gap -= 8;
  return clampScore(gap);
}

function monetizationPotential({ medianViews, nicheHint }) {
  let score = scoreFromViews(medianViews) * 0.7 + 20;
  const highCpm = /finance|business|tech|saas|invest|insurance|software/i.test(nicheHint || '');
  if (highCpm) score += 10;
  return clampScore(score);
}

/**
 * Build niche opportunity score + breakdown from aggregated metrics.
 */
export function scoreNicheOpportunity(metrics, nicheLabel = '') {
  const demand = scoreFromViews(metrics.medianViews ?? metrics.avgViews);
  const competition = competitionFromChannelCount(
    metrics.channelsAnalyzed || 0,
    metrics.avgSubscribers
  );
  const contentGap = contentGapScore({
    medianViews: metrics.medianViews,
    competition,
    uploadFreq: metrics.uploadFrequencyPerWeek,
  });
  const monetization = monetizationPotential({
    medianViews: metrics.medianViews,
    nicheHint: nicheLabel,
  });

  const vts = metrics.viewsToSubscriberRatio;
  let growth = 50;
  if (vts != null) {
    if (vts >= 0.5) growth = 85;
    else if (vts >= 0.2) growth = 70;
    else if (vts >= 0.08) growth = 55;
    else growth = 35;
  }

  const entryDifficulty = clampScore(
    competition * 0.6 + (100 - contentGap) * 0.4
  );

  const w = nicheOpportunityWeights;
  const raw =
    demand * w.demand +
    contentGap * w.contentGap +
    monetization * w.monetization +
    growth * w.growth -
    competition * w.competitionPenalty -
    entryDifficulty * w.entryDifficultyPenalty;

  // Normalize roughly into 0–100
  const score = clampScore(50 + raw * 0.5);

  return {
    score,
    verdict: opportunityVerdict(score),
    breakdown: {
      demand: { score: demand, label: 'Zetawala Calculation', note: 'Proxy from median/avg views of sampled content' },
      competition: { score: competition, label: 'Zetawala Calculation', note: 'Based on sampled channel density & size' },
      contentGap: { score: contentGap, label: 'Zetawala Calculation' },
      monetization: { score: monetization, label: 'Estimated', note: 'Not official RPM; proxy from niche + view levels' },
      growth: { score: growth, label: 'Zetawala Calculation', note: 'Views-to-subscriber proxy where available' },
      entryDifficulty: { score: entryDifficulty, label: 'Zetawala Calculation' },
    },
  };
}

export function scoreUserFit(profile, nicheName) {
  const text = `${profile.interests || ''} ${profile.skills || ''} ${nicheName || ''}`.toLowerCase();
  const interestTokens = (profile.interests || '')
    .toLowerCase()
    .split(/[,|/]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
  const skillTokens = (profile.skills || '')
    .toLowerCase()
    .split(/[,|/]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

  let hits = 0;
  [...interestTokens, ...skillTokens].forEach((t) => {
    if (text.includes(t) || nicheName.toLowerCase().includes(t)) hits += 1;
  });

  let fit = 45 + Math.min(hits * 8, 40);
  if (profile.experienceLevel === 'Beginner' && /advanced|enterprise|quant/i.test(nicheName)) {
    fit -= 10;
  }
  return clampScore(fit);
}

export function scoreFacelessSuitability(nicheName, channelType) {
  const facelessFriendly = /faceless|documentary|facts|top\s?\d|history|science|finance explainer|list|compilation|ai voice|narrat/i.test(
    nicheName
  );
  let score = facelessFriendly ? 78 : 48;
  if (channelType === 'Faceless') score += 10;
  if (channelType === 'Personal Brand') score -= 15;
  return clampScore(score);
}

export function scoreNicheFinderCandidate({ opportunityScore, userFit, faceless, monetizationAlign }) {
  const w = nicheFinderFitWeights;
  return clampScore(
    opportunityScore * w.opportunity +
      userFit * w.userFit +
      faceless * w.facelessSuitability +
      monetizationAlign * w.monetizationAlignment
  );
}

export function scoreChannelHealth({ summary, momentum, subscribers }) {
  const w = channelHealthWeights;

  let consistency = 50;
  if (summary.uploadFrequencyPerWeek != null) {
    const f = summary.uploadFrequencyPerWeek;
    if (f >= 1 && f <= 5) consistency = 85;
    else if (f > 5) consistency = 70;
    else if (f >= 0.5) consistency = 60;
    else consistency = 35;
  }

  let performance = scoreFromViews(summary.medianViews);
  const vts = safeRatio(summary.medianViews, subscribers);
  if (vts != null) {
    if (vts >= 0.15) performance = clampScore(performance + 10);
    else if (vts < 0.02) performance = clampScore(performance - 10);
  }

  let engagement = 50;
  if (summary.avgEngagementRate != null) {
    const e = summary.avgEngagementRate;
    if (e >= 0.06) engagement = 90;
    else if (e >= 0.035) engagement = 75;
    else if (e >= 0.02) engagement = 60;
    else if (e >= 0.01) engagement = 45;
    else engagement = 30;
  }

  let momentumScore = 50;
  if (momentum?.momentumRatio != null) {
    const r = momentum.momentumRatio;
    if (r >= 1.5) momentumScore = 90;
    else if (r >= 1.1) momentumScore = 72;
    else if (r >= 0.9) momentumScore = 55;
    else if (r >= 0.6) momentumScore = 38;
    else momentumScore = 25;
  }

  let efficiency = 50;
  if (vts != null) {
    efficiency = clampScore(Math.min(100, vts * 200));
  }

  const score = clampScore(
    consistency * w.consistency +
      performance * w.performance +
      engagement * w.engagement +
      momentumScore * w.momentum +
      efficiency * w.efficiency
  );

  return {
    score,
    dimensions: {
      consistency: { score: consistency, label: 'Zetawala Calculation' },
      performance: { score: performance, label: 'Zetawala Calculation' },
      engagement: { score: engagement, label: 'Zetawala Calculation' },
      momentum: { score: momentumScore, label: 'Zetawala Calculation' },
      efficiency: { score: efficiency, label: 'Zetawala Calculation' },
    },
  };
}

export function scoreVideoPerformance({
  video,
  channelAvgViews,
  channelMedianViews,
  subscribers,
}) {
  const w = videoPerformanceWeights;
  const ageDays = video.publishedAt
    ? (Date.now() - new Date(video.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    : null;
  const isVeryNew = ageDays != null && ageDays < 2;

  const vsAvg = safeRatio(video.views, channelAvgViews);
  const vsMed = safeRatio(video.views, channelMedianViews);

  let relativeViews = 50;
  if (vsMed != null) {
    if (vsMed >= 2) relativeViews = 95;
    else if (vsMed >= 1.25) relativeViews = 80;
    else if (vsMed >= 0.9) relativeViews = 62;
    else if (vsMed >= 0.5) relativeViews = 42;
    else relativeViews = 25;
  }

  const eng = safeRatio((video.likes || 0) + (video.comments || 0), video.views);
  let engagement = 50;
  if (eng != null) {
    if (eng >= 0.06) engagement = 92;
    else if (eng >= 0.035) engagement = 78;
    else if (eng >= 0.02) engagement = 62;
    else if (eng >= 0.01) engagement = 45;
    else engagement = 28;
  }

  const vps = safeRatio(video.views, subscribers);
  let reach = 50;
  if (vps != null) {
    if (vps >= 0.5) reach = 95;
    else if (vps >= 0.2) reach = 78;
    else if (vps >= 0.08) reach = 60;
    else if (vps >= 0.03) reach = 42;
    else reach = 28;
  }

  let channelRelative = relativeViews;
  if (vsAvg != null && vsMed != null) {
    channelRelative = clampScore(((vsAvg > 1 ? 70 : 40) + relativeViews) / 2);
  }

  let score = clampScore(
    relativeViews * w.relativeViews +
      engagement * w.engagement +
      reach * w.reach +
      channelRelative * w.channelRelative
  );

  if (isVeryNew) {
    score = clampScore(score * 0.85);
  }

  return {
    score,
    isVeryNew,
    ageDays: ageDays != null ? round(ageDays, 1) : null,
    ratios: {
      vsChannelAverage: vsAvg != null ? round(vsAvg, 2) : null,
      vsChannelMedian: vsMed != null ? round(vsMed, 2) : null,
      viewsPerSubscriber: vps != null ? round(vps, 3) : null,
      likeRate: video.likes != null && video.views ? round(video.likes / video.views, 4) : null,
      commentRate:
        video.comments != null && video.views ? round(video.comments / video.views, 4) : null,
      engagementRate: eng != null ? round(eng, 4) : null,
    },
    dimensions: {
      relativeViews: { score: relativeViews, label: 'Zetawala Calculation' },
      engagement: { score: engagement, label: 'Zetawala Calculation' },
      reach: { score: reach, label: 'Zetawala Calculation' },
      channelRelative: { score: channelRelative, label: 'Zetawala Calculation' },
    },
  };
}
