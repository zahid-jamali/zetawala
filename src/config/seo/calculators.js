export const calculatorsSeoData = {
  'freelance-hourly-rate': {
    title: 'Free Freelance Hourly Rate Calculator – Price Your Work',
    description:
      'Use Zetawala’s free freelance hourly rate calculator to set minimum, recommended, and premium rates from your income goal, expenses, tax %, and billable hours. It uses deterministic math only—no AI guesses—so freelancers, consultants, and solopreneurs see instant, transparent pricing they can quote with confidence. Results update as you change inputs.',
    example: {
      input: 'Goal: $5,000/mo · Expenses: $1,500 · Tax: 25% · Billable hours: 100',
      output: 'Minimum $86.67/hr · Recommended $112.67/hr · Premium $138.67/hr · Pre-tax need $8,666.67',
    },
    faqs: [
      {
        q: 'How is the freelance hourly rate calculated?',
        a: 'Pre-tax monthly need = (Income goal + Expenses) ÷ (1 − Tax%). Minimum rate = Pre-tax need ÷ Billable hours. Recommended is minimum × 1.3; premium is minimum × 1.6.',
      },
      {
        q: 'Does this calculator use AI?',
        a: 'No. Every result is deterministic math from your inputs. There is no LLM, API call, or estimated “market rate”—only transparent formulas that update instantly.',
      },
      {
        q: 'What is the difference between minimum, recommended, and premium rates?',
        a: 'Minimum covers your goal and expenses after tax. Recommended adds a 30% buffer for unpaid work and risk. Premium (×1.6) positions you for specialized or high-demand work.',
      },
      {
        q: 'Who should use a freelance hourly rate calculator?',
        a: 'Freelancers, consultants, designers, developers, and agencies who need a clear floor rate before quoting clients or converting to project pricing.',
      },
      {
        q: 'Should I bill every hour at the recommended rate?',
        a: 'Use recommended as your target billable rate. Non-billable time (admin, sales, learning) is why the buffer exists—so your take-home still hits the goal.',
      },
      {
        q: 'Can I convert this hourly rate into a project price?',
        a: 'Yes. Pair this tool with Zetawala’s Freelance Project Pricing Calculator to fold in hours, revisions, and contingency into a fixed quote.',
      },
    ],
  },

  'ai-api-cost': {
    title: 'Free AI API Cost Calculator – OpenAI, Claude & More',
    description:
      'Estimate OpenAI, Anthropic, Google, DeepSeek, or custom model spend with Zetawala’s free AI API cost calculator. Enter tokens, requests per day, and pricing per 1M tokens—then see cost per request, daily, monthly, and yearly totals from deterministic math (no AI). Ideal for founders, ML engineers, and SaaS teams budgeting LLM usage. Results update instantly.',
    example: {
      input: 'Provider: OpenAI · Model: gpt-4o-mini · 1,500 in / 500 out tokens · 100 requests/day · 30 days',
      output: 'Cost/request + Daily / Monthly / Yearly totals from published $/1M input & output rates',
    },
    faqs: [
      {
        q: 'How does the AI API cost calculator work?',
        a: 'Cost per request = (Input tokens ÷ 1M × $/1M input) + (Output tokens ÷ 1M × $/1M output). Daily = cost × requests/day; monthly and yearly scale from that.',
      },
      {
        q: 'Which providers and models are supported?',
        a: 'Built-in rates cover common OpenAI, Anthropic, Google, and DeepSeek models. Choose Custom to enter your own input and output $/1M prices.',
      },
      {
        q: 'Is this estimate the same as my invoice?',
        a: 'It is a deterministic projection from the rates and usage you enter. Actual bills may differ with caching, retries, tool calls, or provider price changes.',
      },
      {
        q: 'Does the calculator call the AI APIs?',
        a: 'No. It never sends tokens or requests to providers. Math runs locally from your inputs and the selected rate card.',
      },
      {
        q: 'Who benefits from an AI API cost calculator?',
        a: 'Product teams, indie hackers, and finance leads who need a clear monthly LLM budget before shipping features or scaling traffic.',
      },
      {
        q: 'How do I lower estimated API spend?',
        a: 'Reduce tokens per request, cache prompts, pick cheaper models for routine tasks, or lower requests/day—then re-run the calculator to see the new monthly total instantly.',
      },
    ],
  },

  'saas-pricing': {
    title: 'Free SaaS Pricing Calculator – Find Your Subscription Price',
    description:
      'Find break-even and recommended subscription prices with Zetawala’s free SaaS pricing calculator. Enter monthly operating expenses, desired profit, and expected customers—then get required MRR and profit projection from deterministic formulas (no AI). Built for founders, product managers, and solopreneurs validating pricing. Results update instantly as you tweak inputs.',
    example: {
      input: 'Expenses: $5,000/mo · Desired profit: $3,000 · Expected customers: 200',
      output: 'Break-even $25/mo · Recommended $40/mo · Required MRR $8,000 · Profit projection $3,000',
    },
    faqs: [
      {
        q: 'How is recommended SaaS pricing calculated?',
        a: 'Break-even price = Expenses ÷ Customers. Recommended price = (Expenses + Desired profit) ÷ Customers. Required MRR = Expenses + Desired profit.',
      },
      {
        q: 'Does this SaaS pricing tool use AI?',
        a: 'No. Prices and MRR are pure arithmetic from your numbers. There is no competitor scraping or AI “suggested” tier.',
      },
      {
        q: 'What if my customer count is a guess?',
        a: 'Use a conservative expected-customer figure (or model a few scenarios). Changing customers instantly revises break-even and recommended price.',
      },
      {
        q: 'Is break-even price the same as list price?',
        a: 'Break-even is the minimum average revenue per customer to cover expenses. List price usually sits at or above the recommended figure once you include profit goals.',
      },
      {
        q: 'Who should use a SaaS pricing calculator?',
        a: 'Early-stage SaaS founders, indie hackers, and ops leads setting or revisiting subscription tiers before launch or a price change.',
      },
      {
        q: 'How should I use this with LTV and CAC?',
        a: 'After pricing, check Customer LTV and CAC so subscription ARPU stays healthy versus acquisition cost and lifetime value.',
      },
    ],
  },

  'customer-ltv': {
    title: 'Free Customer Lifetime Value (LTV) Calculator',
    description:
      'Calculate customer lifetime value with Zetawala’s free LTV calculator using average order value, purchase frequency, and lifespan. Deterministic math only—no AI—so marketers, ecommerce owners, and SaaS teams get an instant, transparent LTV they can compare to CAC. Formulas and totals update as soon as you change inputs.',
    example: {
      input: 'AOV: $80 · Purchases/year: 4 · Lifespan: 3 years',
      output: 'LTV $960 · Annual customer value $320 · Projected revenue per customer $960',
    },
    faqs: [
      {
        q: 'What is the LTV formula used here?',
        a: 'LTV = Average Order Value × Purchases per Year × Customer Lifespan (years). Annual value = AOV × Frequency.',
      },
      {
        q: 'Is this customer LTV calculator free and AI-free?',
        a: 'Yes. It is free on Zetawala and uses only deterministic math—no machine learning or invented benchmarks.',
      },
      {
        q: 'How do I use LTV with CAC?',
        a: 'A healthy rule of thumb is LTV several times higher than CAC. Pair this tool with the Customer CAC Calculator to see whether acquisition spend is sustainable.',
      },
      {
        q: 'Does LTV include profit margin or only revenue?',
        a: 'This calculator projects revenue LTV from order value and repeat purchases. For contribution margins, combine with profit-margin or unit-economics tools.',
      },
      {
        q: 'Who benefits from calculating customer LTV?',
        a: 'Ecommerce brands, subscription businesses, agencies, and growth marketers deciding how much they can spend to acquire a customer.',
      },
      {
        q: 'What if purchase frequency is irregular?',
        a: 'Use a realistic average over a year. You can model optimistic and conservative frequency scenarios—results update instantly for each.',
      },
    ],
  },

  'customer-cac': {
    title: 'Free Customer Acquisition Cost (CAC) Calculator',
    description:
      'Measure customer acquisition cost with Zetawala’s free CAC calculator. Add marketing spend, sales spend, and customers acquired to get CAC and total acquisition spend from deterministic math—no AI. Perfect for growth marketers, founders, and finance teams checking whether ads and sales are efficient. Totals refresh instantly.',
    example: {
      input: 'Marketing: $10,000 · Sales: $5,000 · Customers acquired: 150',
      output: 'CAC $100 · Total acquisition spend $15,000',
    },
    faqs: [
      {
        q: 'How is CAC calculated?',
        a: 'CAC = (Marketing expenses + Sales expenses) ÷ Customers acquired. Total spend is the sum of marketing and sales costs.',
      },
      {
        q: 'Does this CAC tool use AI or industry averages?',
        a: 'No. It only divides the spend and customer counts you enter. There are no AI estimates or benchmark overlays.',
      },
      {
        q: 'What costs should I include in marketing and sales?',
        a: 'Include ads, content production, tools, commissions, SDR/AE salaries, and agency fees for the period you are measuring—so CAC reflects true acquisition cost.',
      },
      {
        q: 'What is a good CAC relative to LTV?',
        a: 'Many businesses aim for LTV:CAC of about 3:1 or better. Use Zetawala’s LTV calculator alongside CAC to check the ratio.',
      },
      {
        q: 'Who should use a customer acquisition cost calculator?',
        a: 'Performance marketers, SaaS founders, ecommerce operators, and agencies reporting paid and sales-driven acquisition efficiency.',
      },
      {
        q: 'Can I calculate CAC for a single channel?',
        a: 'Yes. Enter only that channel’s spend and the customers it acquired. Change inputs to compare Google Ads, content, or outbound side by side.',
      },
    ],
  },

  'break-even': {
    title: 'Free Break-even Calculator – Units & Revenue',
    description:
      'Find break-even units and revenue with Zetawala’s free break-even calculator. Enter fixed costs, selling price, and variable cost per unit to get contribution margin and units needed—using deterministic math only (no AI). Built for product sellers, manufacturers, and small businesses planning launches. Results update instantly.',
    example: {
      input: 'Fixed costs: $12,000 · Price: $50 · Variable cost: $20',
      output: 'Break-even 400 units · Break-even revenue $20,000 · Contribution $30/unit',
    },
    faqs: [
      {
        q: 'What is the break-even formula?',
        a: 'Break-even units = Fixed costs ÷ (Selling price − Variable cost per unit). Break-even revenue = Units × Selling price. Contribution margin per unit = Price − Variable cost.',
      },
      {
        q: 'Why must price be higher than variable cost?',
        a: 'If price ≤ variable cost, contribution margin is zero or negative and you can never cover fixed costs. The calculator requires a positive contribution margin.',
      },
      {
        q: 'Does this break-even calculator use AI?',
        a: 'No. Units and revenue are computed with standard cost accounting formulas. Nothing is estimated by a model.',
      },
      {
        q: 'What counts as fixed vs variable cost?',
        a: 'Fixed costs stay roughly constant (rent, salaries, software). Variable costs scale with each unit (materials, packaging, per-order shipping).',
      },
      {
        q: 'Who should use a break-even calculator?',
        a: 'Product founders, retailers, cafés, and manufacturers deciding how many units they must sell before a product or campaign becomes profitable.',
      },
      {
        q: 'What happens after break-even?',
        a: 'Each extra unit adds roughly the contribution margin to profit. The tool shows profit per extra unit after break-even so you can model upside quickly.',
      },
    ],
  },

  'profit-margin': {
    title: 'Free Profit Margin Calculator – Margin & Markup',
    description:
      'Calculate gross profit, profit margin %, and markup % with Zetawala’s free profit margin calculator. Enter product cost and selling price for instant, deterministic results—no AI. Ideal for retailers, freelancers, and ecommerce sellers checking pricing health. Figures update the moment you change cost or price.',
    example: {
      input: 'Product cost: $40 · Selling price: $100',
      output: 'Gross profit $60 · Profit margin 60% · Markup 150%',
    },
    faqs: [
      {
        q: 'How are margin and markup calculated?',
        a: 'Gross profit = Price − Cost. Margin% = Gross profit ÷ Price × 100. Markup% = Gross profit ÷ Cost × 100 (when cost > 0).',
      },
      {
        q: 'What is the difference between margin and markup?',
        a: 'Margin is profit as a share of selling price. Markup is profit as a share of cost. A 50% margin is not the same as a 50% markup.',
      },
      {
        q: 'Is this profit margin calculator AI-powered?',
        a: 'No. It uses only deterministic arithmetic so you always know how the percentages were derived.',
      },
      {
        q: 'Who should use a profit margin calculator?',
        a: 'Ecommerce sellers, wholesalers, service businesses, and anyone setting or reviewing list prices against cost of goods.',
      },
      {
        q: 'Does this include shipping, ads, or fees?',
        a: 'This tool focuses on cost vs price. For full landed profitability, use the Ecommerce Profit, Amazon FBA, Etsy, or eBay calculators.',
      },
      {
        q: 'Can margin be negative?',
        a: 'Yes—if cost exceeds price, gross profit and margin go negative, signaling you are selling at a loss on that unit.',
      },
    ],
  },

  'content-marketing-roi': {
    title: 'Free Content Marketing ROI Calculator',
    description:
      'Estimate traffic, customers, revenue, and ROI from content with Zetawala’s free content marketing ROI calculator. Enter articles per month, visitors, conversion rate, revenue per customer, and content cost—all computed with deterministic math (no AI). Built for content marketers, SEO teams, and agencies. Projections update instantly.',
    example: {
      input: '8 articles/mo · 1,200 visitors each · 2% conv · $120 AOV · $2,000 content cost',
      output: 'Traffic 9,600 · Customers 192 · Revenue $23,040 · ROI ~1,052%',
    },
    faqs: [
      {
        q: 'How is content marketing ROI calculated?',
        a: 'Traffic = Articles × Avg visitors. Customers = Traffic × Conversion%. Revenue = Customers × Avg revenue per customer. ROI% = (Revenue − Content cost) ÷ Content cost × 100 when cost > 0.',
      },
      {
        q: 'Does this tool invent traffic or rankings?',
        a: 'No. It only multiplies the assumptions you enter. There is no AI forecasting of search volume or rankings.',
      },
      {
        q: 'What conversion rate should I use?',
        a: 'Use a realistic sitewide or landing-page conversion rate from analytics. Conservative rates help avoid overstating ROI.',
      },
      {
        q: 'Who benefits from a content marketing ROI calculator?',
        a: 'SEO leads, content agencies, and founders justifying blog, video, or resource investment against expected pipeline revenue.',
      },
      {
        q: 'Why is ROI blank sometimes?',
        a: 'ROI needs a monthly content cost greater than zero. Set cost to see return; without cost you still see traffic, customers, and revenue.',
      },
      {
        q: 'Can I model one pillar page instead of a monthly cadence?',
        a: 'Yes—set articles to 1 and use that page’s expected visitors and conversion rate to estimate its revenue contribution.',
      },
    ],
  },

  'google-ads-profit': {
    title: 'Free Google Ads Profit Calculator – ROI & Conversions',
    description:
      'Model Google Ads clicks, conversions, revenue, profit, and ROI with Zetawala’s free Google Ads profit calculator. Enter budget, average CPC, conversion rate, and order value—results use deterministic math only (no AI). Built for PPC managers, ecommerce advertisers, and agencies. Estimates refresh instantly as you adjust bids or budgets.',
    example: {
      input: 'Budget: $3,000 · CPC: $1.50 · Conv rate: 3% · AOV: $85',
      output: 'Clicks 2,000 · Conversions 60 · Revenue $5,100 · Profit $2,100 · ROI 70%',
    },
    faqs: [
      {
        q: 'How does the Google Ads profit formula work?',
        a: 'Clicks = Budget ÷ CPC. Conversions = Clicks × Conversion%. Revenue = Conversions × AOV. Profit = Revenue − Budget. ROI% = Profit ÷ Budget × 100.',
      },
      {
        q: 'Is this connected to my Google Ads account?',
        a: 'No. It is a planning calculator. Paste planned or historical averages to model profit before you scale spend.',
      },
      {
        q: 'Does the calculator use AI?',
        a: 'No. Every metric is deterministic arithmetic from budget, CPC, conversion rate, and order value.',
      },
      {
        q: 'Who should use a Google Ads profit calculator?',
        a: 'Performance marketers, shop owners, and agencies stress-testing whether a campaign’s CPC and conversion rate can hit profit goals.',
      },
      {
        q: 'What if profit is negative?',
        a: 'That means projected revenue is below budget. Lower CPC, raise conversion rate or AOV, or reduce spend—and re-run for an instant revised ROI.',
      },
      {
        q: 'Can I use this for Meta or other paid channels?',
        a: 'The math is channel-agnostic if you have budget, CPC (or cost per click), conversion rate, and AOV. Labels are Google Ads–oriented, but the model works the same.',
      },
    ],
  },

  'email-marketing-roi': {
    title: 'Free Email Marketing ROI Calculator',
    description:
      'Project opens, clicks, customers, revenue, and ROI from email campaigns with Zetawala’s free email marketing ROI calculator. Enter list size, open rate, click rate, conversion rate, order value, and campaign cost—computed with deterministic math (no AI). Ideal for ecommerce and lifecycle marketers. Results update instantly.',
    example: {
      input: 'List: 25,000 · Open 28% · Click 4% · Conv 2.5% · AOV $70 · Cost $400',
      output: 'Opens 7,000 · Clicks 1,000 · Customers 25 · Revenue $1,750 · ROI ~337.5%',
    },
    faqs: [
      {
        q: 'How is email marketing ROI calculated?',
        a: 'Opens = List × Open%. Clicks = List × Click%. Customers = Clicks × Conversion%. Revenue = Customers × AOV. ROI% = (Revenue − Campaign cost) ÷ Campaign cost × 100 when cost > 0.',
      },
      {
        q: 'Are open and click rates applied independently?',
        a: 'Yes. Click rate is applied to the full list (industry-style click-to-delivered), not only to openers—matching common ESP reporting.',
      },
      {
        q: 'Does this email ROI tool use AI?',
        a: 'No. Projections are pure formulas from the rates and list size you provide—no generative forecasts.',
      },
      {
        q: 'Who should use an email marketing ROI calculator?',
        a: 'Email marketers, Shopify brands, SaaS lifecycle teams, and freelancers estimating campaign or newsletter revenue before send.',
      },
      {
        q: 'Why is ROI missing when I skip campaign cost?',
        a: 'Revenue still calculates. Enter campaign cost (tools, copy, design, list rentals) greater than zero to unlock ROI%.',
      },
      {
        q: 'Can I model a single broadcast vs a sequence?',
        a: 'Use one campaign’s metrics for a broadcast, or average rates and combined cost across a short sequence for a blended ROI view.',
      },
    ],
  },

  'affiliate-earnings': {
    title: 'Free Affiliate Earnings Calculator – Commission Estimator',
    description:
      'Estimate affiliate clicks, sales, and commissions with Zetawala’s free affiliate earnings calculator. Enter monthly visitors, affiliate CTR, conversion rate, and average commission for deterministic monthly and yearly earnings—no AI. Built for bloggers, YouTubers, and niche site owners. Totals update instantly when traffic or rates change.',
    example: {
      input: 'Visitors: 50,000 · CTR: 2% · Conv: 5% · Commission: $40',
      output: 'Clicks 1,000 · Sales 50 · Monthly $2,000 · Yearly $24,000',
    },
    faqs: [
      {
        q: 'How are affiliate earnings calculated?',
        a: 'Clicks = Visitors × CTR%. Sales = Clicks × Conversion%. Monthly earnings = Sales × Average commission. Yearly = Monthly × 12.',
      },
      {
        q: 'Does this guarantee what a network will pay?',
        a: 'No. It is a planning estimate from your assumed CTR, conversion, and commission. Actual payouts depend on network rules, refunds, and cookie windows.',
      },
      {
        q: 'Is the affiliate earnings calculator AI-based?',
        a: 'No. Zetawala uses deterministic math only so creators can model scenarios without opaque AI projections.',
      },
      {
        q: 'Who should use an affiliate commission calculator?',
        a: 'Bloggers, newsletter operators, YouTubers, and comparison-site owners planning content around affiliate offers.',
      },
      {
        q: 'What CTR and conversion rates are realistic?',
        a: 'They vary by niche and placement. Start with analytics or network reports; model conservative rates first, then stress-test upside instantly.',
      },
      {
        q: 'Can I compare two affiliate programs?',
        a: 'Yes. Keep traffic and CTR fixed, change commission (and conversion if needed), and compare monthly earnings side by side.',
      },
    ],
  },

  'adsense-revenue': {
    title: 'Free AdSense Revenue Calculator – RPM & CPC Modes',
    description:
      'Estimate AdSense earnings from pageviews with Zetawala’s free AdSense revenue calculator. Use RPM mode (pageviews ÷ 1,000 × RPM) or CPC mode (pageviews × CTR × CPC) for daily, monthly, and yearly projections—deterministic math only, no AI. Ideal for publishers and bloggers. Estimates update instantly.',
    example: {
      input: 'Pageviews: 100,000/mo · Mode: RPM · RPM: $8',
      output: 'Daily ~$26.67 · Monthly $800 · Yearly $9,600',
    },
    faqs: [
      {
        q: 'How does RPM mode work?',
        a: 'Monthly revenue = (Monthly pageviews ÷ 1,000) × RPM. Daily ≈ monthly ÷ 30; yearly = monthly × 12.',
      },
      {
        q: 'How does CPC mode work?',
        a: 'Clicks = Pageviews × CTR%. Revenue = Clicks × CPC. The same daily/monthly/yearly scaling applies.',
      },
      {
        q: 'Is this official Google AdSense data?',
        a: 'No. It is a free estimator using the RPM, CTR, or CPC you enter. Real AdSense varies by niche, geo, seasonality, and ad layout.',
      },
      {
        q: 'Does the AdSense calculator use AI?',
        a: 'No. Earnings are computed with transparent formulas so publishers can plan without model-generated guesses.',
      },
      {
        q: 'Who should use an AdSense revenue calculator?',
        a: 'Bloggers, news publishers, and niche site owners forecasting display revenue before growing traffic or redesigning ad placements.',
      },
      {
        q: 'Which mode should I choose—RPM or CPC?',
        a: 'Use RPM if you know earnings per thousand pageviews from AdSense reports. Use CPC if you track click-through rate and average click value instead.',
      },
    ],
  },

  'ecommerce-profit': {
    title: 'Free Ecommerce Profit Calculator – Net Margin & ROI',
    description:
      'Calculate ecommerce net profit after product cost, shipping, platform fees, and ads with Zetawala’s free ecommerce profit calculator. Deterministic math only—no AI—so Shopify, WooCommerce, and marketplace sellers see true unit economics instantly. Margin and ROI update as soon as costs change.',
    example: {
      input: 'Price $79 · Cost $28 · Shipping $6 · Platform fee $8 · Ads $12',
      output: 'Net profit $25 · Margin ~31.6% · ROI ~46.3% · Total costs $54',
    },
    faqs: [
      {
        q: 'How is ecommerce net profit calculated?',
        a: 'Net profit = Selling price − (Product cost + Shipping + Platform fee + Advertising). Margin% = Net ÷ Price × 100. ROI% = Net ÷ Total costs × 100.',
      },
      {
        q: 'Does this include marketplace and ad costs?',
        a: 'Yes. Enter platform fees and advertising alongside COGS and shipping so the net figure reflects real take-home per order.',
      },
      {
        q: 'Is the ecommerce profit calculator AI-powered?',
        a: 'No. All outputs are deterministic arithmetic from your inputs—fast, transparent, and free.',
      },
      {
        q: 'Who should use this tool?',
        a: 'DTC brands, dropshippers, and online retailers validating SKU pricing before scaling paid traffic.',
      },
      {
        q: 'How is this different from the simple profit margin calculator?',
        a: 'Profit Margin compares cost vs price only. Ecommerce Profit layers shipping, fees, and ads for fuller unit economics.',
      },
      {
        q: 'Can I model a loss-making SKU?',
        a: 'Yes. If costs exceed price, net profit and margin go negative—useful for spotting unprofitable products early.',
      },
    ],
  },

  'amazon-fba-profit': {
    title: 'Free Amazon FBA Profit Calculator – Fees, Margin & ROI',
    description:
      'Estimate Amazon FBA net profit, margin, and ROI after product cost, Amazon fees, and shipping with Zetawala’s free FBA profit calculator. Uses deterministic math only—no AI—so Amazon sellers can stress-test ASINs before ordering inventory. Results update instantly when fees or price change.',
    example: {
      input: 'Price $34.99 · Product cost $11 · Amazon fees $12.50 · Shipping $3.20',
      output: 'Net profit $8.29 · Margin ~23.7% · ROI on costs ~31.1%',
    },
    faqs: [
      {
        q: 'How is Amazon FBA profit calculated?',
        a: 'Net = Selling price − (Product cost + Amazon fees + Shipping). Margin% = Net ÷ Price × 100. ROI% = Net ÷ Total costs × 100.',
      },
      {
        q: 'What should I put under Amazon fees?',
        a: 'Sum referral fees, FBA fulfillment fees, storage, and other Amazon charges for that unit (from Seller Central fee previews or invoices).',
      },
      {
        q: 'Does this FBA calculator use AI?',
        a: 'No. Profit, margin, and ROI are pure formulas from the numbers you enter—no scraped Buy Box guesses.',
      },
      {
        q: 'Who should use an Amazon FBA profit calculator?',
        a: 'Private-label, wholesale, and arbitrage sellers checking whether a product clears fees with enough margin and ROI.',
      },
      {
        q: 'Is shipping inbound freight or customer shipping?',
        a: 'Enter the per-unit shipping/logistics cost you want in the model (often inbound or prep allocated per unit). Keep it consistent across SKUs you compare.',
      },
      {
        q: 'How does this differ from the ecommerce profit tool?',
        a: 'FBA focuses on Amazon fee + shipping stacks common to Fulfillment by Amazon. Use Ecommerce Profit for multi-channel stores with separate ad lines.',
      },
    ],
  },

  'etsy-fee-profit': {
    title: 'Free Etsy Fee & Profit Calculator',
    description:
      'Calculate total Etsy fees, net profit, and margin with Zetawala’s free Etsy fee & profit calculator. Enter selling price, product cost, shipping, and Etsy fees for deterministic results—no AI. Built for Etsy sellers and makers pricing handmade or print-on-demand listings. Totals refresh instantly.',
    example: {
      input: 'Price $45 · Cost $14 · Shipping $5 · Etsy fees $7.20',
      output: 'Total fees $7.20 · Net profit $18.80 · Margin ~41.8%',
    },
    faqs: [
      {
        q: 'How does the Etsy fee & profit formula work?',
        a: 'Net profit = Selling price − Product cost − Shipping − Etsy fees. Margin% = Net ÷ Price × 100. Total fees equals the Etsy fees you enter.',
      },
      {
        q: 'What fees should I include?',
        a: 'Combine listing fees, transaction fees, payment processing, and offsite ads attributed to that order into one Etsy fees figure for a realistic net.',
      },
      {
        q: 'Does this calculator use AI or live Etsy rates?',
        a: 'No. It does not fetch live fee schedules. You enter fees so math stays transparent and under your control.',
      },
      {
        q: 'Who should use an Etsy profit calculator?',
        a: 'Handmade, vintage, and POD sellers setting prices that still profit after Etsy’s fee stack and shipping.',
      },
      {
        q: 'Can I include free shipping promotions?',
        a: 'Yes—raise the shipping cost you absorb (or lower effective price) so net profit reflects the promotion.',
      },
      {
        q: 'How is this different from eBay fee calculator?',
        a: 'Etsy Fee & Profit uses a single fees field plus cost and shipping. eBay Fee Calculator splits marketplace and payment processing fees and shows payout separately.',
      },
    ],
  },

  'ebay-fee': {
    title: 'Free eBay Fee Calculator – Payout & Net Profit',
    description:
      'Estimate eBay fees, seller payout, and net profit with Zetawala’s free eBay fee calculator. Enter selling price, product cost, shipping, eBay fee, and payment processing fee—deterministic math only, no AI. Ideal for eBay sellers and resellers checking final take-home. Results update instantly.',
    example: {
      input: 'Price $120 · Cost $55 · Shipping $8 · eBay fee $15.60 · Payment fee $3.80',
      output: 'Total fees $19.40 · Final payout $100.60 · Net profit $37.60',
    },
    faqs: [
      {
        q: 'How are eBay fees, payout, and net profit calculated?',
        a: 'Total fees = eBay fee + Payment processing fee. Payout = Price − Total fees. Net profit = Payout − Product cost − Shipping.',
      },
      {
        q: 'Why separate eBay fee and payment fee?',
        a: 'Marketplace final value fees and payment processing often appear as distinct line items. Splitting them makes payout and net profit easier to audit.',
      },
      {
        q: 'Does this eBay fee calculator use AI?',
        a: 'No. Every figure is deterministic arithmetic from your inputs—no live API or AI fee prediction.',
      },
      {
        q: 'Who should use an eBay fee calculator?',
        a: 'Power sellers, thrift resellers, and store owners validating whether a listing price covers fees, cost, and shipping.',
      },
      {
        q: 'Does payout include shipping charged to the buyer?',
        a: 'Model shipping carefully: if the buyer pays shipping separately, keep selling price as item price and put your shipping cost in the shipping field so net stays accurate.',
      },
      {
        q: 'Can fee percentages change by category?',
        a: 'Yes. Enter the dollar fee amounts for that category and price point (from eBay’s fee preview) so the calculator matches your listing.',
      },
    ],
  },

  'freelance-project-pricing': {
    title: 'Free Freelance Project Pricing Calculator',
    description:
      'Price freelance projects with hours, revisions, contingency, and hourly rate using Zetawala’s free project pricing calculator. Deterministic math only—no AI—so freelancers and agencies can quote fixed fees that cover scope creep buffers. Suggested price and effective rate update instantly.',
    example: {
      input: '40 hours · $95/hr · 2 revisions × 2 hrs · Contingency 15%',
      output: 'Suggested price $4,802 · Total hours (w/ contingency) 50.6 · Effective rate on scoped hours shown',
    },
    faqs: [
      {
        q: 'How is the project price calculated?',
        a: 'Revision hours = Revisions × Hours per revision. Base hours = Estimated hours + Revision hours. Total hours = Base × (1 + Contingency%). Price = Total hours × Hourly rate.',
      },
      {
        q: 'Why include contingency?',
        a: 'Contingency covers unclear scope, feedback loops, and risk so a fixed quote remains profitable when work expands slightly.',
      },
      {
        q: 'Does this project pricing tool use AI?',
        a: 'No. Quotes are computed from your hours, rate, revisions, and contingency percentage—transparent and instant.',
      },
      {
        q: 'Who should use a freelance project pricing calculator?',
        a: 'Designers, developers, writers, consultants, and studios converting hourly rates into fixed project proposals.',
      },
      {
        q: 'How do I choose an hourly rate first?',
        a: 'Use Zetawala’s Freelance Hourly Rate Calculator to set a floor and recommended rate, then plug that rate into this project pricer.',
      },
      {
        q: 'What is effective hourly rate in the results?',
        a: 'It shows price divided by scoped hours (estimate + revisions), helping you see the rate clients effectively pay before contingency padding.',
      },
    ],
  },

  'salary-to-hourly': {
    title: 'Free Salary to Hourly Rate Calculator',
    description:
      'Convert annual or monthly salary to hourly, daily, weekly, and monthly equivalents with Zetawala’s free salary to hourly rate calculator. Enter working days, hours per day, and weeks per year for deterministic math—no AI. Useful for freelancers, employees comparing offers, and contractors. Results update instantly.',
    example: {
      input: 'Annual $78,000 · 5 days/week · 8 hours/day · 52 weeks',
      output: 'Hourly $37.50 · Daily $300 · Weekly $1,500 · Monthly $6,500',
    },
    faqs: [
      {
        q: 'How is salary converted to an hourly rate?',
        a: 'Annual salary (monthly × 12 if needed) ÷ (Weeks per year × Days per week × Hours per day) = Hourly rate. Daily, weekly, and monthly figures follow from that calendar.',
      },
      {
        q: 'Should freelancers use this as a billable rate?',
        a: 'Employee-equivalent hourly is a starting point only. Freelancers usually need a higher billable rate to cover taxes, benefits, and non-billable time—use the Freelance Hourly Rate Calculator next.',
      },
      {
        q: 'Does this salary calculator use AI?',
        a: 'No. Conversions are pure arithmetic from the salary and schedule you enter.',
      },
      {
        q: 'What weeks-per-year value should I use?',
        a: '52 assumes no unpaid time off. Some people use ~48–50 to reflect vacation; lowering weeks raises the implied hourly rate.',
      },
      {
        q: 'Who should use a salary to hourly calculator?',
        a: 'Job seekers comparing offers, HR teams explaining pay, and freelancers translating W-2 salaries into contractor rate discussions.',
      },
      {
        q: 'Can I start from a monthly salary?',
        a: 'Yes. Choose the monthly period; the tool annualizes (×12) before computing hourly, daily, and weekly equivalents.',
      },
    ],
  },
};
