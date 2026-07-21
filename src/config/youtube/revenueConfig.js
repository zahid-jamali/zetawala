/**
 * Configurable RPM estimate bands for YouTube Revenue Calculator.
 * Values are illustrative estimates — never presented as official YouTube data.
 */

export const revenueDisclaimer =
  'Revenue estimates are illustrative and not guaranteed. Actual YouTube earnings may vary significantly based on audience, content, monetization status, ad demand, geography, seasonality, and other factors.';

export const contentTypes = [
  { id: 'long-form', label: 'Long-form' },
  { id: 'shorts', label: 'Shorts' },
];

export const niches = [
  'Entertainment',
  'Gaming',
  'Education',
  'Technology',
  'Finance',
  'Business',
  'Health',
  'Lifestyle',
  'Other',
];

export const regions = [
  { id: 'global', label: 'Global / Mixed' },
  { id: 'us-ca-uk-au', label: 'US / Canada / UK / Australia' },
  { id: 'western-europe', label: 'Western Europe' },
  { id: 'south-asia', label: 'South Asia (PK / IN / BD)' },
  { id: 'sea', label: 'Southeast Asia' },
  { id: 'latam', label: 'Latin America' },
  { id: 'other', label: 'Other / Emerging' },
];

/**
 * Estimated RPM ranges (USD per 1000 views) by content type × region.
 * Labeled as estimates only.
 */
export const estimatedRpmBands = {
  'long-form': {
    global: { low: 1.5, typical: 3.5, high: 7 },
    'us-ca-uk-au': { low: 4, typical: 8, high: 15 },
    'western-europe': { low: 3, typical: 6, high: 12 },
    'south-asia': { low: 0.4, typical: 1.2, high: 3 },
    sea: { low: 0.6, typical: 1.8, high: 4 },
    latam: { low: 0.8, typical: 2.2, high: 5 },
    other: { low: 0.5, typical: 1.5, high: 3.5 },
  },
  shorts: {
    global: { low: 0.02, typical: 0.06, high: 0.15 },
    'us-ca-uk-au': { low: 0.04, typical: 0.1, high: 0.25 },
    'western-europe': { low: 0.03, typical: 0.08, high: 0.2 },
    'south-asia': { low: 0.01, typical: 0.03, high: 0.08 },
    sea: { low: 0.015, typical: 0.04, high: 0.1 },
    latam: { low: 0.015, typical: 0.045, high: 0.12 },
    other: { low: 0.01, typical: 0.035, high: 0.09 },
  },
};

/** Soft niche multipliers applied to typical band (still labeled estimate). */
export const nicheRpmMultipliers = {
  Finance: 1.35,
  Business: 1.25,
  Technology: 1.15,
  Education: 1.1,
  Health: 1.05,
  Lifestyle: 1.0,
  Entertainment: 0.9,
  Gaming: 0.85,
  Other: 1.0,
};
