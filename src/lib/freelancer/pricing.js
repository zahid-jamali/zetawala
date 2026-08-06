/**
 * Deterministic Fiverr package pricing (no AI for numbers).
 * AI recommendations are fetched separately and merged in the UI.
 */

const EXPERIENCE_MULTIPLIER = {
  entry: 1,
  intermediate: 1.35,
  expert: 1.75,
};

export function calculateFiverrPackages({
  estimatedHours,
  experienceLevel = 'intermediate',
  baseHourly = 25,
}) {
  const hours = Math.max(0.5, Number(estimatedHours) || 1);
  const mult = EXPERIENCE_MULTIPLIER[experienceLevel] || EXPERIENCE_MULTIPLIER.intermediate;
  const hourly = Math.max(5, Number(baseHourly) || 25) * mult;

  const basicHours = Math.max(0.5, hours * 0.5);
  const standardHours = hours;
  const premiumHours = hours * 1.75;

  const basic = Math.ceil(basicHours * hourly);
  const standard = Math.ceil(standardHours * hourly);
  const premium = Math.ceil(premiumHours * hourly);

  return {
    effectiveHourly: Math.round(hourly * 100) / 100,
    basicPackage: {
      name: 'Basic',
      price: basic,
      hours: Math.round(basicHours * 10) / 10,
      deliveryDays: Math.max(1, Math.ceil(basicHours / 4)),
      revisions: 1,
    },
    standardPackage: {
      name: 'Standard',
      price: standard,
      hours: Math.round(standardHours * 10) / 10,
      deliveryDays: Math.max(2, Math.ceil(standardHours / 4)),
      revisions: 2,
    },
    premiumPackage: {
      name: 'Premium',
      price: premium,
      hours: Math.round(premiumHours * 10) / 10,
      deliveryDays: Math.max(3, Math.ceil(premiumHours / 4)),
      revisions: 4,
    },
  };
}
