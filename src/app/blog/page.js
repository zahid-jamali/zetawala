import BlogListingClient from '../../components/blog/BlogListingClient';

export const metadata = {
  title: 'ZetaWala Blog & SEO Guides | YouTube, Daraz & E-commerce',
  description:
    'Read ZetaWala SEO guides, YouTube automation tips, Daraz growth strategies, and local social commerce insights.',
  alternates: {
    canonical: 'https://zetawala.com/blog',
  },
  openGraph: {
    title: 'ZetaWala Blog & SEO Guides',
    description:
      'Optimization guides for YouTube creators, Daraz sellers, and local commerce marketers.',
    url: 'https://zetawala.com/blog',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZetaWala Blog & SEO Guides',
    description:
      'Optimization guides for YouTube creators, Daraz sellers, and local commerce marketers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogListingPage() {
  return <BlogListingClient />;
}
