/**
 * Business & Marketing Calculators — tool registry (18 tools).
 * Deterministic math only — no LLM / API dependency.
 */

export const CALCULATORS_CATEGORY_SLUG = 'calculators';
export const CALCULATORS_FOLDER = 'calculators';

export const calculatorTools = [
  {
    slug: 'freelance-hourly-rate',
    name: 'Freelance Hourly Rate Calculator',
    desc: 'Set minimum, recommended & premium hourly rates from income goals',
    seoSlug: 'freelance-hourly-rate-calculator',
  },
  {
    slug: 'ai-api-cost',
    name: 'AI API Cost Calculator',
    desc: 'Estimate OpenAI, Anthropic, Google & DeepSeek API spend',
    seoSlug: 'ai-api-cost-calculator',
  },
  {
    slug: 'saas-pricing',
    name: 'SaaS Pricing Calculator',
    desc: 'Find break-even and recommended subscription prices',
    seoSlug: 'saas-pricing-calculator',
  },
  {
    slug: 'customer-ltv',
    name: 'Customer Lifetime Value (LTV) Calculator',
    desc: 'Calculate LTV from order value, frequency & lifespan',
    seoSlug: 'customer-lifetime-value-calculator',
  },
  {
    slug: 'customer-cac',
    name: 'Customer Acquisition Cost (CAC) Calculator',
    desc: 'Measure CAC from marketing and sales spend',
    seoSlug: 'customer-acquisition-cost-calculator',
  },
  {
    slug: 'break-even',
    name: 'Break-even Calculator',
    desc: 'Find break-even units and revenue for any product',
    seoSlug: 'break-even-calculator',
  },
  {
    slug: 'profit-margin',
    name: 'Profit Margin Calculator',
    desc: 'Gross profit, margin % and markup from cost & price',
    seoSlug: 'profit-margin-calculator',
  },
  {
    slug: 'content-marketing-roi',
    name: 'Content Marketing ROI Calculator',
    desc: 'Estimate traffic, customers & ROI from content',
    seoSlug: 'content-marketing-roi-calculator',
  },
  {
    slug: 'google-ads-profit',
    name: 'Google Ads Profit Calculator',
    desc: 'Model clicks, conversions, profit and ads ROI',
    seoSlug: 'google-ads-profit-calculator',
  },
  {
    slug: 'email-marketing-roi',
    name: 'Email Marketing ROI Calculator',
    desc: 'Project opens, clicks, customers & email ROI',
    seoSlug: 'email-marketing-roi-calculator',
  },
  {
    slug: 'affiliate-earnings',
    name: 'Affiliate Earnings Calculator',
    desc: 'Estimate affiliate clicks, sales and commissions',
    seoSlug: 'affiliate-earnings-calculator',
  },
  {
    slug: 'adsense-revenue',
    name: 'AdSense Revenue Calculator',
    desc: 'Estimate AdSense earnings from pageviews & RPM',
    seoSlug: 'adsense-revenue-calculator',
  },
  {
    slug: 'ecommerce-profit',
    name: 'Ecommerce Profit Calculator',
    desc: 'Net profit after cost, shipping, fees and ads',
    seoSlug: 'ecommerce-profit-calculator',
  },
  {
    slug: 'amazon-fba-profit',
    name: 'Amazon FBA Profit Calculator',
    desc: 'FBA net profit, margin and ROI after Amazon fees',
    seoSlug: 'amazon-fba-profit-calculator',
  },
  {
    slug: 'etsy-fee-profit',
    name: 'Etsy Fee & Profit Calculator',
    desc: 'Total Etsy fees, net profit and margin',
    seoSlug: 'etsy-fee-profit-calculator',
  },
  {
    slug: 'ebay-fee',
    name: 'eBay Fee Calculator',
    desc: 'eBay fees, net profit and final seller payout',
    seoSlug: 'ebay-fee-calculator',
  },
  {
    slug: 'freelance-project-pricing',
    name: 'Freelance Project Pricing Calculator',
    desc: 'Price projects with hours, revisions and contingency',
    seoSlug: 'freelance-project-pricing-calculator',
  },
  {
    slug: 'salary-to-hourly',
    name: 'Salary to Hourly Rate Calculator',
    desc: 'Convert annual or monthly salary to hourly rate',
    seoSlug: 'salary-to-hourly-rate-calculator',
  },
];

export const CALCULATOR_TOOL_SLUGS = calculatorTools.map((t) => t.slug);

export function getCalculatorTool(slug) {
  return calculatorTools.find((t) => t.slug === slug) || null;
}
