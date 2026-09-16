import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'SEO & Webmaster Intelligence Guides | ZetaWala Blog',
  description:
    'Read ZetaWala guides on technical SEO, Core Web Vitals, indexability, sitemaps, and webmaster best practices.',
  alternates: {
    canonical: 'https://www.zetawala.com/blog/seo-webmaster',
  },
  openGraph: {
    title: 'SEO & Webmaster Intelligence Guides',
    description:
      'Technical SEO, PageSpeed, indexability, and webmaster optimization guides from ZetaWala.',
    url: 'https://www.zetawala.com/blog/seo-webmaster',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO & Webmaster Intelligence Guides',
    description:
      'Technical SEO, PageSpeed, indexability, and webmaster optimization guides from ZetaWala.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeoWebmasterBlogPage() {
  return (
    <BlogListingClient
      category="seo-webmaster"
      heroTitle="SEO & Webmaster Intelligence Guides"
      heroDescription="Technical SEO audits, Core Web Vitals, indexability, sitemaps, robots.txt, and actionable webmaster playbooks for growing organic traffic."
    />
  );
}
