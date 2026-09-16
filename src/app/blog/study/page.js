import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'AI Study, Quizzes & Typing Guides | ZetaWala Blog',
  description:
    'Read ZetaWala guides on AI study notes, quizzes, flashcards, YouTube notes, homework help, and typing practice.',
  alternates: {
    canonical: 'https://www.zetawala.com/blog/study',
  },
  openGraph: {
    title: 'AI Study, Quizzes & Typing Guides',
    description:
      'Study notes, quizzes, flashcards, YouTube notes, homework, and typing guides from ZetaWala.',
    url: 'https://www.zetawala.com/blog/study',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Study, Quizzes & Typing Guides',
    description:
      'Study notes, quizzes, flashcards, YouTube notes, homework, and typing guides from ZetaWala.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StudyBlogPage() {
  return (
    <BlogListingClient
      category="study"
      heroTitle="AI Study, Quizzes & Typing Guides"
      heroDescription="Notes, quizzes, flashcards, YouTube study notes, homework strategies, and typing practice—practical playbooks for students and lifelong learners."
    />
  );
}
