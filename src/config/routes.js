const routeMapping = {
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
  'profit-calculator': 'daraz-profit-calculator'
};

// Convert internal slug to SEO-friendly path
export const getSeoPath = (category, toolSlug) => {
  const seoSlug = routeMapping[toolSlug] || toolSlug;
  const isYoutube = category === 'youtube-automation' || category === 'youtube';
  return `/tools/${isYoutube ? 'youtube' : 'daraz'}/${seoSlug}`;
};

// Convert public SEO slug back to internal key
export const getInternalSlug = (seoSlug) => {
  for (const [key, value] of Object.entries(routeMapping)) {
    if (value === seoSlug) return key;
  }
  return seoSlug; // fallback
};

// Returns list of all redirects for next.config.js
export const getLegacyRedirects = () => {
  const redirects = [];
  
  for (const [internal, seo] of Object.entries(routeMapping)) {
    const isYoutube = seo.startsWith('youtube-');
    const folder = isYoutube ? 'youtube' : 'daraz';
    
    // Redirect /dashboard/youtube/[internal] -> /tools/youtube/[seo]
    redirects.push({
      source: `/dashboard/${folder}/${internal}`,
      destination: `/tools/${folder}/${seo}`,
      permanent: true
    });

    // Also redirect /tools/[internal] -> /tools/youtube/[seo] for SEO compatibility
    redirects.push({
      source: `/tools/${internal}`,
      destination: `/tools/${folder}/${seo}`,
      permanent: true
    });
  }

  // General dashboard redirects
  redirects.push({
    source: '/dashboard/youtube',
    destination: '/tools/youtube/youtube-video-ideas-generator',
    permanent: true
  });
  redirects.push({
    source: '/dashboard/daraz',
    destination: '/tools/daraz/daraz-product-hunting',
    permanent: true
  });

  return redirects;
};
