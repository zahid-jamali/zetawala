/**
 * Deterministic SEO / content ROI calculators (no API / no DeepSeek).
 */

export function calcSeoRoi({
  monthlyInvestment = 0,
  monthlyOrganicSessions = 0,
  conversionRatePct = 0,
  averageOrderValue = 0,
  leadToCustomerRatePct = 100,
}) {
  const sessions = Number(monthlyOrganicSessions) || 0;
  const cr = (Number(conversionRatePct) || 0) / 100;
  const aov = Number(averageOrderValue) || 0;
  const leadClose = (Number(leadToCustomerRatePct) || 100) / 100;
  const investment = Number(monthlyInvestment) || 0;

  const conversionsOrLeads = sessions * cr;
  const customers = conversionsOrLeads * leadClose;
  const revenue = customers * aov;
  const profit = revenue - investment;
  const roiPct = investment > 0 ? (profit / investment) * 100 : null;

  return {
    monthlyInvestment: investment,
    estimatedLeadsOrConversions: round(conversionsOrLeads),
    estimatedCustomers: round(customers),
    estimatedRevenue: round(revenue),
    estimatedProfit: round(profit),
    roiPercent: roiPct == null ? null : round(roiPct),
    formula: 'Revenue ≈ Sessions × Conversion Rate × Lead→Customer × AOV; ROI = (Revenue − Cost) / Cost',
    disclaimer: 'Illustrative estimate only — not verified analytics or ad platform data.',
  };
}

export function calcKeywordRoi({
  monthlySearchVolume = 0,
  estimatedCtrPct = 10,
  conversionRatePct = 2,
  customerValue = 0,
}) {
  const vol = Number(monthlySearchVolume) || 0;
  const ctr = (Number(estimatedCtrPct) || 0) / 100;
  const cr = (Number(conversionRatePct) || 0) / 100;
  const value = Number(customerValue) || 0;

  const traffic = vol * ctr;
  const customers = traffic * cr;
  const revenue = customers * value;

  return {
    estimatedMonthlyTraffic: round(traffic),
    estimatedCustomers: round(customers),
    estimatedMonthlyRevenue: round(revenue),
    estimatedYearlyRevenue: round(revenue * 12),
    assumptions: { monthlySearchVolume: vol, estimatedCtrPct, conversionRatePct, customerValue: value },
    disclaimer: 'Uses user-provided volume/CTR assumptions. Not verified Google Ads or Search Console data.',
  };
}

export function calcContentRoi({
  contentCost = 0,
  monthlyTraffic = 0,
  conversionRatePct = 0,
  averageValue = 0,
  monthsActive = 12,
}) {
  const cost = Number(contentCost) || 0;
  const traffic = Number(monthlyTraffic) || 0;
  const cr = (Number(conversionRatePct) || 0) / 100;
  const value = Number(averageValue) || 0;
  const months = Math.max(1, Number(monthsActive) || 12);

  const monthlyRevenue = traffic * cr * value;
  const totalRevenue = monthlyRevenue * months;
  const profit = totalRevenue - cost;
  const roiPct = cost > 0 ? (profit / cost) * 100 : null;

  return {
    contentCost: cost,
    estimatedMonthlyRevenue: round(monthlyRevenue),
    estimatedTotalRevenue: round(totalRevenue),
    estimatedProfit: round(profit),
    roiPercent: roiPct == null ? null : round(roiPct),
    monthsActive: months,
    disclaimer: 'Illustrative content ROI model based on your inputs only.',
  };
}

export function estimateTrafficAdRevenue({
  estimatedMonthlyVisits = 0,
  pagesPerVisit = 1.5,
  rpm = 2,
}) {
  const visits = Number(estimatedMonthlyVisits) || 0;
  const ppv = Number(pagesPerVisit) || 1;
  const pageviews = visits * ppv;
  const low = (pageviews / 1000) * (Number(rpm) * 0.6);
  const typical = (pageviews / 1000) * Number(rpm);
  const high = (pageviews / 1000) * (Number(rpm) * 1.5);

  return {
    estimatedMonthlyVisits: visits,
    estimatedPageviews: round(pageviews),
    rpmUsed: Number(rpm),
    revenue: {
      low: round(low),
      typical: round(typical),
      high: round(high),
    },
    labels: {
      traffic: 'Estimated — not verified Google Analytics data',
      revenue: 'Estimated ad revenue using RPM assumptions — not actual AdSense earnings',
    },
    disclaimer:
      'All traffic and ad revenue figures are estimates based on user inputs/assumptions. They are not verified Analytics or AdSense data.',
  };
}

function round(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}
