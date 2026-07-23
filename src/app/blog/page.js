import BlogListingClient from '../../components/blog/BlogListingClient';

export const metadata = {
  title: 'Zetawala Blog – YouTube, Daraz, WhatsApp & SEO Guides',
  description:
    'Read free guides on YouTube SEO, Daraz seller growth, WhatsApp social commerce, and technical SEO—practical tips from Zetawala.',
  keywords: [
    'youtube seo guide',
    'daraz seller tips',
    'whatsapp marketing pakistan',
    'technical seo blog',
    'zetawala blog',
  ],
  alternates: {
    canonical: 'https://zetawala.com/blog',
  },
  openGraph: {
    title: 'Zetawala Blog – YouTube, Daraz, WhatsApp & SEO Guides',
    description:
      'Practical guides for YouTube creators, Daraz sellers, WhatsApp marketers, and SEO webmasters.',
    url: 'https://zetawala.com/blog',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zetawala Blog – YouTube, Daraz, WhatsApp & SEO Guides',
    description:
      'Practical guides for YouTube creators, Daraz sellers, WhatsApp marketers, and SEO webmasters.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogListingPage() {
  return <BlogListingClient />;
}
