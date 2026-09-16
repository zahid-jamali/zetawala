import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'Freelancer Toolkit Guides – Upwork & Fiverr | ZetaWala Blog',
  description:
    'Read ZetaWala guides on Upwork proposals, Fiverr gig SEO, freelancer pricing, profiles, and client messaging.',
  alternates: { canonical: 'https://www.zetawala.com/blog/freelancer' },
  openGraph: {
    title: 'Freelancer Toolkit Guides',
    description: 'Upwork and Fiverr growth guides from ZetaWala.',
    url: 'https://www.zetawala.com/blog/freelancer',
    siteName: 'Zetawala',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function FreelancerBlogPage() {
  return (
    <BlogListingClient
      category="freelancer"
      heroTitle="Freelancer Toolkit Guides"
      heroDescription="Upwork proposals, Fiverr gig SEO, pricing packages, profiles, and client communication—practical playbooks for freelancers."
    />
  );
}
