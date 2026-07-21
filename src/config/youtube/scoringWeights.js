/**
 * Centralized scoring weights for YouTube Intelligence tools.
 * Do not duplicate formulas inside UI components.
 */

export const nicheOpportunityWeights = {
  demand: 0.28,
  competitionPenalty: 0.22,
  contentGap: 0.2,
  monetization: 0.15,
  growth: 0.1,
  entryDifficultyPenalty: 0.05,
};

export const nicheFinderFitWeights = {
  opportunity: 0.55,
  userFit: 0.25,
  facelessSuitability: 0.1,
  monetizationAlignment: 0.1,
};

export const channelHealthWeights = {
  consistency: 0.2,
  performance: 0.25,
  engagement: 0.2,
  momentum: 0.2,
  efficiency: 0.15,
};

export const videoPerformanceWeights = {
  relativeViews: 0.35,
  engagement: 0.25,
  reach: 0.2,
  channelRelative: 0.2,
};

/** Map opportunity score → verdict label */
export function opportunityVerdict(score) {
  if (score >= 80) return 'Excellent Opportunity';
  if (score >= 65) return 'Strong Opportunity';
  if (score >= 50) return 'Promising but Competitive';
  if (score >= 35) return 'Difficult Market';
  return 'Low Opportunity';
}

export function clampScore(n) {
  if (n == null || Number.isNaN(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}
