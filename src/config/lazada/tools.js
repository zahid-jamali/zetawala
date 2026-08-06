import { createMarketplaceTools } from '../marketplace/sharedTools';

export const LAZADA_CATEGORY_SLUG = 'lazada-seller';
export const LAZADA_FOLDER = 'lazada';

export const lazadaTools = createMarketplaceTools('lazada', 'Lazada');
export const LAZADA_TOOL_SLUGS = lazadaTools.map((t) => t.slug);

export function getLazadaTool(slug) {
  return lazadaTools.find((t) => t.slug === slug) || null;
}
