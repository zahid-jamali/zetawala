import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'Lazada Seller Guides | ZetaWala Blog',
  description: 'Read ZetaWala guides on Lazada listing SEO, keywords, fees, pricing, and seller chat.',
  alternates: { canonical: 'https://www.zetawala.com/blog/lazada' },
  robots: { index: true, follow: true },
};

export default function LazadaBlogPage() {
  return (
    <BlogListingClient
      category="lazada"
      heroTitle="Lazada Seller Guides"
      heroDescription="Listing SEO, keywords, fees, pricing, shipping, and customer chat tips for Lazada sellers."
    />
  );
}
