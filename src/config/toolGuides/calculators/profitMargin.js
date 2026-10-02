/**
 * ZetaWala Tool Guide: Profit Margin Calculator
 * Category: Business & Marketing Calculators
 * Deterministic math: Gross Profit = Price - Cost | Margin% = (Gross / Price) * 100 | Markup% = (Gross / Cost) * 100
 */

export const profitMarginGuide = {
  toolSlug: 'profit-margin',
  category: 'calculators',
  seoTitle: 'Profit Margin Calculator – Gross Margin & Markup | ZetaWala',
  metaDescription:
    'Calculate gross profit, profit margin percentage, and markup percentage from product cost and selling price. Instant deterministic retail & ecommerce pricing.',
  h1: 'Profit Margin Calculator',
  subtitle:
    'Compute gross profit, margin percentage, and corresponding markup percentage to ensure sustainable retail, wholesale, and ecommerce pricing.',
  whatItDoes:
    'The Profit Margin Calculator computes the exact financial spread between your product’s cost of goods sold (COGS) and its retail selling price. It provides three critical retail metrics simultaneously: gross dollar profit, profit margin percentage (profit relative to selling price), and markup percentage (profit relative to cost). By clarifying the mathematical relationship between margin and markup, it prevents businesses from confusing the two metrics and inadvertently selling inventory at a loss.',
  problemSolved: {
    problem:
      'Business owners frequently confuse profit margin with markup. For example, assuming a 50% markup yields a 50% margin (when it actually yields only 33.3% margin) leads to severe mispricing and unanticipated operating deficits.',
    whyManualIsDifficult:
      'Constantly recomputing inverse percentages across product catalogs while adjusting supplier costs or seasonal promotional discounts creates room for manual calculation errors.',
    howToolSimplifies:
      'Instantly displays gross profit, margin %, and markup % side-by-side as soon as cost and price are entered, establishing clear visibility into pricing unit economics.',
  },
  whoIsItFor: [
    'E-commerce merchants (Shopify, Amazon, WooCommerce) setting retail catalog pricing',
    'Wholesale distributors calculating resale margins for B2B retail partnerships',
    'Manufacturers evaluating the impact of raw material price increases on end-consumer margins',
    'Retail store managers auditing product lines to identify low-margin inventory',
  ],
  inputs: [
    {
      name: 'Product Cost (COGS)',
      description: 'The total cost required to acquire or produce one unit (manufacturing, wholesale purchase, direct packaging, shipping to warehouse).',
      format: 'Currency ($)',
      impact: 'The cost floor subtracted from selling price to determine gross profit and the denominator for markup.',
    },
    {
      name: 'Selling Price',
      description: 'The final retail price charged to the customer before sales taxes.',
      format: 'Currency ($)',
      impact: 'The gross revenue per unit and the denominator used to calculate profit margin percentage.',
    },
  ],
  howItWorks: [
    'Subtracts Product Cost from Selling Price to calculate the absolute dollar Gross Profit.',
    'Divides Gross Profit by Selling Price and multiplies by 100 to yield the Profit Margin Percentage.',
    'Divides Gross Profit by Product Cost and multiplies by 100 to calculate the Markup Percentage.',
    'Provides instant validation ensuring that selling price exceeds product cost before rendering output.',
  ],
  formula: {
    expression: 'Gross Profit = Price − Cost | Margin% = (Gross Profit ÷ Price) × 100 | Markup% = (Gross Profit ÷ Cost) × 100',
    variables: [
      { symbol: 'Price', definition: 'Retail selling price charged to the buyer' },
      { symbol: 'Cost', definition: 'Cost of goods sold (COGS) to acquire or produce the item' },
      { symbol: 'Margin%', definition: 'Percentage of the selling price that represents profit' },
      { symbol: 'Markup%', definition: 'Percentage added to the cost price to arrive at the selling price' },
    ],
    notes: 'Margin can never exceed 100%, whereas markup can scale infinitely (e.g., 200%, 500%).',
  },
  interpretation: {
    overview:
      'The calculator reveals the true profitability of each unit sold. Gross Profit shows cash retained per unit. Profit Margin % shows what portion of every revenue dollar is kept as profit. Markup % shows how much you inflated the cost to reach the price.',
    benchmarks:
      'Healthy gross profit margins vary widely by industry: Grocery/Commodities typically run at 15–25%, retail e-commerce averages 40–60%, and software/digital goods frequently operate at 70–85% gross margins.',
    actionableAdvice:
      'Always use Profit Margin % when budgeting for overhead, marketing ad spend, and net profit targets. Use Markup % strictly when instructing suppliers or warehouse fulfillment on pricing markups.',
    caution:
      'Gross profit margin does NOT account for operating expenses (SG&A), customer acquisition cost (ad spend), payment processing fees (e.g. 2.9% + $0.30), or storage overhead.',
  },
  example: {
    scenario: 'An online apparel retailer sourcing a leather jacket for $40.00 and selling it for $100.00.',
    inputs: {
      'Product Cost': '$40.00',
      'Selling Price': '$100.00',
    },
    process:
      'Gross Profit = $100.00 − $40.00 = $60.00. Margin% = ($60.00 ÷ $100.00) × 100 = 60.0%. Markup% = ($60.00 ÷ $40.00) × 100 = 150.0%.',
    output: {
      'Gross Profit': '$60.00',
      'Profit Margin': '60.00%',
      'Markup': '150.00%',
    },
    interpretation:
      'For every $100 jacket sold, the retailer retains $60.00 (a 60% margin) to cover marketing, shipping, and net profit. The product is marked up by 150% over wholesale cost.',
  },
  useCases: [
    {
      situation: 'Pricing new retail or e-commerce products',
      benefit: 'Ensures the target selling price covers production costs while leaving sufficient margin cushion for paid advertising and promotions.',
    },
    {
      situation: 'Supplier price increases',
      benefit: 'Quickly recalculates how a supplier price increase affects margin if retail prices remain static, or what price increase is needed to preserve margins.',
    },
    {
      situation: 'Setting seasonal discount thresholds',
      benefit: 'Prevents discounting products beyond their gross profit floor during Black Friday or seasonal clearance campaigns.',
    },
  ],
  limitations: [
    'Measures gross profit only; does not calculate net profit after marketing, platform commissions, or administrative overhead.',
    'Does not include sales tax or VAT in the price calculation unless entered on a tax-exclusive basis.',
    'Assumes single-unit economics without modeling tiered volume discounts from suppliers.',
  ],
  commonMistakes: [
    {
      mistake: 'Assuming a 100% markup equals a 100% margin',
      prevention: 'A 100% markup on a $50 item gives a $100 price, which yields a 50% profit margin, not 100%. Margin can never reach 100% unless cost is zero.',
    },
    {
      mistake: 'Excluding inbound freight and customs from Product Cost',
      prevention: 'Always calculate landed cost (wholesale price + shipping + customs duties + packaging) as the true product cost.',
    },
  ],
  faqs: [
    {
      q: 'What is the key difference between profit margin and markup?',
      a: 'Profit margin is the percentage of the selling price that is profit: (Profit ÷ Selling Price) × 100. Markup is the percentage added to the cost price to reach the selling price: (Profit ÷ Cost) × 100. Margin measures revenue retention; markup measures cost inflation.',
    },
    {
      q: 'Can profit margin ever be higher than 100%?',
      a: 'No. Profit margin can never exceed 100% because profit cannot be greater than the selling price itself. Markup, however, can easily exceed 100% (for example, marking up a $10 item to $30 is a 200% markup).',
    },
    {
      q: 'What is a good gross profit margin for an e-commerce store?',
      a: 'Most direct-to-consumer (DTC) e-commerce brands require a gross profit margin between 50% and 70%. Margins below 40% make paid advertising (Meta/Google Ads) and platform transaction fees difficult to sustain profitably.',
    },
    {
      q: 'Does this calculator include shipping and handling costs?',
      a: 'If you want them included in your gross margin calculation, combine manufacturing, packaging, and inbound shipping into the Product Cost field.',
    },
    {
      q: 'How do I calculate what selling price to charge for a specific target margin?',
      a: 'Use the formula: Selling Price = Product Cost ÷ (1 − (Target Margin% ÷ 100)). For example, if cost is $50 and target margin is 40%: $50 ÷ (1 − 0.40) = $50 ÷ 0.60 = $83.33.',
    },
  ],
  relatedTools: [
    {
      name: 'Break-even Calculator',
      slug: 'break-even',
      path: '/tools/calculators/break-even-calculator',
      reason: 'Determine how many units you must sell at your target price to cover all fixed business overhead.',
    },
    {
      name: 'Ecommerce Profit Calculator',
      slug: 'ecommerce-profit',
      path: '/tools/calculators/ecommerce-profit-calculator',
      reason: 'Expand unit margins into comprehensive net profit after platform fees, payment processing, and ad spend.',
    },
    {
      name: 'Amazon FBA Profit Calculator',
      slug: 'amazon-fba-profit',
      path: '/tools/calculators/amazon-fba-profit-calculator',
      reason: 'Calculate Amazon referral fees, fulfillment fees, and storage costs against retail margins.',
    },
  ],
  relatedGuides: [
    {
      title: 'Margin vs Markup: The Critical Math Every Seller Must Know',
      href: '/blog/calculators',
    },
  ],
};
