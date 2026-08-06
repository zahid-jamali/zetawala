import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'Shopee Seller Guides | ZetaWala Blog',
  description: 'Read ZetaWala guides on Shopee listing SEO, keywords, fees, pricing, and seller chat.',
  alternates: { canonical: 'https://zetawala.com/blog/shopee' },
  robots: { index: true, follow: true },
};

export default function ShopeeBlogPage() {
  return (
    <BlogListingClient
      category="shopee"
      heroTitle="Shopee Seller Guides"
      heroDescription="Listing SEO, keywords, fees, pricing, shipping, and customer chat tips for Shopee sellers."
    />
  );
}
