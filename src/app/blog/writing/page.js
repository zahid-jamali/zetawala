import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'AI Writing & Language Guides | ZetaWala Blog',
  description:
    'Read ZetaWala guides on AI humanizing, content detection, grammar, paraphrasing, Roman Urdu ↔ Urdu conversion, summarizing, and rewriting.',
  alternates: {
    canonical: 'https://www.zetawala.com/blog/writing',
  },
  openGraph: {
    title: 'AI Writing & Language Guides',
    description:
      'AI humanizer, detector, grammar, Urdu converters, summarizer, and rewrite guides from ZetaWala.',
    url: 'https://www.zetawala.com/blog/writing',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Writing & Language Guides',
    description:
      'AI humanizer, detector, grammar, Urdu converters, summarizer, and rewrite guides from ZetaWala.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WritingBlogPage() {
  return (
    <BlogListingClient
      category="writing"
      heroTitle="AI Writing & Language Guides"
      heroDescription="Humanize AI drafts, detect AI writing, polish grammar, convert Roman Urdu ↔ Urdu, summarize long text, and rewrite with intent—practical playbooks for writers and sellers."
    />
  );
}
