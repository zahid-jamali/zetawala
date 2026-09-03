/**
 * Public tool inventory derived from navigation + SEO paths.
 * Catalog, sitemap, and catch-all routing all read from here.
 */

import { navigationConfig } from '../config/navigation.js';
import { getSeoPath } from '../config/routes.js';

export const CATEGORY_TO_ROUTE = {
  'youtube-automation': 'youtube',
  'daraz-seo': 'daraz',
  'local-social-commerce': 'local-commerce',
  'seo-webmaster': 'seo',
  calculators: 'calculators',
  'pdf-image-utilities': 'pdf-utilities',
  'ai-writing': 'writing',
  'ai-study': 'study',
  'freelancer-toolkit': 'freelancer',
  'shopee-seller': 'shopee',
  'lazada-seller': 'lazada',
};

export const ROUTE_TO_NAV = {
  youtube: 'youtube',
  daraz: 'daraz',
  'local-commerce': 'whatsapp',
  seo: 'seo',
  calculators: 'calculators',
  'pdf-utilities': 'pdf',
  writing: 'writing',
  study: 'study',
  freelancer: 'freelancer',
  shopee: 'shopee',
  lazada: 'lazada',
};

export function listPublicTools() {
  const tools = [];
  for (const cat of navigationConfig) {
    if (!cat.isActive) continue;
    const routeKey = CATEGORY_TO_ROUTE[cat.slug];
    if (!routeKey) continue;
    for (const tool of cat.tools) {
      if (!tool.isActive) continue;
      const path = getSeoPath(routeKey, tool.slug);
      const parts = path.split('/').filter(Boolean);
      tools.push({
        internalSlug: tool.slug,
        routeKey,
        folder: parts[1],
        seoSlug: parts[2],
        categorySlug: cat.slug,
        navId: ROUTE_TO_NAV[routeKey] || routeKey,
        name: tool.name,
        desc: tool.desc,
      });
    }
  }
  return tools;
}

export function getPublicTool(internalSlug) {
  return listPublicTools().find((tool) => tool.internalSlug === internalSlug) || null;
}
