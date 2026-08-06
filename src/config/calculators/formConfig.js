/**
 * Form field defaults + next-step links for each calculator.
 */

export const calculatorFormConfig = {
  'freelance-hourly-rate': {
    title: 'Rate Inputs',
    defaults: {
      monthlyIncomeGoal: '5000',
      monthlyExpenses: '1500',
      taxPct: '25',
      billableHours: '100',
    },
    fields: [
      { key: 'monthlyIncomeGoal', label: 'Monthly Income Goal ($)', type: 'number' },
      { key: 'monthlyExpenses', label: 'Monthly Expenses ($)', type: 'number' },
      { key: 'taxPct', label: 'Tax (%)', type: 'number', step: '0.1' },
      { key: 'billableHours', label: 'Billable Hours per Month', type: 'number' },
    ],
    nextSteps: [
      { slug: 'freelance-project-pricing', label: 'Price a Project' },
      { slug: 'salary-to-hourly', label: 'Salary → Hourly' },
      { slug: 'profit-margin', label: 'Profit Margin' },
    ],
  },
  'ai-api-cost': {
    title: 'API Usage Inputs',
    defaults: {
      provider: 'openai',
      model: 'gpt-4o-mini',
      inputTokens: '1500',
      outputTokens: '500',
      requestsPerDay: '100',
      daysPerMonth: '30',
      customInputPer1M: '1',
      customOutputPer1M: '3',
    },
    fields: [], // custom UI for provider/model
    nextSteps: [
      { slug: 'saas-pricing', label: 'SaaS Pricing' },
      { slug: 'break-even', label: 'Break-even' },
      { slug: 'content-marketing-roi', label: 'Content ROI' },
    ],
  },
  'saas-pricing': {
    title: 'SaaS Pricing Inputs',
    defaults: {
      monthlyOperatingExpenses: '5000',
      desiredMonthlyProfit: '3000',
      expectedCustomers: '200',
    },
    fields: [
      { key: 'monthlyOperatingExpenses', label: 'Monthly Operating Expenses ($)', type: 'number' },
      { key: 'desiredMonthlyProfit', label: 'Desired Monthly Profit ($)', type: 'number' },
      { key: 'expectedCustomers', label: 'Expected Customers', type: 'number' },
    ],
    nextSteps: [
      { slug: 'customer-ltv', label: 'Customer LTV' },
      { slug: 'customer-cac', label: 'Customer CAC' },
      { slug: 'break-even', label: 'Break-even' },
    ],
  },
  'customer-ltv': {
    title: 'LTV Inputs',
    defaults: {
      averageOrderValue: '80',
      purchaseFrequency: '4',
      customerLifespan: '3',
    },
    fields: [
      { key: 'averageOrderValue', label: 'Average Order Value ($)', type: 'number' },
      { key: 'purchaseFrequency', label: 'Purchase Frequency per Year', type: 'number', step: '0.1' },
      { key: 'customerLifespan', label: 'Customer Lifespan (Years)', type: 'number', step: '0.1' },
    ],
    nextSteps: [
      { slug: 'customer-cac', label: 'Compare with CAC' },
      { slug: 'saas-pricing', label: 'SaaS Pricing' },
      { slug: 'profit-margin', label: 'Profit Margin' },
    ],
  },
  'customer-cac': {
    title: 'CAC Inputs',
    defaults: {
      marketingExpenses: '10000',
      salesExpenses: '5000',
      customersAcquired: '150',
    },
    fields: [
      { key: 'marketingExpenses', label: 'Marketing Expenses ($)', type: 'number' },
      { key: 'salesExpenses', label: 'Sales Expenses ($)', type: 'number' },
      { key: 'customersAcquired', label: 'Customers Acquired', type: 'number' },
    ],
    nextSteps: [
      { slug: 'customer-ltv', label: 'Compare with LTV' },
      { slug: 'google-ads-profit', label: 'Google Ads Profit' },
      { slug: 'content-marketing-roi', label: 'Content ROI' },
    ],
  },
  'break-even': {
    title: 'Break-even Inputs',
    defaults: {
      fixedCosts: '10000',
      sellingPrice: '50',
      variableCost: '20',
    },
    fields: [
      { key: 'fixedCosts', label: 'Fixed Costs ($)', type: 'number' },
      { key: 'sellingPrice', label: 'Selling Price per Unit ($)', type: 'number' },
      { key: 'variableCost', label: 'Variable Cost per Unit ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'profit-margin', label: 'Profit Margin' },
      { slug: 'saas-pricing', label: 'SaaS Pricing' },
      { slug: 'ecommerce-profit', label: 'Ecommerce Profit' },
    ],
  },
  'profit-margin': {
    title: 'Margin Inputs',
    defaults: {
      productCost: '40',
      sellingPrice: '100',
    },
    fields: [
      { key: 'productCost', label: 'Product Cost ($)', type: 'number' },
      { key: 'sellingPrice', label: 'Selling Price ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'ecommerce-profit', label: 'Ecommerce Profit' },
      { slug: 'break-even', label: 'Break-even' },
      { slug: 'amazon-fba-profit', label: 'Amazon FBA Profit' },
    ],
  },
  'content-marketing-roi': {
    title: 'Content ROI Inputs',
    defaults: {
      articlesPerMonth: '8',
      avgVisitorsPerArticle: '500',
      conversionRatePct: '1.5',
      avgRevenuePerCustomer: '60',
      monthlyContentCost: '800',
    },
    fields: [
      { key: 'articlesPerMonth', label: 'Articles Published per Month', type: 'number' },
      { key: 'avgVisitorsPerArticle', label: 'Average Visitors per Article', type: 'number' },
      { key: 'conversionRatePct', label: 'Conversion Rate (%)', type: 'number', step: '0.1' },
      { key: 'avgRevenuePerCustomer', label: 'Average Revenue per Customer ($)', type: 'number' },
      { key: 'monthlyContentCost', label: 'Monthly Content Cost ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'email-marketing-roi', label: 'Email Marketing ROI' },
      { slug: 'google-ads-profit', label: 'Google Ads Profit' },
      { slug: 'affiliate-earnings', label: 'Affiliate Earnings' },
    ],
  },
  'google-ads-profit': {
    title: 'Google Ads Inputs',
    defaults: {
      monthlyBudget: '2000',
      averageCpc: '1.5',
      conversionRatePct: '3',
      averageOrderValue: '75',
    },
    fields: [
      { key: 'monthlyBudget', label: 'Monthly Budget ($)', type: 'number' },
      { key: 'averageCpc', label: 'Average CPC ($)', type: 'number', step: '0.01' },
      { key: 'conversionRatePct', label: 'Conversion Rate (%)', type: 'number', step: '0.1' },
      { key: 'averageOrderValue', label: 'Average Order Value ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'customer-cac', label: 'CAC Calculator' },
      { slug: 'email-marketing-roi', label: 'Email ROI' },
      { slug: 'content-marketing-roi', label: 'Content ROI' },
    ],
  },
  'email-marketing-roi': {
    title: 'Email ROI Inputs',
    defaults: {
      emailListSize: '10000',
      openRatePct: '25',
      clickRatePct: '3',
      conversionRatePct: '2',
      averageOrderValue: '50',
      campaignCost: '200',
    },
    fields: [
      { key: 'emailListSize', label: 'Email List Size', type: 'number' },
      { key: 'openRatePct', label: 'Open Rate (%)', type: 'number', step: '0.1' },
      { key: 'clickRatePct', label: 'Click Rate (%)', type: 'number', step: '0.1' },
      { key: 'conversionRatePct', label: 'Conversion Rate (%)', type: 'number', step: '0.1' },
      { key: 'averageOrderValue', label: 'Average Order Value ($)', type: 'number' },
      { key: 'campaignCost', label: 'Campaign Cost ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'content-marketing-roi', label: 'Content ROI' },
      { slug: 'affiliate-earnings', label: 'Affiliate Earnings' },
      { slug: 'customer-ltv', label: 'Customer LTV' },
    ],
  },
  'affiliate-earnings': {
    title: 'Affiliate Inputs',
    defaults: {
      monthlyVisitors: '50000',
      affiliateCtrPct: '2',
      conversionRatePct: '5',
      averageCommission: '30',
    },
    fields: [
      { key: 'monthlyVisitors', label: 'Monthly Visitors', type: 'number' },
      { key: 'affiliateCtrPct', label: 'Affiliate CTR (%)', type: 'number', step: '0.1' },
      { key: 'conversionRatePct', label: 'Conversion Rate (%)', type: 'number', step: '0.1' },
      { key: 'averageCommission', label: 'Average Commission ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'adsense-revenue', label: 'AdSense Revenue' },
      { slug: 'content-marketing-roi', label: 'Content ROI' },
      { slug: 'email-marketing-roi', label: 'Email ROI' },
    ],
  },
  'adsense-revenue': {
    title: 'AdSense Inputs',
    defaults: {
      monthlyPageviews: '100000',
      mode: 'rpm',
      rpm: '5',
      ctrPct: '1.5',
      cpc: '0.4',
    },
    fields: [], // custom mode UI
    nextSteps: [
      { slug: 'affiliate-earnings', label: 'Affiliate Earnings' },
      { slug: 'content-marketing-roi', label: 'Content ROI' },
      { slug: 'google-ads-profit', label: 'Google Ads Profit' },
    ],
  },
  'ecommerce-profit': {
    title: 'Ecommerce Inputs',
    defaults: {
      productCost: '25',
      sellingPrice: '59',
      shippingCost: '5',
      platformFee: '6',
      advertisingCost: '8',
    },
    fields: [
      { key: 'productCost', label: 'Product Cost ($)', type: 'number' },
      { key: 'sellingPrice', label: 'Selling Price ($)', type: 'number' },
      { key: 'shippingCost', label: 'Shipping Cost ($)', type: 'number' },
      { key: 'platformFee', label: 'Platform Fee ($)', type: 'number' },
      { key: 'advertisingCost', label: 'Advertising Cost ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'amazon-fba-profit', label: 'Amazon FBA Profit' },
      { slug: 'etsy-fee-profit', label: 'Etsy Fees' },
      { slug: 'ebay-fee', label: 'eBay Fees' },
    ],
  },
  'amazon-fba-profit': {
    title: 'Amazon FBA Inputs',
    defaults: {
      productCost: '12',
      sellingPrice: '34.99',
      amazonFees: '10',
      shippingCost: '3.5',
    },
    fields: [
      { key: 'productCost', label: 'Product Cost ($)', type: 'number' },
      { key: 'sellingPrice', label: 'Selling Price ($)', type: 'number' },
      { key: 'amazonFees', label: 'Amazon Fees ($)', type: 'number' },
      { key: 'shippingCost', label: 'Shipping / Inbound Cost ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'ecommerce-profit', label: 'Ecommerce Profit' },
      { slug: 'profit-margin', label: 'Profit Margin' },
      { slug: 'break-even', label: 'Break-even' },
    ],
  },
  'etsy-fee-profit': {
    title: 'Etsy Inputs',
    defaults: {
      sellingPrice: '45',
      productCost: '15',
      shippingCost: '4',
      etsyFees: '5.5',
    },
    fields: [
      { key: 'sellingPrice', label: 'Selling Price ($)', type: 'number' },
      { key: 'productCost', label: 'Product Cost ($)', type: 'number' },
      { key: 'shippingCost', label: 'Shipping Cost ($)', type: 'number' },
      { key: 'etsyFees', label: 'Etsy Fees ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'ebay-fee', label: 'eBay Fee Calculator' },
      { slug: 'ecommerce-profit', label: 'Ecommerce Profit' },
      { slug: 'profit-margin', label: 'Profit Margin' },
    ],
  },
  'ebay-fee': {
    title: 'eBay Inputs',
    defaults: {
      sellingPrice: '80',
      productCost: '30',
      shippingCost: '8',
      ebayFee: '10.4',
      paymentProcessingFee: '2.5',
    },
    fields: [
      { key: 'sellingPrice', label: 'Selling Price ($)', type: 'number' },
      { key: 'productCost', label: 'Product Cost ($)', type: 'number' },
      { key: 'shippingCost', label: 'Shipping Cost ($)', type: 'number' },
      { key: 'ebayFee', label: 'eBay Fee ($)', type: 'number' },
      { key: 'paymentProcessingFee', label: 'Payment Processing Fee ($)', type: 'number' },
    ],
    nextSteps: [
      { slug: 'etsy-fee-profit', label: 'Etsy Fees' },
      { slug: 'amazon-fba-profit', label: 'Amazon FBA' },
      { slug: 'ecommerce-profit', label: 'Ecommerce Profit' },
    ],
  },
  'freelance-project-pricing': {
    title: 'Project Pricing Inputs',
    defaults: {
      estimatedHours: '40',
      hourlyRate: '75',
      numberOfRevisions: '2',
      hoursPerRevision: '2',
      contingencyPct: '15',
    },
    fields: [
      { key: 'estimatedHours', label: 'Estimated Project Hours', type: 'number' },
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'number' },
      { key: 'numberOfRevisions', label: 'Number of Revisions', type: 'number' },
      { key: 'hoursPerRevision', label: 'Hours per Revision', type: 'number', step: '0.5' },
      { key: 'contingencyPct', label: 'Contingency (%)', type: 'number', step: '0.1' },
    ],
    nextSteps: [
      { slug: 'freelance-hourly-rate', label: 'Hourly Rate Calculator' },
      { slug: 'salary-to-hourly', label: 'Salary → Hourly' },
      { slug: 'profit-margin', label: 'Profit Margin' },
    ],
  },
  'salary-to-hourly': {
    title: 'Salary Inputs',
    defaults: {
      salaryPeriod: 'annual',
      salary: '72000',
      workingDaysPerWeek: '5',
      workingHoursPerDay: '8',
      weeksPerYear: '52',
    },
    fields: [], // custom salary period UI
    nextSteps: [
      { slug: 'freelance-hourly-rate', label: 'Freelance Hourly Rate' },
      { slug: 'freelance-project-pricing', label: 'Project Pricing' },
      { slug: 'break-even', label: 'Break-even' },
    ],
  },
};
