/**
 * Shared marketplace tool definitions for Shopee & Lazada.
 */

function tool(prefix, base, name, desc, opts = {}) {
  const slug = `${prefix}-${base}`;
  return {
    slug,
    name,
    desc,
    seoSlug: slug,
    marketplace: prefix,
    base,
    ...opts,
  };
}

export function createMarketplaceTools(prefix, brand) {
  return [
    tool(prefix, 'listing-title-generator', `${brand} Listing Title Generator`, 'SEO-optimized listing titles with character counts', { ai: true }),
    tool(prefix, 'product-description-generator', `${brand} Product Description Generator`, 'Optimized descriptions with bullets and CTA', { ai: true }),
    tool(prefix, 'keyword-generator', `${brand} Keyword Generator`, 'Primary, long-tail, and search-intent keywords', { ai: true }),
    tool(prefix, 'listing-seo-analyzer', `${brand} Listing SEO Analyzer`, 'SEO score, missing keywords, and readability', { ai: true }),
    tool(prefix, 'profit-calculator', `${brand} Profit Calculator`, 'Net profit, margin, and ROI from costs and fees', { clientOnly: true }),
    tool(prefix, 'fee-calculator', `${brand} Fee Calculator`, 'Configurable marketplace and payment fees', { clientOnly: true }),
    tool(prefix, 'pricing-calculator', `${brand} Pricing Calculator`, 'Suggested, break-even, competitive, and premium prices', { hybrid: true }),
    tool(prefix, 'shipping-calculator', `${brand} Shipping Calculator`, 'Estimated shipping cost and delivery time', { clientOnly: true }),
    tool(prefix, 'chat-reply-generator', `${brand} Chat Reply Generator`, 'Professional, friendly, and short customer replies', { ai: true }),
    tool(prefix, 'listing-optimizer', `${brand} Listing Optimizer`, 'Optimized title, description, keywords, and quality score', { ai: true }),
  ];
}

export const AI_BASES = [
  'listing-title-generator',
  'product-description-generator',
  'keyword-generator',
  'listing-seo-analyzer',
  'chat-reply-generator',
  'listing-optimizer',
  'pricing-calculator',
];

export const CALC_BASES = [
  'profit-calculator',
  'fee-calculator',
  'pricing-calculator',
  'shipping-calculator',
];
