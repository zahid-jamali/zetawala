/**
 * Deterministic Upwork hourly rate math (no AI).
 */

export function calculateUpworkHourlyRate({
  monthlyIncomeGoal,
  expenses = 0,
  taxesPercent = 0,
  billableHours,
}) {
  const goal = Math.max(0, Number(monthlyIncomeGoal) || 0);
  const exp = Math.max(0, Number(expenses) || 0);
  const tax = Math.min(80, Math.max(0, Number(taxesPercent) || 0)) / 100;
  const hours = Math.max(1, Number(billableHours) || 1);

  const preTaxNeed = goal + exp;
  const grossNeed = tax < 0.99 ? preTaxNeed / (1 - tax) : preTaxNeed * 2;
  const suggested = grossNeed / hours;
  const minimum = suggested * 0.85;
  const premium = suggested * 1.35;

  return {
    suggestedHourlyRate: round2(suggested),
    minimumRate: round2(minimum),
    premiumRate: round2(premium),
    monthlyGrossNeeded: round2(grossNeed),
    billableHours: hours,
    breakdown: {
      incomeGoal: round2(goal),
      expenses: round2(exp),
      taxesPercent: round2(tax * 100),
    },
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
