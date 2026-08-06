/**
 * Shared DeepSeek prompts for Shopee & Lazada seller tools.
 */

function clamp(text, max = 10000) {
  const t = String(text || '').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}\n\n[Truncated]`;
}

function brand(action) {
  if (String(action).startsWith('lazada-')) return 'Lazada';
  return 'Shopee';
}

function baseOf(action) {
  return String(action).replace(/^(shopee|lazada)-/, '');
}

export function getMarketplacePrompt(action, payload = {}) {
  const marketplace = brand(action);
  const base = baseOf(action);
  if (!['shopee', 'lazada'].some((p) => String(action).startsWith(`${p}-`))) return null;

  switch (base) {
    case 'listing-title-generator': {
      const name = String(payload.productName || '').trim();
      if (!name) return null;
      return `Act as a ${marketplace} listing SEO specialist. Generate SEO-optimized product titles.
Product: ${name}
Category: ${payload.productCategory || payload.category || 'general'}
Keywords: ${payload.targetKeywords || payload.keywords || 'n/a'}
Country/region: ${payload.targetCountry || 'Southeast Asia'}
Respect typical ${marketplace} title length best practices (prefer under 120 characters when possible).

Return ONLY valid JSON:
{
  "titles": [
    { "title": "...", "characterCount": 0 }
  ],
  "tips": ["..."]
}`;
    }

    case 'product-description-generator': {
      const name = String(payload.productName || payload.productDetails || '').trim();
      if (!name) return null;
      return `Act as a ${marketplace} product copywriter.
Product: ${name}
Features: ${payload.features || 'n/a'}
Specifications: ${payload.specifications || 'n/a'}
Audience: ${payload.targetAudience || 'shoppers'}

Return ONLY valid JSON:
{
  "description": "full optimized description",
  "bulletPoints": ["..."],
  "callToAction": "..."
}`;
    }

    case 'keyword-generator': {
      const product = String(payload.product || '').trim();
      if (!product) return null;
      return `Act as a ${marketplace} keyword researcher.
Product: ${product}
Category: ${payload.category || 'general'}
Niche: ${payload.niche || 'n/a'}

Return ONLY valid JSON:
{
  "primaryKeywords": ["..."],
  "longTailKeywords": ["..."],
  "searchIntentSuggestions": ["..."]
}`;
    }

    case 'listing-seo-analyzer': {
      const title = String(payload.listingTitle || payload.title || '').trim();
      const desc = clamp(payload.description);
      if (!title && !desc) return null;
      return `Act as a ${marketplace} listing SEO analyst.
Title: ${title || 'n/a'}
Description: ${desc || 'n/a'}
Keywords: ${payload.keywords || 'n/a'}

Return ONLY valid JSON:
{
  "seoScore": 0,
  "readability": { "score": 0, "notes": "..." },
  "missingKeywords": ["..."],
  "optimizationSuggestions": ["..."]
}`;
    }

    case 'pricing-calculator': {
      const cost = payload.productCost;
      if (cost == null || cost === '') return null;
      return `Act as a ${marketplace} pricing strategist. Packages/prices were pre-calculated.
Product cost: ${cost}
Desired margin %: ${payload.desiredProfitMargin || payload.desiredMarginPercent || 30}
Shipping: ${payload.shipping || 0}
Fees: ${payload.fees || 0}
Calculated: ${JSON.stringify(payload.pricing || {})}

Return ONLY valid JSON:
{
  "pricingSuggestions": ["..."],
  "positioningTips": "brief tip for ${marketplace} sellers"
}`;
    }

    case 'chat-reply-generator': {
      const msg = clamp(payload.customerMessage);
      if (!msg) return null;
      return `Act as a ${marketplace} seller chat specialist.
Customer message:
"""
${msg}
"""
Preferred tone hint: ${payload.replyTone || payload.tone || 'professional'}

Return ONLY valid JSON:
{
  "professionalReply": "...",
  "friendlyReply": "...",
  "shortReply": "..."
}`;
    }

    case 'listing-optimizer': {
      const listing = clamp(payload.existingListing);
      if (!listing) return null;
      return `Act as a ${marketplace} listing optimizer. Improve the existing listing without inventing false claims.

LISTING:
"""
${listing}
"""

Return ONLY valid JSON:
{
  "optimizedTitle": "...",
  "improvedDescription": "...",
  "keywordSuggestions": ["..."],
  "seoImprovements": ["..."],
  "qualityScore": 0
}`;
    }

    default:
      return null;
  }
}
