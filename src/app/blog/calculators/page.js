import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'Business Calculator Guides | ZetaWala Blog',
  description:
    'Read ZetaWala guides on freelance pricing, SaaS unit economics, marketing ROI, AdSense, affiliates, and ecommerce profit margins.',
  alternates: {
    canonical: 'https://www.zetawala.com/blog/calculators',
  },
  openGraph: {
    title: 'Business Calculator Guides',
    description:
      'Freelance rates, SaaS pricing, LTV, CAC, ads ROI, and ecommerce margin guides from ZetaWala.',
    url: 'https://www.zetawala.com/blog/calculators',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Calculator Guides',
    description:
      'Freelance rates, SaaS pricing, LTV, CAC, ads ROI, and ecommerce margin guides from ZetaWala.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalculatorsBlogPage() {
  return (
    <BlogListingClient
      category="calculators"
      heroTitle="Business & Marketing Calculator Guides"
      heroDescription="Freelance pricing, SaaS unit economics, marketing ROI, AdSense, affiliates, and ecommerce margin playbooks for founders and sellers."
    />
  );
}
