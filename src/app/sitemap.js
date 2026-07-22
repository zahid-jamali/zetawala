import { navigationConfig } from '../config/navigation';
import { getSeoPath } from '../config/routes';
import dbConnect from '../lib/mongodb';
import BlogPost from '../models/BlogPost';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seo`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/seo-webmaster`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic active tools routes collected from navigation parameters
  const toolRoutes = [];

  navigationConfig.forEach((category) => {
    if (category.isActive) {
      category.tools.forEach((tool) => {
        if (tool.isActive) {
          toolRoutes.push({
            url: `${baseUrl}${getSeoPath(category.slug, tool.slug)}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }
  });

  // 3. Dynamic blog post URLs fetched from MongoDB
  const blogRoutes = [];
  try {
    await dbConnect();
    const posts = await BlogPost.find({}, { slug: 1, createdAt: 1 });
    posts.forEach((post) => {
      blogRoutes.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.createdAt || currentDate).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  } catch (err) {
    console.error('Failed to fetch blog routes for sitemap:', err);
  }

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
