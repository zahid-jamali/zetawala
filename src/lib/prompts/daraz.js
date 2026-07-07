// Daraz E-Commerce Prompts Generator
export function getDarazPrompt(action, payload) {
  switch (action) {
    case "product-hunting": {
      const { seed } = payload;
      return `Act as a top 1% Product Research Expert in the Pakistani e-commerce ecosystem. Given the seed product query '${seed}', simulate a live product market audit on Daraz.pk. Return ONLY a valid JSON object matching this structure:
{
  "marketDemandScore": { "score": 85, "reasoning": "Localized purchase velocity & search signals in Pakistan." },
  "competitionLevel": { "level": "Medium", "reasoning": "Active seller counts, listing quality & review levels." },
  "estimatedProfitMargin": "Financial matrix calculating landed costs, Daraz commissions, VAT, and packaging fees.",
  "winningCriteria": "Strategic operational blueprint highlighting product differentiation & fast-shipping dominances.",
  "sourcingTips": "Hyper-local sourcing instructions (markets in Lahore/Karachi/Faisalabad) & Alibaba tips.",
  "customerPainPoints": ["Flaws from competitor 1-star reviews", "Delivery expectation mismatch", "Material quality issues"]
}`;
    }

    case "roman-urdu-keywords": {
      const { product } = payload;
      return `Act as a specialized E-Commerce SEO Specialist. Given '${product}', generate exactly 20 highly search-indexed keywords for Daraz.pk search algorithm.
Reflect local bilingual search behavior:
- 7 Roman Urdu Keywords (e.g., "baal sidha karne wala").
- 7 Hybrid Blends (e.g., "hair trimmer for men low price").
- 6 High-Intent English Keywords (e.g., "premium wireless earbuds").
Return ONLY a valid JSON array of strings: ["keyword 1", "keyword 2", ...]`;
    }

    case "product-title": {
      const { product, features } = payload;
      return `Act as an expert Daraz Listing copywriter. Given product '${product}' and features '${features}', generate 5 high-CTR, SEO-optimized listing titles under 60 characters. Return ONLY a JSON object:
{
  "results": [
    { "title": "Option 1 (Curiosity Focus)", "content": "Title text here" },
    { "title": "Option 2 (High-Intent SEO)", "content": "Title text here" },
    { "title": "Option 3 (Brand & Feature)", "content": "Title text here" },
    { "title": "Option 4 (Promotion/Value)", "content": "Title text here" },
    { "title": "Option 5 (Urdu Hybrid Focus)", "content": "Title text here" }
  ]
}`;
    }

    case "product-description": {
      const { product, features } = payload;
      return `Given product '${product}' and features '${features}', write a professional Daraz product description. Include a catchy summary hook, bulleted highlights (Key Benefits), and technical specifications. Return ONLY a JSON object:
{
  "content": "Full formatted description text with HTML spacing tags like <p> and <li>."
}`;
    }

    case "listing-optimizer": {
      const { title, description } = payload;
      return `Analyze the current Daraz title '${title}' and description '${description}'. Rewrite them to optimize search rankings using high-volume semantic keywords and localized terms. Return ONLY a JSON object:
{
  "results": [
    { "title": "Optimized Title (under 65 chars)", "content": "Text here" },
    { "title": "Optimized Highlights & Description", "content": "Text here" }
  ]
}`;
    }

    case "competitor-rewriter": {
      const { textToAnalyze } = payload;
      return `Given the competitor listing text '${textToAnalyze}', rewrite it to be 100% unique, persuasive, and optimized for Daraz search ranking. Retain specifications but change marketing angles. Return ONLY a JSON object:
{
  "content": "Full rewritten listing content."
}`;
    }

    case "daraz-keywords": {
      const { product } = payload;
      return `Given product '${product}', generate 15 high-volume search keywords and tags for Daraz.pk Backend Keywords field. Include Roman Urdu, search abbreviations, and common misspells. Return ONLY a JSON object:
{
  "results": [
    { "title": "Primary SEO Keywords", "content": "keyword1, keyword2, keyword3..." },
    { "title": "Hybrid Urdu Search Terms", "content": "term1, term2, term3..." }
  ]
}`;
    }

    case "customer-reply": {
      const { textToAnalyze } = payload;
      return `Given customer inquiry '${textToAnalyze}', draft a polite, professional, and helpful reply in bilingual Roman Urdu/English style to convert them. Address queries clearly. Return ONLY a JSON object:
{
  "content": "Reply message text here."
}`;
    }

    case "faq-generator": {
      const { product } = payload;
      return `Given product '${product}', generate 5 FAQs and responses matching common Daraz buyer questions (e.g. warranty, delivery, compatibility). Return ONLY a JSON object:
{
  "results": [
    { "title": "Q1: [Question text]", "content": "Answer text" },
    { "title": "Q2: [Question text]", "content": "Answer text" },
    { "title": "Q3: [Question text]", "content": "Answer text" },
    { "title": "Q4: [Question text]", "content": "Answer text" },
    { "title": "Q5: [Question text]", "content": "Answer text" }
  ]
}`;
    }

    case "cost-calculator": {
      const { sourceCost, sellingPrice, commissionRate, weight } = payload;
      const commissionAmount = (sellingPrice * commissionRate) / 100;
      const paymentFee = sellingPrice * 0.025; // 2.5% Payment gateway fee
      const vatAmount = (commissionAmount + paymentFee) * 0.16; // 16% PRA Punjab Services tax
      const pickPackFee = 30; // FBD standard handling fee
      const packagingCost = 35; // Box/Flyer packaging
      const estimatedShipping = 145 + Math.max(0, Math.ceil(weight * 2 - 1) * 60); // 145 base for 0.5kg, +60 per additional 0.5kg
      const whtAmount = sellingPrice * 0.02; // 2% Withholding income tax for filers
      const landedCost = Number(sourceCost) + commissionAmount + paymentFee + vatAmount + pickPackFee + packagingCost + estimatedShipping + whtAmount;
      const netProfit = sellingPrice - landedCost;
      const margin = (netProfit / sellingPrice) * 100;

      return `Perform an FBD/Daraz cost audit for a product with Source Cost PKR ${sourceCost}, Selling Price PKR ${sellingPrice}, Commission ${commissionRate}%, and Weight ${weight}kg in Pakistan (2026).
Calculate packaging (PKR ${packagingCost}), dynamic shipping (PKR ${estimatedShipping}), commission (PKR ${commissionAmount.toFixed(0)}), payment gateway fee (PKR ${paymentFee.toFixed(0)}), 16% service VAT (PKR ${vatAmount.toFixed(0)}), FBD pick/pack (PKR ${pickPackFee}), filer WHT (PKR ${whtAmount.toFixed(0)}), net profit (PKR ${netProfit.toFixed(0)}), and margin (${margin.toFixed(0)}%).
Return ONLY a JSON object:
{
  "results": [
    { "title": "FBD Cost Calculation Breakdown", "content": "Provide bullet points list of all expenses (Sourcing, Daraz Commission, Payment gateway fee, 16% VAT on services, FBD pick & pack fee, Packaging flyer, Est. shipping fee, and 2% filer withholding tax)." },
    { "title": "Landed Cost & Net Margin Summary", "content": "Sourcing Cost: PKR ${sourceCost}\\nDaraz Fee + Tax: PKR ${(commissionAmount+paymentFee+vatAmount).toFixed(0)}\\nFBD handling: PKR ${(pickPackFee+packagingCost).toFixed(0)}\\nEst. Shipping: PKR ${estimatedShipping}\\n2% Filer WHT: PKR ${whtAmount.toFixed(0)}\\nLanded Cost: PKR ${landedCost.toFixed(0)}\\n\\nNet Profit: PKR ${netProfit.toFixed(0)}\\nMargin: ${margin.toFixed(0)}%" }
  ]
}`;
    }

    case "benefits-generator": {
      const { product, features } = payload;
      return `Given product '${product}' and features '${features}', craft 5 powerful, customer-centric benefit bullets (value propositions) that highlight 'what is in it for the buyer'. Return ONLY a JSON object:
{
  "content": "1. [Benefit Title]: [Persuasive description]\\n2. [Benefit Title]: [Persuasive description]\\n..."
}`;
    }

    case "negative-reply": {
      const { textToAnalyze } = payload;
      return `Given negative customer review '${textToAnalyze}', draft a professional, polite, and strategic response that de-escalates the complaint, offers resolution steps (e.g. return/replacement), and protects brand trust. Return ONLY a JSON object:
{
  "content": "Polite response message here."
}`;
    }

    case "sales-copy": {
      const { product, features } = payload;
      return `Given product '${product}' and features '${features}', write a persuasive sales copy using AIDA framework (Attention, Interest, Desire, Action) to drive purchases. Return ONLY a JSON object:
{
  "results": [
    { "title": "Persuasive AIDA Sales Copy", "content": "Attention: ...\\n\\nInterest: ...\\n\\nDesire: ...\\n\\nAction: ..." }
  ]
}`;
    }

    case "profit-calculator": {
      const { sourceCost, sellingPrice, commissionRate } = payload;
      const commissionAmount = (sellingPrice * commissionRate) / 100;
      const paymentFee = sellingPrice * 0.025; // 2.5% Payment fee
      const vatAmount = (commissionAmount + paymentFee) * 0.16; // 16% service tax
      const pickPackFee = 30;
      const packagingCost = 35;
      const whtAmount = sellingPrice * 0.02; // 2% filer WHT
      const expenses = commissionAmount + paymentFee + vatAmount + pickPackFee + packagingCost + whtAmount;
      const netProfit = sellingPrice - sourceCost - expenses;
      const margin = (netProfit / sellingPrice) * 100;

      return `Given Purchase Cost PKR ${sourceCost}, Target Selling Price PKR ${sellingPrice}, and Category Commission ${commissionRate}%, perform a profit margin projection in Pakistan (2026).
Calculate Daraz Commission (PKR ${commissionAmount.toFixed(0)}), payment gateway fee (PKR ${paymentFee.toFixed(0)}), 16% service VAT (PKR ${vatAmount.toFixed(0)}), FBD pick/pack (PKR ${pickPackFee}), packaging flyer (PKR ${packagingCost}), 2% filer WHT (PKR ${whtAmount.toFixed(0)}), total selling expenses (PKR ${expenses.toFixed(0)}), net profit (PKR ${netProfit.toFixed(0)}), and margin (${margin.toFixed(0)}%).
Return ONLY a JSON object:
{
  "results": [
    { "title": "Landed Profit Projection Details", "content": "Provide bullet points showing Selling Price, Sourcing Cost, Daraz Commission + Payment Fee + 16% Service VAT, FBD Pick/Pack + packaging, 2% filer WHT, and Net Earnings." },
    { "title": "Net Profit Margin Projection", "content": "Selling Price: PKR ${sellingPrice}\\nSource Cost: PKR ${sourceCost}\\nDaraz Fee + Tax: PKR ${(commissionAmount+paymentFee+vatAmount).toFixed(0)}\\nHandling + Packaging: PKR ${(pickPackFee+packagingCost).toFixed(0)}\\n2% Filer WHT: PKR ${whtAmount.toFixed(0)}\\n\\nNet Profit: PKR ${netProfit.toFixed(0)}\\nMargin: ${margin.toFixed(0)}%" }
  ]
}`;
    }

    default:
      return null;
  }
}
