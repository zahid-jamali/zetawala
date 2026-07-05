import { navigationConfig } from '../config/navigation';

export default async function sitemap() {
  const baseUrl = 'https://zetawala.com';
  const currentDate = new Date().toISOString();

  // 1. Core static landing, support & conversion routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Dynamic active tools routes collected from navigation parameters
  const toolRoutes = [];
  const subpathMap = {
    'youtube-automation': 'youtube',
    'daraz-seo': 'daraz',
  };

  navigationConfig.forEach((category) => {
    if (category.isActive) {
      const catSubpath = subpathMap[category.slug];
      if (catSubpath) {
        category.tools.forEach((tool) => {
          if (tool.isActive) {
            toolRoutes.push({
              url: `${baseUrl}/dashboard/${catSubpath}/${tool.slug}`,
              lastModified: currentDate,
              changeFrequency: 'weekly',
              priority: 0.8,
            });
          }
        });
      }
    }
  });

  return [...staticRoutes, ...toolRoutes];
}
