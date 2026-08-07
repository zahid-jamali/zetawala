import Link from 'next/link';
import { PenLine, ArrowRight, BookOpen, ChevronDown, HelpCircle } from 'lucide-react';
import { writingTools, LANG_LABELS } from '../../config/writing/tools';
import { getWritingLangPath } from '../../config/writing/languages';
import { getSeoPath } from '../../config/routes';

export const metadata = {
  title: 'Free AI Writing & Language Tools – Humanizer, Grammar & Urdu | Zetawala',
  description:
    'Free AI writing tools: AI humanizer, content detector, plagiarism and grammar checkers, paraphraser, Roman Urdu ↔ Urdu converters, summarizer, and rewrite tools.',
  keywords: [
    'ai humanizer',
    'ai content detector',
    'plagiarism checker',
    'grammar checker',
    'paraphrasing tool',
    'roman urdu to urdu converter',
    'urdu to roman urdu',
    'ai text summarizer',
    'ai rewrite tool',
    'free ai writing tools',
  ],
  alternates: {
    canonical: 'https://zetawala.com/writing',
  },
  openGraph: {
    title: 'Free AI Writing & Language Tools – Humanizer, Grammar & Urdu | Zetawala',
    description:
      'Humanize AI text, detect AI writing, fix grammar, convert Roman Urdu, summarize, and rewrite—10 free language tools powered by DeepSeek.',
    url: 'https://zetawala.com/writing',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Writing & Language Tools | Zetawala',
    description:
      'AI humanizer, detector, grammar, paraphraser, Urdu converters, summarizer, and rewrite tools.',
  },
  robots: { index: true, follow: true },
};

const toolPicker = [
  {
    title: 'Humanize & detect AI text',
    desc: 'Make AI drafts sound natural, then score AI vs human writing signals.',
    slugs: ['ai-humanizer', 'ai-content-detector'],
  },
  {
    title: 'Polish & protect originality',
    desc: 'Fix grammar, check plagiarism, and paraphrase in multiple writing modes.',
    slugs: ['grammar-checker', 'plagiarism-checker', 'paraphrasing-tool'],
  },
  {
    title: 'Work in Urdu & Roman Urdu',
    desc: 'Convert between scripts and fix Roman Urdu spelling and grammar.',
    slugs: ['roman-urdu-to-urdu', 'urdu-to-roman-urdu', 'roman-urdu-grammar'],
  },
  {
    title: 'Summarize & rewrite',
    desc: 'Compress long text into key points or rewrite for tone, length, and SEO.',
    slugs: ['ai-text-summarizer', 'ai-rewrite-tool'],
  },
];

const learningTopics = [
  {
    title: 'Why humanize AI drafts',
    body: 'Raw model output often sounds repetitive. A humanizer keeps meaning while improving rhythm, variety, and natural phrasing.',
  },
  {
    title: 'Detector signals are estimates',
    body: 'AI detectors score patterns, not proof of authorship. Use them as a second opinion alongside your own editorial judgment.',
  },
  {
    title: 'Roman Urdu ↔ Urdu scripts',
    body: 'Pakistani sellers and writers often switch scripts. Converters speed drafting while grammar tools catch common Roman Urdu mistakes.',
  },
  {
    title: 'Rewrite with intent',
    body: 'Shorter, longer, professional, friendly, and SEO modes let you adapt the same draft for different channels without starting over.',
  },
];

const categoryFaqs = [
  {
    q: 'What is the AI Writing & Language Tools suite on ZetaWala?',
    a: 'It is a suite of 10 free tools for humanizing AI text, detecting AI writing, checking grammar and plagiarism, paraphrasing, converting Roman Urdu ↔ Urdu, summarizing, and rewriting—powered by DeepSeek.',
  },
  {
    q: 'Which languages are supported?',
    a: 'Most tools support English, Spanish, and Urdu. Dedicated converters and the Roman Urdu grammar checker focus on Urdu and Roman Urdu workflows.',
  },
  {
    q: 'Which tool should I start with?',
    a: 'Start with the AI Humanizer for drafts, Grammar Checker for polish, Roman Urdu → Urdu Converter for script work, or AI Text Summarizer for long documents.',
  },
  {
    q: 'Does the plagiarism checker use the web?',
    a: 'The plagiarism checker runs local similarity analysis on pasted or uploaded text. It is not a full web-index originality search.',
  },
  {
    q: 'Where can I read related guides?',
    a: 'Visit the AI Writing blog section for humanizer, grammar, Urdu, and rewrite tips.',
  },
];

export default function WritingCategoryPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center shrink-0">
          <PenLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          AI Writing & Language Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium">
          Humanize AI text, detect AI writing, fix grammar, paraphrase, convert Roman Urdu ↔ Urdu, summarize, and rewrite—10 free language tools powered by DeepSeek.
        </p>
        <div className="pt-2">
          <Link
            href={getSeoPath('writing', 'ai-humanizer')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors"
          >
            Open AI Humanizer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">All Writing Tools</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">10 tools for humanizing, detecting, polishing, translating scripts, and rewriting.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {writingTools.map((tool) => (
            <div
              key={tool.slug}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all group space-y-3"
            >
              <Link href={getSeoPath('writing', tool.slug)} className="block">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{tool.desc}</p>
              </Link>
              {tool.languages?.length > 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {tool.languages.map((code) => (
                    <Link
                      key={code}
                      href={getWritingLangPath(tool.seoSlug, code)}
                      className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:border-sky-300"
                    >
                      {LANG_LABELS[code]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Choose the Right Writing Tool</h2>
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
                  const tool = writingTools.find((t) => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={getSeoPath('writing', slug)}
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
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Writing & Language Learning
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core concepts behind the AI writing toolkit.</p>
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
              href="/blog/writing"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Read AI Writing blog guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Common questions about the AI Writing & Language Tools suite.</p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {categoryFaqs.map((faq, idx) => (
            <details key={idx} className="group transition-all">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/45 select-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 pr-4">
                  <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
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
