import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';
import BlogPostClient from '../../../components/blog/BlogPostClient';
import BlogListingClient from '../../../components/blog/BlogListingClient';
import AdminDashboardPage from '../admin/page';

const SITE_URL = 'https://zetawala.com';

const BLOG_CATEGORY_PAGES = {
  'seo-webmaster': {
    category: 'seo-webmaster',
    heroTitle: 'SEO & Webmaster Guides',
    heroDescription: 'Technical SEO, PageSpeed, sitemaps, and webmaster workflow guides from Zetawala.',
  },
  calculators: {
    category: 'calculators',
    heroTitle: 'Business & Marketing Calculator Guides',
    heroDescription: 'Freelance pricing, SaaS unit economics, marketing ROI, AdSense, affiliates, and ecommerce margin playbooks.',
  },
  'pdf-utilities': {
    category: 'pdf-utilities',
    heroTitle: 'PDF & Image Utility Guides',
    heroDescription: 'Guides for PDF, Excel, and image tools on Zetawala.',
  },
  writing: {
    category: 'writing',
    heroTitle: 'AI Writing Guides',
    heroDescription: 'Humanizer, grammar, Urdu, and rewrite tips from Zetawala.',
  },
  study: {
    category: 'study',
    heroTitle: 'Study & Learning Guides',
    heroDescription: 'Notes, quizzes, and typing workflow guides from Zetawala.',
  },
  freelancer: {
    category: 'freelancer',
    heroTitle: 'Freelancer Toolkit Guides',
    heroDescription: 'Upwork and Fiverr workflow guides from Zetawala.',
  },
  shopee: {
    category: 'shopee',
    heroTitle: 'Shopee Seller Guides',
    heroDescription: 'Listing SEO and profit guides for Shopee sellers.',
  },
  lazada: {
    category: 'lazada',
    heroTitle: 'Lazada Seller Guides',
    heroDescription: 'Listing SEO and profit guides for Lazada sellers.',
  },
};

async function getPostBySlug(slug) {
  try {
    await dbConnect();
    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    console.error('Failed to load blog post for SEO/render:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug === 'admin') {
    return { title: 'Admin | Zetawala', robots: { index: false, follow: false } };
  }
  if (BLOG_CATEGORY_PAGES[slug]) {
    return { title: BLOG_CATEGORY_PAGES[slug].heroTitle, robots: { index: true, follow: true } };
  }
  const post = await getPostBySlug(slug);

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  if (!post) {
    return {
      title: 'Article Not Found | ZetaWala Blog',
      description: 'This blog article could not be found on ZetaWala.',
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${post.title} | ZetaWala Blog`;
  const description =
    post.excerpt ||
    `Read ${post.title} on ZetaWala — SEO, YouTube, Daraz and e-commerce growth guides.`;
  const ogImage = post.coverImage || `${SITE_URL}/opengraph-image.png`;

  return {
    title,
    description,
    keywords: Array.isArray(post.tags) && post.tags.length ? post.tags : undefined,
    authors: [{ name: post.author || 'Zetawala' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Zetawala',
      type: 'article',
      publishedTime: post.createdAt || undefined,
      modifiedTime: post.updatedAt || post.createdAt || undefined,
      authors: [post.author || 'Zetawala'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;
  if (slug === 'admin') {
    return <AdminDashboardPage />;
  }
  const categoryPage = BLOG_CATEGORY_PAGES[slug];
  if (categoryPage) {
    return (
      <BlogListingClient
        category={categoryPage.category}
        heroTitle={categoryPage.heroTitle}
        heroDescription={categoryPage.heroDescription}
      />
    );
  }
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
