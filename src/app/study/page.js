import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap, ChevronDown, HelpCircle } from 'lucide-react';
import { studyTools } from '../../config/study/tools';
import { getSeoPath } from '../../config/routes';

export const metadata = {
  title: 'Free AI Study, Quizzes & Typing Tools | Zetawala',
  description:
    'Free study tools: AI notes, quizzes, PDF-to-quiz, flashcards, YouTube notes, assignments, homework solver, typing speed test, typing master course, and coding typing test.',
  keywords: [
    'ai study notes',
    'ai quiz generator',
    'pdf to quiz',
    'ai flashcards',
    'youtube study notes',
    'ai homework solver',
    'typing speed test',
    'coding typing test',
    'free study tools',
  ],
  alternates: {
    canonical: 'https://zetawala.com/study',
  },
  openGraph: {
    title: 'Free AI Study, Quizzes & Typing Tools | Zetawala',
    description:
      'AI notes, quizzes, flashcards, YouTube study notes, homework help, and typing practice with certificates—10 free educational tools.',
    url: 'https://zetawala.com/study',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Study, Quizzes & Typing | Zetawala',
    description:
      'Notes, quizzes, flashcards, YouTube notes, homework help, and typing tests with certificates.',
  },
  robots: { index: true, follow: true },
};

const toolPicker = [
  {
    title: 'Notes, quizzes & flashcards',
    desc: 'Generate notes and interactive practice from any topic.',
    slugs: ['ai-notes-generator', 'ai-quiz-generator', 'ai-flashcard-generator'],
  },
  {
    title: 'Learn from PDFs & YouTube',
    desc: 'Turn documents and videos into quizzes and study notes.',
    slugs: ['pdf-to-quiz', 'youtube-study-notes'],
  },
  {
    title: 'Assignments & homework help',
    desc: 'Draft structured assignments and get step-by-step explanations.',
    slugs: ['ai-assignment-generator', 'ai-homework-solver'],
  },
  {
    title: 'Typing speed & coding practice',
    desc: 'Timed tests, guided lessons, and code typing with certificates.',
    slugs: ['typing-speed-test', 'typing-master-course', 'coding-typing-test'],
  },
];

const learningTopics = [
  {
    title: 'Active recall beats passive reading',
    body: 'Quizzes and flashcards force retrieval practice, which strengthens memory more than re-reading notes alone.',
  },
  {
    title: 'Ground AI in your sources',
    body: 'PDF and YouTube tools work best when the model stays close to extracted text or transcripts—always verify facts.',
  },
  {
    title: 'Typing is a compounding skill',
    body: 'Short daily practice with accuracy-first goals builds speed without forming bad habits.',
  },
  {
    title: 'Certificates mark milestones',
    body: 'Downloadable certificates for typing tools help track progress locally until account sync is available.',
  },
];

const categoryFaqs = [
  {
    q: 'What is the AI Study, Quizzes & Typing suite?',
    a: 'It is a suite of 10 free tools for AI study notes, quizzes, PDF-to-quiz, flashcards, YouTube notes, assignments, homework help, and typing practice—AI tools use DeepSeek; typing tools are client-only.',
  },
  {
    q: 'Do typing tools use AI?',
    a: 'No. Typing Speed Test, Typing Master Course, and Coding Typing Test use deterministic client logic with LocalStorage history and PDF certificates.',
  },
  {
    q: 'Which tool should I start with?',
    a: 'Start with AI Notes Generator for a topic overview, AI Quiz Generator for practice, or Typing Speed Test for a quick WPM baseline.',
  },
  {
    q: 'What if a YouTube video has no captions?',
    a: 'The YouTube study notes tool will show a clear error. Try a video with available transcripts.',
  },
  {
    q: 'Where can I read related guides?',
    a: 'Visit the AI Study blog section for notes, quiz, and typing tips.',
  },
];

export default function StudyCategoryPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
          <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          AI Study, Quizzes & Typing
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium">
          AI notes, quizzes, PDF-to-quiz, flashcards, YouTube study notes, assignments, homework help, plus typing speed, typing master, and coding typing tests with certificates.
        </p>
        <div className="pt-2">
          <Link
            href={getSeoPath('study', 'ai-notes-generator')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
          >
            Open AI Notes Generator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">All Study Tools</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">10 tools for notes, quizzes, flashcards, homework, and typing practice.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getSeoPath('study', tool.slug)}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-sky-500/30 dark:hover:border-sky-500/20 transition-all group"
            >
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Choose the Right Study Tool</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Match your goal to the right starting point in the suite.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {toolPicker.map((block) => (
            <div
              key={block.title}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4"
            >
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">{block.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{block.desc}</p>
              </div>
              <ul className="space-y-1.5">
                {block.slugs.map((slug) => {
                  const tool = studyTools.find((t) => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={getSeoPath('study', slug)}
                        className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        {tool.name} →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-500" />
              Study & Typing Learning
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core concepts behind the educational toolkit.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {learningTopics.map((topic) => (
              <div
                key={topic.title}
                className="p-6 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl"
              >
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">{topic.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{topic.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link
              href="/blog/study"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Read AI Study blog guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Common questions about the AI Study, Quizzes & Typing suite.</p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {categoryFaqs.map((faq, idx) => (
            <details key={idx} className="group transition-all">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/45 select-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 pr-4">
                  <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-6 pb-6 pt-1">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-350 leading-relaxed font-medium">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
