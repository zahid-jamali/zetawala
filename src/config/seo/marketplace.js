function faqs(brand, tool) {
  return [
    { q: `What does the ${brand} ${tool} do?`, a: `It helps ${brand} sellers improve listings, pricing, or customer communication using Zetawala’s ${brand} Seller Toolkit.` },
    { q: 'Is it free?', a: `Yes. Zetawala’s ${brand} Seller Toolkit tools are free to use.` },
    { q: 'Does it use AI?', a: 'AI listing and reply tools use DeepSeek via the shared generate API. Profit, fee, and shipping calculators use deterministic math; pricing combines math with AI tips.' },
    { q: 'Which regions are supported?', a: 'Fee % and shipping tables are configurable so you can adapt to regional marketplace differences.' },
    { q: 'Who is this for?', a: `${brand} sellers who want faster listing SEO, clearer margins, and better customer replies.` },
  ];
}

function pack(prefix, brand) {
  const tools = [
    ['listing-title-generator', 'Listing Title Generator', 'SEO-optimized listing titles with character counts and variations.'],
    ['product-description-generator', 'Product Description Generator', 'Optimized product descriptions with bullets and CTAs.'],
    ['keyword-generator', 'Keyword Generator', 'Primary, long-tail, and search-intent keyword ideas.'],
    ['listing-seo-analyzer', 'Listing SEO Analyzer', 'SEO score, missing keywords, readability, and suggestions.'],
    ['profit-calculator', 'Profit Calculator', 'Net profit, margin, and ROI from cost, price, shipping, fees, and ads—pure math.'],
    ['fee-calculator', 'Fee Calculator', 'Configurable marketplace and payment fees with seller payout estimates—pure math.'],
    ['pricing-calculator', 'Pricing Calculator', 'Suggested, break-even, competitive, and premium prices with AI tips.'],
    ['shipping-calculator', 'Shipping Calculator', 'Estimated shipping cost and delivery time from configurable regional tables.'],
    ['chat-reply-generator', 'Chat Reply Generator', 'Professional, friendly, and short replies to customer messages.'],
    ['listing-optimizer', 'Listing Optimizer', 'Optimized title, description, keywords, SEO improvements, and quality score.'],
  ];
  const out = {};
  for (const [base, name, desc] of tools) {
    const slug = `${prefix}-${base}`;
    out[slug] = {
      title: `Free ${brand} ${name}`,
      description: `Free ${brand} ${name.toLowerCase()}. ${desc}`,
      example: { input: `${brand} seller inputs`, output: 'Ready-to-use optimized output' },
      faqs: faqs(brand, name),
    };
  }
  return out;
}

export const marketplaceSeoData = {
  ...pack('shopee', 'Shopee'),
  ...pack('lazada', 'Lazada'),
};
