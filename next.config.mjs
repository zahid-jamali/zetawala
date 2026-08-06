/** @type {import('next').NextConfig} */

const routeMapping = {
  'video-ideas': 'youtube-video-ideas-generator',
  'title-generator': 'youtube-title-generator',
  'hook-architect': 'youtube-hook-retention-generator',
  'description-builder': 'youtube-description-generator',
  'tags-extractor': 'youtube-tags-extractor',
  'thumbnail-prompt': 'youtube-thumbnail-prompt-generator',
  'script-master': 'youtube-script-generator',
  'visuals-recommender': 'youtube-script-visuals-recommender',

  'product-hunting': 'daraz-product-hunting',
  'roman-urdu-keywords': 'daraz-roman-urdu-keywords',
  'product-title': 'daraz-product-title-generator',
  'product-description': 'daraz-product-description-generator',
  'listing-optimizer': 'daraz-listing-optimizer',
  'competitor-rewriter': 'daraz-competitor-rewriter',
  'daraz-keywords': 'daraz-keyword-generator',
  'customer-reply': 'daraz-customer-reply-generator',
  'faq-generator': 'daraz-faq-generator',
  'benefits-generator': 'daraz-benefits-generator',
  'negative-reply': 'daraz-negative-reply-generator',
  'sales-copy': 'daraz-sales-copy-generator',
  'profit-calculator': 'daraz-profit-calculator',

  'freelance-hourly-rate': 'freelance-hourly-rate-calculator',
  'ai-api-cost': 'ai-api-cost-calculator',
  'saas-pricing': 'saas-pricing-calculator',
  'customer-ltv': 'customer-lifetime-value-calculator',
  'customer-cac': 'customer-acquisition-cost-calculator',
  'break-even': 'break-even-calculator',
  'profit-margin': 'profit-margin-calculator',
  'content-marketing-roi': 'content-marketing-roi-calculator',
  'google-ads-profit': 'google-ads-profit-calculator',
  'email-marketing-roi': 'email-marketing-roi-calculator',
  'affiliate-earnings': 'affiliate-earnings-calculator',
  'adsense-revenue': 'adsense-revenue-calculator',
  'ecommerce-profit': 'ecommerce-profit-calculator',
  'amazon-fba-profit': 'amazon-fba-profit-calculator',
  'etsy-fee-profit': 'etsy-fee-profit-calculator',
  'ebay-fee': 'ebay-fee-calculator',
  'freelance-project-pricing': 'freelance-project-pricing-calculator',
  'salary-to-hourly': 'salary-to-hourly-rate-calculator',

  'pdf-to-markdown': 'pdf-to-markdown-converter',
  'pdf-table-extractor': 'pdf-table-extractor',
  'pdf-link-extractor': 'pdf-link-extractor',
  'pdf-metadata-viewer': 'pdf-metadata-viewer',
  'pdf-image-extractor': 'pdf-image-extractor',
  'excel-formula-generator': 'excel-formula-generator',
  'excel-formula-explainer': 'excel-formula-explainer',
  'excel-to-json': 'excel-to-json-converter',
  'json-to-excel': 'json-to-excel-converter',
  'csv-to-excel': 'csv-to-excel-converter',
  'image-metadata-viewer': 'image-metadata-viewer',
  'exif-metadata-remover': 'exif-metadata-remover',
  'image-color-palette': 'image-color-palette-extractor',
  'social-image-resizer': 'social-media-image-resizer',
  'screenshot-to-text': 'screenshot-to-text-ocr',

  'ai-humanizer': 'ai-humanizer',
  'ai-content-detector': 'ai-content-detector',
  'plagiarism-checker': 'plagiarism-checker',
  'grammar-checker': 'grammar-checker',
  'paraphrasing-tool': 'paraphrasing-tool',
  'roman-urdu-to-urdu': 'roman-urdu-to-urdu-converter',
  'urdu-to-roman-urdu': 'urdu-to-roman-urdu-converter',
  'roman-urdu-grammar': 'roman-urdu-grammar-spell-checker',
  'ai-text-summarizer': 'ai-text-summarizer',
  'ai-rewrite-tool': 'ai-rewrite-tool',
};

const calculatorInternals = new Set([
  'freelance-hourly-rate',
  'ai-api-cost',
  'saas-pricing',
  'customer-ltv',
  'customer-cac',
  'break-even',
  'profit-margin',
  'content-marketing-roi',
  'google-ads-profit',
  'email-marketing-roi',
  'affiliate-earnings',
  'adsense-revenue',
  'ecommerce-profit',
  'amazon-fba-profit',
  'etsy-fee-profit',
  'ebay-fee',
  'freelance-project-pricing',
  'salary-to-hourly',
]);

const pdfUtilityInternals = new Set([
  'pdf-to-markdown',
  'pdf-table-extractor',
  'pdf-link-extractor',
  'pdf-metadata-viewer',
  'pdf-image-extractor',
  'excel-formula-generator',
  'excel-formula-explainer',
  'excel-to-json',
  'json-to-excel',
  'csv-to-excel',
  'image-metadata-viewer',
  'exif-metadata-remover',
  'image-color-palette',
  'social-image-resizer',
  'screenshot-to-text',
]);

const writingInternals = new Set([
  'ai-humanizer',
  'ai-content-detector',
  'plagiarism-checker',
  'grammar-checker',
  'paraphrasing-tool',
  'roman-urdu-to-urdu',
  'urdu-to-roman-urdu',
  'roman-urdu-grammar',
  'ai-text-summarizer',
  'ai-rewrite-tool',
]);

const nextConfig = {
  serverExternalPackages: ['sharp', 'tesseract.js'],
  async redirects() {
    const list = [
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/dashboard/youtube', destination: '/tools/youtube/youtube-video-ideas-generator', permanent: true },
      { source: '/dashboard/daraz', destination: '/tools/daraz/daraz-product-hunting', permanent: true },
      { source: '/dashboard/calculators', destination: '/tools/calculators/freelance-hourly-rate-calculator', permanent: true },
      { source: '/dashboard/pdf-utilities', destination: '/tools/pdf-utilities/pdf-to-markdown-converter', permanent: true },
      { source: '/dashboard/writing', destination: '/tools/writing/ai-humanizer', permanent: true },
    ];

    for (const [internal, seo] of Object.entries(routeMapping)) {
      const isYoutube = seo.startsWith('youtube-');
      const folder = writingInternals.has(internal)
        ? 'writing'
        : pdfUtilityInternals.has(internal)
          ? 'pdf-utilities'
          : calculatorInternals.has(internal)
            ? 'calculators'
            : isYoutube
              ? 'youtube'
              : 'daraz';

      list.push({
        source: `/dashboard/${folder}/${internal}`,
        destination: `/tools/${folder}/${seo}`,
        permanent: true
      });

      list.push({
        source: `/tools/${internal}`,
        destination: `/tools/${folder}/${seo}`,
        permanent: true
      });
    }

    return list;
  }
};

export default nextConfig;
