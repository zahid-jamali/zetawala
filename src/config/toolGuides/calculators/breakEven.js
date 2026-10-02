/**
 * ZetaWala Tool Guide: Break-Even Calculator
 * Category: Business & Marketing Calculators
 * Deterministic math: Contribution = Price - Variable | Units = Fixed / Contribution | Revenue = Units * Price
 */

export const breakEvenGuide = {
  toolSlug: 'break-even',
  category: 'calculators',
  seoTitle: 'Break-Even Calculator – Calculate Units & Revenue Floor | ZetaWala',
  metaDescription:
    'Calculate break-even units, break-even revenue, and unit contribution margin from fixed overhead, unit selling price, and variable unit costs.',
  h1: 'Break-Even Calculator',
  subtitle:
    'Determine the exact sales volume and revenue milestone required to cover all operating overhead and begin generating net business profit.',
  whatItDoes:
    'The Break-Even Calculator models the operational intersection where total sales revenue exactly equals total business costs (zero profit and zero loss). By dividing your recurring fixed expenses by your unit contribution margin (selling price minus variable cost), this tool calculates two non-negotiable financial thresholds: the total unit sales required to break even and the corresponding gross revenue required. Every unit sold beyond this milestone converts its entire contribution margin directly into bottom-line profit.',
  problemSolved: {
    problem:
      'Founders, product managers, and manufacturers frequently launch products or commit to recurring overhead without knowing the minimum sales volume required to prevent insolvency.',
    whyManualIsDifficult:
      'Isolating fixed structural costs (rent, salaries, software) from variable per-unit costs (materials, fulfillment, payment processing) and determining how price adjustments alter sales volume requirements is cumbersome and prone to error.',
    howToolSimplifies:
      'Instantly computes break-even volume, revenue, and contribution margin per unit, highlighting how adjusting prices or trimming variable costs changes sales targets.',
  },
  whoIsItFor: [
    'Startups and entrepreneurs preparing financial projections and investor pitch decks',
    'Product managers evaluating whether new physical goods or SaaS features are commercially viable',
    'Small business owners assessing whether taking on a new lease or hiring full-time staff is sustainable',
    'E-commerce merchants calculating unit thresholds needed to justify monthly subscription tools or warehouse space',
  ],
  inputs: [
    {
      name: 'Fixed Costs',
      description: 'Total recurring operating expenses that remain constant regardless of production or sales volume (rent, full-time payroll, software subscriptions, insurance).',
      format: 'Currency ($)',
      impact: 'The total financial barrier that must be completely absorbed by unit contribution margins before any profit is recognized.',
    },
    {
      name: 'Selling Price per Unit',
      description: 'The net price charged to the consumer for a single unit of your product or service.',
      format: 'Currency ($)',
      impact: 'The primary revenue driver per transaction; must strictly exceed variable cost per unit.',
    },
    {
      name: 'Variable Cost per Unit',
      description: 'Direct costs incurred specifically when producing and fulfilling one additional unit (raw materials, packaging, transaction fees, direct labor).',
      format: 'Currency ($)',
      impact: 'Subtracted from selling price to determine the per-unit contribution margin.',
    },
  ],
  howItWorks: [
    'Subtracts Variable Cost per Unit from Selling Price per Unit to compute Unit Contribution Margin.',
    'Validates that selling price exceeds variable cost; if price is lower than or equal to variable cost, break-even is mathematically impossible.',
    'Divides total Fixed Costs by Unit Contribution Margin to compute the precise Break-Even Units required.',
    'Multiplies Break-Even Units by Selling Price to calculate the total Break-Even Revenue milestone.',
    'Calculates Profit After Break-Even, representing the exact cash added to net profit for every additional unit sold.',
  ],
  formula: {
    expression: 'Break-Even Units = Fixed Costs ÷ (Selling Price − Variable Cost) | Break-Even Revenue = Break-Even Units × Selling Price',
    variables: [
      { symbol: 'Fixed Costs', definition: 'Cumulative recurring overhead expenses invariant to production volume' },
      { symbol: 'Selling Price', definition: 'Revenue received per individual unit sold' },
      { symbol: 'Variable Cost', definition: 'Direct marginal cost incurred to manufacture and deliver one unit' },
      { symbol: 'Contribution Margin', definition: 'Selling Price minus Variable Cost; funds fixed costs until zero balance' },
    ],
    notes: 'Once fixed costs are fully covered, each subsequent unit sold generates profit equal to its Contribution Margin.',
  },
  interpretation: {
    overview:
      'The calculator delivers your operational safety line. Break-Even Units shows the minimum physical quantity of goods you must deliver in the period. Break-Even Revenue represents the dollar milestone your sales team or marketing funnel must achieve before the company generates $1 of true profit.',
    benchmarks:
      'If your break-even units require selling to more than 5% to 10% of your total addressable market within a single month, your business model possesses high operational risk and either price must increase or fixed overhead must decrease.',
    actionableAdvice:
      'Use the Contribution Margin metric to evaluate volume versus price trade-offs. Raising price by even 10% often cuts the required break-even unit sales volume by 25% or more.',
    caution:
      'The model assumes selling price and variable costs remain linear across all volumes. In practice, high production volumes may unlock bulk supplier discounts, or scaling marketing may increase marginal acquisition costs.',
  },
  example: {
    scenario: 'A specialty coffee roaster with $6,000 monthly fixed overhead (roaster lease, utilities, staff) selling 1-lb bags for $18.00 with $6.00 variable cost (beans, packaging, shipping).',
    inputs: {
      'Fixed Costs': '$6,000.00',
      'Selling Price': '$18.00',
      'Variable Cost': '$6.00',
    },
    process:
      'Contribution Margin = $18.00 − $6.00 = $12.00 per bag. Break-Even Units = $6,000 ÷ $12.00 = 500 bags. Break-Even Revenue = 500 × $18.00 = $9,000.00.',
    output: {
      'Break-even Units': '500 units',
      'Break-even Revenue': '$9,000.00',
      'Contribution Margin / Unit': '$12.00',
      'Profit After Break-even': '$12.00 / extra unit',
    },
    interpretation:
      'The roaster must sell exactly 500 bags ($9,000 in gross sales) each month to pay all bills. Bag #501 delivers $12.00 in pure profit straight to the company bottom line.',
  },
  useCases: [
    {
      situation: 'Evaluating a new product launch',
      benefit: 'Quantifies whether the sales volume necessary to recoup upfront tooling and recurring production costs is realistic given market demand.',
    },
    {
      situation: 'Deciding whether to take on a commercial lease or hire staff',
      benefit: 'Calculates exactly how many additional units your business must sell each month to justify an extra $3,000/month or $5,000/month in fixed operational commitments.',
    },
    {
      situation: 'Testing price change sensitivity',
      benefit: 'Demonstrates how increasing prices increases unit contribution margin, allowing you to hit profitability on fewer total unit sales.',
    },
  ],
  limitations: [
    'Assumes variable cost per unit remains constant regardless of whether you produce 10 units or 10,000 units.',
    'Does not account for unsold inventory holding costs or product spoilage.',
    'Assumes all produced units are sold at the full stated selling price without accounting for returned items or promotional discounts.',
  ],
  commonMistakes: [
    {
      mistake: 'Classifying variable advertising spend as fixed overhead',
      prevention: 'Direct per-unit acquisition ad spend should be factored into variable costs, whereas branding retainer fees belong under fixed costs.',
    },
    {
      mistake: 'Entering a selling price lower than variable cost',
      prevention: 'If an item costs $12 in materials and sells for $10, every sale increases the deficit. Selling price must always exceed unit variable cost.',
    },
  ],
  faqs: [
    {
      q: 'What is the definition of contribution margin?',
      a: 'Contribution margin is the dollar amount left from each unit sale after paying direct variable costs: (Selling Price − Variable Cost). This remaining cash "contributes" directly toward paying off fixed costs until break-even is achieved, after which it represents pure operating profit.',
    },
    {
      q: 'What happens if my selling price equals my variable cost?',
      a: 'If selling price equals variable cost, your contribution margin is zero. You will never break even regardless of how many units you sell, as no surplus cash is generated to pay down your fixed overhead.',
    },
    {
      q: 'How frequently should a company calculate its break-even point?',
      a: 'At least quarterly, or whenever significant operational changes occur—such as supplier price adjustments, staffing hires, software changes, or marketing strategy pivots.',
    },
    {
      q: 'Can break-even analysis be applied to service businesses and agencies?',
      a: 'Yes. In service businesses, fixed costs comprise office rent, leadership salaries, and software. Variable costs represent project-specific contractor wages, client travel expenses, and software licenses provisioned per client.',
    },
    {
      q: 'How can a company lower its break-even point?',
      a: 'By executing three levers: 1) Increasing selling prices (raising contribution margin), 2) Negotiating lower supplier costs (reducing variable costs), or 3) Trimming unnecessary fixed recurring overhead.',
    },
  ],
  relatedTools: [
    {
      name: 'Profit Margin Calculator',
      slug: 'profit-margin',
      path: '/tools/calculators/profit-margin-calculator',
      reason: 'Analyze unit margin percentages alongside macro break-even volume targets.',
    },
    {
      name: 'SaaS Pricing Calculator',
      slug: 'saas-pricing',
      path: '/tools/calculators/saas-pricing-calculator',
      reason: 'Model break-even subscriber thresholds and recurring revenue pricing for software products.',
    },
    {
      name: 'Customer Acquisition Cost (CAC) Calculator',
      slug: 'customer-cac',
      path: '/tools/calculators/customer-acquisition-cost-calculator',
      reason: 'Calculate customer acquisition costs to determine how ad spend influences unit variable economics.',
    },
  ],
  relatedGuides: [
    {
      title: 'How to Calculate Your Business Break-Even Point Step-by-Step',
      href: '/blog/calculators',
    },
  ],
};
