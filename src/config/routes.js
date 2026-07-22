import { seoTools } from './seoWebmaster/tools';

const seoRouteEntries = Object.fromEntries(seoTools.map((t) => [t.slug, t.seoSlug]));

const routeMapping = {
  // YouTube Intelligence & Monetization
  'niche-finder': 'youtube-niche-finder',
  'niche-opportunity': 'youtube-niche-opportunity-analyzer',
  'channel-health': 'youtube-channel-health-analyzer',
  'video-performance': 'youtube-video-performance-analyzer',
  'revenue-calculator': 'youtube-revenue-calculator',

  // YouTube Automation tools
  'video-ideas': 'youtube-video-ideas-generator',
  'title-generator': 'youtube-title-generator',
  'hook-architect': 'youtube-hook-retention-generator',
  'description-builder': 'youtube-description-generator',
  'tags-extractor': 'youtube-tags-extractor',
  'thumbnail-prompt': 'youtube-thumbnail-prompt-generator',
  'script-master': 'youtube-script-generator',
  'visuals-recommender': 'youtube-script-visuals-recommender',
  
  // Daraz SEO tools
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

  // Local Social Commerce & WhatsApp Suite
  'whatsapp-broadcast': 'whatsapp-broadcast-status-copywriter',
  'local-ad-script': 'facebook-instagram-local-ad-script-generator',
  'wholesale-negotiation': 'wholesale-supplier-negotiation-drafter',
  'social-comment-responder': 'social-media-price-comment-responder',
  'product-storyboard': 'one-page-product-storyboard',

  // SEO & Webmaster Intelligence
  ...seoRouteEntries,
};

const categoryFolderMap = {
  'youtube-automation': 'youtube',
  'youtube': 'youtube',
  'daraz-seo': 'daraz',
  'daraz': 'daraz',
  'local-social-commerce': 'local-commerce',
  'local-commerce': 'local-commerce',
  'seo-webmaster': 'seo',
  'seo': 'seo',
};

const getFolderFromCategory = (category) => categoryFolderMap[category] || 'daraz';

const seoInternalSlugs = new Set(seoTools.map((t) => t.slug));
const seoPublicSlugs = new Set(seoTools.map((t) => t.seoSlug));

const getFolderFromSeoSlug = (seo) => {
  if (seo.startsWith('youtube-')) return 'youtube';
  if (
    seo.startsWith('whatsapp-') ||
    seo.startsWith('facebook-instagram-') ||
    seo.startsWith('wholesale-') ||
    seo.startsWith('social-media-') ||
    seo.startsWith('one-page-')
  ) {
    return 'local-commerce';
  }
  if (
    seoPublicSlugs.has(seo) ||
    seo.startsWith('seo-') ||
    seo.startsWith('pagespeed-') ||
    seo.startsWith('broken-link-') ||
    seo.startsWith('sitemap-') ||
    seo.startsWith('canonical-') ||
    seo.startsWith('robots-txt-') ||
    seo.startsWith('internal-link-') ||
    seo.startsWith('keyword-density-') ||
    seo.startsWith('keyword-roi-') ||
    seo.startsWith('content-roi-')
  ) {
    return 'seo';
  }
  return 'daraz';
};

// Convert internal slug to SEO-friendly path
export const getSeoPath = (category, toolSlug) => {
  const seoSlug = routeMapping[toolSlug] || toolSlug;
  const folder = getFolderFromCategory(category);
  return `/tools/${folder}/${seoSlug}`;
};

// Convert public SEO slug back to internal key
export const getInternalSlug = (seoSlug) => {
  for (const [key, value] of Object.entries(routeMapping)) {
    if (value === seoSlug) return key;
  }
  return seoSlug;
};

export const getLegacyRedirects = () => {
  const redirects = [];
  
  for (const [internal, seo] of Object.entries(routeMapping)) {
    const folder = getFolderFromSeoSlug(seo);
    
    redirects.push({
      source: `/dashboard/${folder}/${internal}`,
      destination: `/tools/${folder}/${seo}`,
      permanent: true
    });

    redirects.push({
      source: `/tools/${internal}`,
      destination: `/tools/${folder}/${seo}`,
      permanent: true
    });
  }

  redirects.push({
    source: '/dashboard/youtube',
    destination: '/tools/youtube/youtube-niche-finder',
    permanent: true
  });
  redirects.push({
    source: '/dashboard/daraz',
    destination: '/tools/daraz/daraz-product-hunting',
    permanent: true
  });
  redirects.push({
    source: '/dashboard/local-commerce',
    destination: '/tools/local-commerce/whatsapp-broadcast-status-copywriter',
    permanent: true
  });
  redirects.push({
    source: '/dashboard/seo',
    destination: '/tools/seo/seo-website-checker',
    permanent: true
  });

  return redirects;
};

export { seoInternalSlugs };
