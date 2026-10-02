/**
 * ZetaWala Tool Documentation Guides Registry
 * Maps tool slugs to structured, comprehensive documentation matching the Rewrite Master Prompt.
 */

import { freelanceHourlyRateGuide } from './calculators/freelanceHourlyRate';
import { adsenseRevenueGuide } from './calculators/adsenseRevenue';
import { profitMarginGuide } from './calculators/profitMargin';
import { breakEvenGuide } from './calculators/breakEven';
import { aiHumanizerGuide } from './writing/aiHumanizer';

const toolGuides = {
  // Pilot Batch
  'freelance-hourly-rate': freelanceHourlyRateGuide,
  'adsense-revenue': adsenseRevenueGuide,
  'profit-margin': profitMarginGuide,
  'break-even': breakEvenGuide,
  'ai-humanizer': aiHumanizerGuide,
};

/**
 * Retrieve the structured technical guide for a given tool slug.
 * Returns null if the tool has not yet been migrated to the new format.
 *
 * @param {string} slug
 * @returns {object|null}
 */
export function getToolGuide(slug) {
  if (!slug) return null;
  return toolGuides[slug] || null;
}

export { toolGuides };
