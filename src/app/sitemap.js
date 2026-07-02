import { navigationConfig } from '../config/navigation';

export default async function sitemap() {
  const baseUrl = 'https://zetawala.com';

  // Core static & compliance pages
  const staticRoutes = [
    '',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.5,
  }));

  // Dynamic active tool routes from configuration
  const toolRoutes = [];
  navigationConfig.forEach((category) => {
    if (category.isActive) {
      const catSubpath = category.slug === 'youtube-automation' ? 'youtube' : 'daraz';
      category.tools.forEach((tool) => {
        if (tool.isActive) {
          toolRoutes.push({
            url: `${baseUrl}/dashboard/${catSubpath}/${tool.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }
  });

  return [...staticRoutes, ...toolRoutes];
}
