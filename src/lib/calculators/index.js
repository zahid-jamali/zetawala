/**
 * Pure deterministic calculator formulas.
 * No LLM / network calls.
 */

import { findAiModel } from '../../config/calculators/aiPricing';

export function round2(n) {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n * 100) / 100;
}

export function round0(n) {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n);
}

function num(value, label, errors, { min = 0, allowZero = true } = {}) {
  if (value == null || value === '') {
    errors.push(`${label} is required.`);
    return null;
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    errors.push(`${label} must be a number.`);
    return null;
  }
  if (n < min || (!allowZero && n === 0)) {
    errors.push(`${label} must be ${allowZero ? '≥' : '>'} ${min}.`);
    return null;
  }
  return n;
}

function money(n) {
  if (n == null || Number.isNaN(n)) return 'N/A';
  return `$${round2(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function pct(n) {
  if (n == null || Number.isNaN(n)) return 'N/A';
  return `${round2(n)}%`;
}

function qty(n) {
  if (n == null || Number.isNaN(n)) return 'N/A';
  return round2(n).toLocaleString('en-US');
}

export function calculateFreelanceHourlyRate(input) {
  const errors = [];
  const goal = num(input.monthlyIncomeGoal, 'Monthly income goal', errors, { allowZero: false });
  const expenses = num(input.monthlyExpenses, 'Monthly expenses', errors);
  const tax = num(input.taxPct, 'Tax %', errors);
  const hours = num(input.billableHours, 'Billable hours per month', errors, { allowZero: false });

  if (errors.length) return { success: false, errors };

  const neededPreTax = (goal + expenses) / (1 - tax / 100);
  const minimum = neededPreTax / hours;
  const recommended = minimum * 1.3;
  const premium = minimum * 1.6;

  return {
    success: true,
    headline: `Recommended hourly rate: ${money(recommended)}`,
    formula: 'Pre-tax need = (Goal + Expenses) / (1 − Tax%) · Rate = Pre-tax need / Billable hours',
    metrics: [
      { title: 'Minimum Hourly Rate', value: money(minimum), subtitle: 'Covers goal + expenses after tax' },
      { title: 'Recommended Hourly Rate', value: money(recommended), subtitle: 'Minimum × 1.3 buffer' },
      { title: 'Premium Hourly Rate', value: money(premium), subtitle: 'Minimum × 1.6 positioning' },
      { title: 'Monthly Earnings @ Recommended', value: money(recommended * hours), subtitle: `${qty(hours)} billable hours` },
    ],
    details: [
      `Pre-tax monthly need: ${money(neededPreTax)}`,
      `At minimum rate you earn ${money(minimum * hours)}/mo before tax.`,
    ],
  };
}

export function calculateAiApiCost(input) {
  const errors = [];
  const inputTokens = num(input.inputTokens, 'Input tokens', errors);
  const outputTokens = num(input.outputTokens, 'Output tokens', errors);
  const requestsPerDay = num(input.requestsPerDay, 'Requests per day', errors);
  const daysPerMonth = num(input.daysPerMonth || 30, 'Days per month', errors, { allowZero: false });

  let inputRate = null;
  let outputRate = null;
  const model = findAiModel(input.provider, input.model);

  if (input.provider === 'custom' || input.model === 'custom') {
    inputRate = num(input.customInputPer1M, 'Custom input $/1M', errors, { allowZero: false });
    outputRate = num(input.customOutputPer1M, 'Custom output $/1M', errors, { allowZero: false });
  } else if (!model) {
    errors.push('Select a valid AI provider and model.');
  } else {
    inputRate = model.inputPer1M;
    outputRate = model.outputPer1M;
  }

  if (errors.length) return { success: false, errors };

  const costPerRequest =
    (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate;
  const daily = costPerRequest * requestsPerDay;
  const monthly = daily * daysPerMonth;
  const yearly = monthly * 12;

  return {
    success: true,
    headline: `Estimated monthly API cost: ${money(monthly)}`,
    formula: 'Cost/request = (Input tokens/1M × $/1M in) + (Output tokens/1M × $/1M out)',
    metrics: [
      { title: 'Cost Per Request', value: money(costPerRequest) },
      { title: 'Daily Cost', value: money(daily) },
      { title: 'Monthly Cost', value: money(monthly) },
      { title: 'Yearly Cost', value: money(yearly) },
    ],
    details: [
      `Rates used: $${inputRate}/1M input · $${outputRate}/1M output`,
      `Assumes ${qty(daysPerMonth)} active days/month.`,
    ],
  };
}

export function calculateSaasPricing(input) {
  const errors = [];
  const expenses = num(input.monthlyOperatingExpenses, 'Monthly operating expenses', errors);
  const profit = num(input.desiredMonthlyProfit, 'Desired monthly profit', errors);
  const customers = num(input.expectedCustomers, 'Expected customers', errors, { allowZero: false });

  if (errors.length) return { success: false, errors };

  const requiredMrr = expenses + profit;
  const breakEvenPrice = expenses / customers;
  const recommended = requiredMrr / customers;
  const profitProjection = recommended * customers - expenses;

  return {
    success: true,
    headline: `Recommended subscription: ${money(recommended)}/mo`,
    formula: 'Break-even price = Expenses / Customers · Recommended = (Expenses + Profit) / Customers',
    metrics: [
      { title: 'Break-even Subscription Price', value: money(breakEvenPrice) },
      { title: 'Recommended Subscription Price', value: money(recommended) },
      { title: 'Required MRR', value: money(requiredMrr) },
      { title: 'Profit Projection', value: money(profitProjection) },
    ],
  };
}

export function calculateCustomerLtv(input) {
  const errors = [];
  const aov = num(input.averageOrderValue, 'Average order value', errors, { allowZero: false });
  const frequency = num(input.purchaseFrequency, 'Purchase frequency per year', errors, { allowZero: false });
  const lifespan = num(input.customerLifespan, 'Customer lifespan (years)', errors, { allowZero: false });

  if (errors.length) return { success: false, errors };

  const annual = aov * frequency;
  const ltv = annual * lifespan;
  const totalProjected = ltv; // per customer; same as LTV

  return {
    success: true,
    headline: `Customer Lifetime Value: ${money(ltv)}`,
    formula: 'LTV = Average Order Value × Purchases/Year × Lifespan (years)',
    metrics: [
      { title: 'Customer Lifetime Value', value: money(ltv) },
      { title: 'Annual Customer Value', value: money(annual) },
      { title: 'Total Projected Revenue (per customer)', value: money(totalProjected) },
    ],
  };
}

export function calculateCustomerCac(input) {
  const errors = [];
  const marketing = num(input.marketingExpenses, 'Marketing expenses', errors);
  const sales = num(input.salesExpenses, 'Sales expenses', errors);
  const customers = num(input.customersAcquired, 'Customers acquired', errors, { allowZero: false });

  if (errors.length) return { success: false, errors };

  const totalSpend = marketing + sales;
  const cac = totalSpend / customers;

  return {
    success: true,
    headline: `Customer Acquisition Cost: ${money(cac)}`,
    formula: 'CAC = (Marketing + Sales expenses) / Customers acquired',
    metrics: [
      { title: 'Customer Acquisition Cost (CAC)', value: money(cac) },
      { title: 'Total Acquisition Spend', value: money(totalSpend) },
      { title: 'Cost Per Customer', value: money(cac) },
    ],
  };
}

export function calculateBreakEven(input) {
  const errors = [];
  const fixed = num(input.fixedCosts, 'Fixed costs', errors);
  const price = num(input.sellingPrice, 'Selling price per unit', errors, { allowZero: false });
  const variable = num(input.variableCost, 'Variable cost per unit', errors);

  if (errors.length) return { success: false, errors };
  if (price <= variable) {
    return {
      success: false,
      errors: ['Selling price must be greater than variable cost per unit to break even.'],
    };
  }

  const contribution = price - variable;
  const units = fixed / contribution;
  const revenue = units * price;
  const profitAfter = contribution; // profit per unit after break-even

  return {
    success: true,
    headline: `Break-even at ${qty(round0(units))} units (${money(revenue)})`,
    formula: 'Break-even units = Fixed costs / (Price − Variable cost)',
    metrics: [
      { title: 'Break-even Units', value: qty(round2(units)) },
      { title: 'Break-even Revenue', value: money(revenue) },
      { title: 'Contribution Margin / Unit', value: money(contribution) },
      { title: 'Profit After Break-even (per extra unit)', value: money(profitAfter) },
    ],
  };
}

export function calculateProfitMargin(input) {
  const errors = [];
  const cost = num(input.productCost, 'Product cost', errors);
  const price = num(input.sellingPrice, 'Selling price', errors, { allowZero: false });

  if (errors.length) return { success: false, errors };

  const gross = price - cost;
  const margin = (gross / price) * 100;
  const markup = cost > 0 ? (gross / cost) * 100 : null;

  return {
    success: true,
    headline: `Profit margin: ${pct(margin)}`,
    formula: 'Gross profit = Price − Cost · Margin% = Gross / Price · Markup% = Gross / Cost',
    metrics: [
      { title: 'Gross Profit', value: money(gross) },
      { title: 'Profit Margin', value: pct(margin) },
      { title: 'Markup', value: markup == null ? 'N/A' : pct(markup) },
    ],
  };
}

export function calculateContentMarketingRoi(input) {
  const errors = [];
  const articles = num(input.articlesPerMonth, 'Articles per month', errors, { allowZero: false });
  const visitors = num(input.avgVisitorsPerArticle, 'Avg visitors per article', errors);
  const convRate = num(input.conversionRatePct, 'Conversion rate %', errors);
  const aov = num(input.avgRevenuePerCustomer, 'Avg revenue per customer', errors);
  const contentCost = num(input.monthlyContentCost || 0, 'Monthly content cost', errors);

  if (errors.length) return { success: false, errors };

  const traffic = articles * visitors;
  const customers = traffic * (convRate / 100);
  const revenue = customers * aov;
  const roi = contentCost > 0 ? ((revenue - contentCost) / contentCost) * 100 : null;

  return {
    success: true,
    headline: `Estimated monthly revenue: ${money(revenue)}`,
    formula: 'Traffic = Articles × Visitors · Customers = Traffic × Conv% · Revenue = Customers × AOV',
    metrics: [
      { title: 'Estimated Monthly Traffic', value: qty(round0(traffic)) },
      { title: 'Estimated Customers', value: qty(round2(customers)) },
      { title: 'Monthly Revenue', value: money(revenue) },
      { title: 'ROI', value: roi == null ? 'Set content cost to see ROI' : pct(roi) },
    ],
  };
}

export function calculateGoogleAdsProfit(input) {
  const errors = [];
  const budget = num(input.monthlyBudget, 'Monthly budget', errors, { allowZero: false });
  const cpc = num(input.averageCpc, 'Average CPC', errors, { allowZero: false });
  const convRate = num(input.conversionRatePct, 'Conversion rate %', errors);
  const aov = num(input.averageOrderValue, 'Average order value', errors);

  if (errors.length) return { success: false, errors };

  const clicks = budget / cpc;
  const conversions = clicks * (convRate / 100);
  const revenue = conversions * aov;
  const profit = revenue - budget;
  const roi = (profit / budget) * 100;

  return {
    success: true,
    headline: profit >= 0 ? `Estimated profit: ${money(profit)}` : `Estimated loss: ${money(Math.abs(profit))}`,
    formula: 'Clicks = Budget / CPC · Conversions = Clicks × Conv% · Profit = Revenue − Budget',
    metrics: [
      { title: 'Estimated Clicks', value: qty(round0(clicks)) },
      { title: 'Estimated Conversions', value: qty(round2(conversions)) },
      { title: 'Revenue', value: money(revenue) },
      { title: 'Profit / Loss', value: money(profit) },
      { title: 'ROI', value: pct(roi) },
    ],
  };
}

export function calculateEmailMarketingRoi(input) {
  const errors = [];
  const listSize = num(input.emailListSize, 'Email list size', errors, { allowZero: false });
  const openRate = num(input.openRatePct, 'Open rate %', errors);
  const clickRate = num(input.clickRatePct, 'Click rate %', errors);
  const convRate = num(input.conversionRatePct, 'Conversion rate %', errors);
  const aov = num(input.averageOrderValue, 'Average order value', errors);
  const campaignCost = num(input.campaignCost || 0, 'Campaign cost', errors);

  if (errors.length) return { success: false, errors };

  const opens = listSize * (openRate / 100);
  const clicks = listSize * (clickRate / 100);
  const customers = clicks * (convRate / 100);
  const revenue = customers * aov;
  const roi = campaignCost > 0 ? ((revenue - campaignCost) / campaignCost) * 100 : null;

  return {
    success: true,
    headline: `Estimated revenue: ${money(revenue)}`,
    formula: 'Opens = List × Open% · Clicks = List × Click% · Customers = Clicks × Conv%',
    metrics: [
      { title: 'Opens', value: qty(round0(opens)) },
      { title: 'Clicks', value: qty(round0(clicks)) },
      { title: 'Customers', value: qty(round2(customers)) },
      { title: 'Revenue', value: money(revenue) },
      { title: 'ROI', value: roi == null ? 'Set campaign cost to see ROI' : pct(roi) },
    ],
  };
}

export function calculateAffiliateEarnings(input) {
  const errors = [];
  const visitors = num(input.monthlyVisitors, 'Monthly visitors', errors, { allowZero: false });
  const ctr = num(input.affiliateCtrPct, 'Affiliate CTR %', errors);
  const convRate = num(input.conversionRatePct, 'Conversion rate %', errors);
  const commission = num(input.averageCommission, 'Average commission', errors);

  if (errors.length) return { success: false, errors };

  const clicks = visitors * (ctr / 100);
  const sales = clicks * (convRate / 100);
  const monthly = sales * commission;
  const yearly = monthly * 12;

  return {
    success: true,
    headline: `Estimated monthly earnings: ${money(monthly)}`,
    formula: 'Clicks = Visitors × CTR · Sales = Clicks × Conv% · Earnings = Sales × Commission',
    metrics: [
      { title: 'Estimated Clicks', value: qty(round0(clicks)) },
      { title: 'Estimated Sales', value: qty(round2(sales)) },
      { title: 'Monthly Earnings', value: money(monthly) },
      { title: 'Yearly Earnings', value: money(yearly) },
    ],
  };
}

export function calculateAdsenseRevenue(input) {
  const errors = [];
  const pageviews = num(input.monthlyPageviews, 'Monthly pageviews', errors, { allowZero: false });
  const mode = input.mode || 'rpm';

  let daily;
  let monthly;
  let yearly;
  let clicks = null;
  let formula;

  if (mode === 'cpc') {
    const ctr = num(input.ctrPct, 'CTR %', errors);
    const cpc = num(input.cpc, 'CPC', errors);
    if (errors.length) return { success: false, errors };
    clicks = pageviews * (ctr / 100);
    monthly = clicks * cpc;
    formula = 'Clicks = Pageviews × CTR · Revenue = Clicks × CPC';
  } else {
    const rpm = num(input.rpm, 'RPM', errors);
    if (errors.length) return { success: false, errors };
    monthly = (pageviews / 1000) * rpm;
    formula = 'Revenue = Pageviews / 1000 × RPM';
  }

  daily = monthly / 30;
  yearly = monthly * 12;

  const metrics = [
    { title: 'Daily Earnings', value: money(daily) },
    { title: 'Monthly Earnings', value: money(monthly) },
    { title: 'Yearly Earnings', value: money(yearly) },
  ];
  if (clicks != null) {
    metrics.unshift({ title: 'Estimated Clicks', value: qty(round0(clicks)) });
  }

  return {
    success: true,
    headline: `Estimated monthly AdSense: ${money(monthly)}`,
    formula,
    metrics,
  };
}

export function calculateEcommerceProfit(input) {
  const errors = [];
  const cost = num(input.productCost, 'Product cost', errors);
  const price = num(input.sellingPrice, 'Selling price', errors, { allowZero: false });
  const shipping = num(input.shippingCost, 'Shipping cost', errors);
  const platformFee = num(input.platformFee, 'Platform fee', errors);
  const ads = num(input.advertisingCost, 'Advertising cost', errors);

  if (errors.length) return { success: false, errors };

  const totalCosts = cost + shipping + platformFee + ads;
  const net = price - totalCosts;
  const margin = (net / price) * 100;
  const roi = totalCosts > 0 ? (net / totalCosts) * 100 : null;

  return {
    success: true,
    headline: `Net profit: ${money(net)} (${pct(margin)} margin)`,
    formula: 'Net = Price − (Cost + Shipping + Platform fee + Ads)',
    metrics: [
      { title: 'Net Profit', value: money(net) },
      { title: 'Profit Margin', value: pct(margin) },
      { title: 'ROI', value: roi == null ? 'N/A' : pct(roi) },
      { title: 'Total Costs', value: money(totalCosts) },
    ],
  };
}

export function calculateAmazonFbaProfit(input) {
  const errors = [];
  const cost = num(input.productCost, 'Product cost', errors);
  const price = num(input.sellingPrice, 'Selling price', errors, { allowZero: false });
  const amazonFees = num(input.amazonFees, 'Amazon fees', errors);
  const shipping = num(input.shippingCost, 'Shipping cost', errors);

  if (errors.length) return { success: false, errors };

  const totalCosts = cost + amazonFees + shipping;
  const net = price - totalCosts;
  const margin = (net / price) * 100;
  const roi = totalCosts > 0 ? (net / totalCosts) * 100 : null;

  return {
    success: true,
    headline: `FBA net profit: ${money(net)}`,
    formula: 'Net = Selling price − (Product cost + Amazon fees + Shipping)',
    metrics: [
      { title: 'Net Profit', value: money(net) },
      { title: 'Margin', value: pct(margin) },
      { title: 'ROI', value: roi == null ? 'N/A' : pct(roi) },
    ],
  };
}

export function calculateEtsyFeeProfit(input) {
  const errors = [];
  const price = num(input.sellingPrice, 'Selling price', errors, { allowZero: false });
  const cost = num(input.productCost, 'Product cost', errors);
  const shipping = num(input.shippingCost, 'Shipping cost', errors);
  const etsyFees = num(input.etsyFees, 'Etsy fees', errors);

  if (errors.length) return { success: false, errors };

  const totalFees = etsyFees;
  const net = price - cost - shipping - etsyFees;
  const margin = (net / price) * 100;

  return {
    success: true,
    headline: `Net profit: ${money(net)}`,
    formula: 'Net = Selling price − Product cost − Shipping − Etsy fees',
    metrics: [
      { title: 'Total Fees', value: money(totalFees) },
      { title: 'Net Profit', value: money(net) },
      { title: 'Profit Margin', value: pct(margin) },
    ],
  };
}

export function calculateEbayFee(input) {
  const errors = [];
  const price = num(input.sellingPrice, 'Selling price', errors, { allowZero: false });
  const cost = num(input.productCost, 'Product cost', errors);
  const shipping = num(input.shippingCost, 'Shipping cost', errors);
  const ebayFee = num(input.ebayFee, 'eBay fee', errors);
  const paymentFee = num(input.paymentProcessingFee, 'Payment processing fee', errors);

  if (errors.length) return { success: false, errors };

  const totalFees = ebayFee + paymentFee;
  const net = price - cost - shipping - totalFees;
  const payout = price - totalFees;

  return {
    success: true,
    headline: `Final payout: ${money(payout)} · Net profit: ${money(net)}`,
    formula: 'Total fees = eBay fee + Payment fee · Payout = Price − Fees · Net = Payout − Cost − Shipping',
    metrics: [
      { title: 'Total Fees', value: money(totalFees) },
      { title: 'Net Profit', value: money(net) },
      { title: 'Final Payout', value: money(payout) },
    ],
  };
}

export function calculateFreelanceProjectPricing(input) {
  const errors = [];
  const hours = num(input.estimatedHours, 'Estimated project hours', errors, { allowZero: false });
  const rate = num(input.hourlyRate, 'Hourly rate', errors, { allowZero: false });
  const revisions = num(input.numberOfRevisions, 'Number of revisions', errors);
  const hoursPerRevision = num(input.hoursPerRevision || 1, 'Hours per revision', errors);
  const contingency = num(input.contingencyPct, 'Contingency %', errors);

  if (errors.length) return { success: false, errors };

  const revisionHours = revisions * hoursPerRevision;
  const baseHours = hours + revisionHours;
  const contingencyHours = baseHours * (contingency / 100);
  const totalHours = baseHours + contingencyHours;
  const price = totalHours * rate;
  const profit = revisionHours * rate + contingencyHours * rate; // buffer value vs raw hours
  const effectiveRate = price / (hours + revisionHours || 1);

  return {
    success: true,
    headline: `Suggested project price: ${money(price)}`,
    formula: 'Price = (Hours + Revision hours) × (1 + Contingency%) × Hourly rate',
    metrics: [
      { title: 'Suggested Project Price', value: money(price) },
      { title: 'Estimated Buffer / Contingency Value', value: money(profit) },
      { title: 'Effective Hourly Rate', value: money(effectiveRate) },
      { title: 'Total Billable Hours (incl. contingency)', value: qty(round2(totalHours)) },
    ],
  };
}

export function calculateSalaryToHourly(input) {
  const errors = [];
  const period = input.salaryPeriod || 'annual';
  const salary = num(input.salary, period === 'annual' ? 'Annual salary' : 'Monthly salary', errors, {
    allowZero: false,
  });
  const daysPerWeek = num(input.workingDaysPerWeek, 'Working days per week', errors, { allowZero: false });
  const hoursPerDay = num(input.workingHoursPerDay, 'Working hours per day', errors, { allowZero: false });
  const weeksPerYear = num(input.weeksPerYear || 52, 'Weeks per year', errors, { allowZero: false });

  if (errors.length) return { success: false, errors };

  const annual = period === 'monthly' ? salary * 12 : salary;
  const monthly = annual / 12;
  const weekly = annual / weeksPerYear;
  const daily = weekly / daysPerWeek;
  const hourly = daily / hoursPerDay;

  return {
    success: true,
    headline: `Hourly rate: ${money(hourly)}`,
    formula: 'Hourly = Annual salary / (Weeks × Days/week × Hours/day)',
    metrics: [
      { title: 'Hourly Rate', value: money(hourly) },
      { title: 'Daily Salary', value: money(daily) },
      { title: 'Weekly Salary', value: money(weekly) },
      { title: 'Monthly Salary', value: money(monthly) },
    ],
  };
}

/** Map slug → calculator function */
export const calculatorFns = {
  'freelance-hourly-rate': calculateFreelanceHourlyRate,
  'ai-api-cost': calculateAiApiCost,
  'saas-pricing': calculateSaasPricing,
  'customer-ltv': calculateCustomerLtv,
  'customer-cac': calculateCustomerCac,
  'break-even': calculateBreakEven,
  'profit-margin': calculateProfitMargin,
  'content-marketing-roi': calculateContentMarketingRoi,
  'google-ads-profit': calculateGoogleAdsProfit,
  'email-marketing-roi': calculateEmailMarketingRoi,
  'affiliate-earnings': calculateAffiliateEarnings,
  'adsense-revenue': calculateAdsenseRevenue,
  'ecommerce-profit': calculateEcommerceProfit,
  'amazon-fba-profit': calculateAmazonFbaProfit,
  'etsy-fee-profit': calculateEtsyFeeProfit,
  'ebay-fee': calculateEbayFee,
  'freelance-project-pricing': calculateFreelanceProjectPricing,
  'salary-to-hourly': calculateSalaryToHourly,
};
