import { createMarketplaceTools } from '../marketplace/sharedTools';

export const SHOPEE_CATEGORY_SLUG = 'shopee-seller';
export const SHOPEE_FOLDER = 'shopee';

export const shopeeTools = createMarketplaceTools('shopee', 'Shopee');
export const SHOPEE_TOOL_SLUGS = shopeeTools.map((t) => t.slug);

export function getShopeeTool(slug) {
  return shopeeTools.find((t) => t.slug === slug) || null;
}
