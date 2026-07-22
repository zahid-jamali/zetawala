import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';
import BlogPostClient from '../../../components/blog/BlogPostClient';

const SITE_URL = 'https://zetawala.com';

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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
