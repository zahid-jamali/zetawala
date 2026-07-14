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
  'profit-calculator': 'daraz-profit-calculator'
};

const nextConfig = {
  async redirects() {
    const list = [
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/dashboard/youtube', destination: '/tools/youtube/youtube-video-ideas-generator', permanent: true },
      { source: '/dashboard/daraz', destination: '/tools/daraz/daraz-product-hunting', permanent: true }
    ];

    for (const [internal, seo] of Object.entries(routeMapping)) {
      const isYoutube = seo.startsWith('youtube-');
      const folder = isYoutube ? 'youtube' : 'daraz';

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
