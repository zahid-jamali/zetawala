import Link from 'next/link';
import { Search, ArrowRight, BookOpen, ChevronDown, HelpCircle } from 'lucide-react';
import { seoTools } from '../../config/seoWebmaster/tools';
import { getSeoPath } from '../../config/routes';

export const metadata = {
  title: 'Free SEO Tools – Website Audit, PageSpeed & Webmaster Suite | Zetawala',
  description:
    'Free SEO & Webmaster Intelligence tools: website SEO checker, PageSpeed & Core Web Vitals, broken link checker, sitemap generator, canonical checker, keyword density, and SEO ROI calculators.',
  keywords: [
    'free seo tools',
    'seo website checker',
    'pagespeed insights',
    'core web vitals checker',
    'broken link checker',
    'xml sitemap generator',
    'canonical tag checker',
    'keyword density checker',
    'seo health score',
    'seo roi calculator',
    'webmaster tools free',
    'technical seo audit',
  ],
  alternates: {
    canonical: 'https://www.zetawala.com/seo',
  },
  openGraph: {
    title: 'Free SEO Tools – Website Audit, PageSpeed & Webmaster Suite | Zetawala',
    description:
      'Run free technical SEO audits, validate indexability, check Core Web Vitals, and prioritize fixes with Zetawala webmaster tools.',
    url: 'https://www.zetawala.com/seo',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Tools – Website Audit & Webmaster Suite | Zetawala',
    description:
      'Free SEO website checker, PageSpeed, broken links, sitemaps, canonical checks, and ROI calculators.',
  },
  robots: { index: true, follow: true },
};

const toolPicker = [
  {
    title: 'Start with a full-site audit',
    desc: 'Use the SEO Website Checker or Health Score Calculator when you need a broad baseline before diving into individual issues.',
    slugs: ['website-checker', 'health-score'],
  },
  {
    title: 'Fix crawl & index problems',
    desc: 'Validate sitemaps, robots.txt, canonical tags, and indexability signals before worrying about content tweaks.',
    slugs: ['sitemap-tool', 'robots-txt-tool', 'canonical-indexability'],
  },
  {
    title: 'Optimize pages & content',
    desc: 'Audit titles, meta descriptions, keyword density, and on-page content structure for ranking pages.',
    slugs: ['title-meta-analyzer', 'content-audit', 'keyword-density'],
  },
  {
    title: 'Measure performance & ROI',
    desc: 'Check Core Web Vitals, estimate traffic value, and model SEO or content ROI with labeled assumptions.',
    slugs: ['pagespeed-analyzer', 'traffic-revenue', 'seo-roi'],
  },
];

const learningTopics = [
  {
    title: 'Technical SEO fundamentals',
    body: 'Learn how crawlers discover pages, why sitemaps and robots.txt matter, and how canonical tags prevent duplicate content dilution.',
  },
  {
    title: 'Core Web Vitals & PageSpeed',
    body: 'Understand LCP, INP, and CLS—and how lab vs field data from Google PageSpeed Insights guides performance fixes.',
  },
  {
    title: 'On-page & content signals',
    body: 'Titles, meta descriptions, heading hierarchy, internal links, and keyword usage still drive relevance for competitive queries.',
  },
  {
    title: 'Webmaster workflows',
    body: 'Prioritize fixes with an action plan, track health scores over time, and tie SEO effort to traffic and revenue estimates.',
  },
];

const categoryFaqs = [
  {
    q: 'What is SEO & Webmaster Intelligence on ZetaWala?',
    a: 'It is a suite of 17 free tools covering technical audits, indexability, PageSpeed, content analysis, and ROI modeling—designed for site owners and marketers who need actionable SEO diagnostics.',
  },
  {
    q: 'Do I need an API key for PageSpeed analysis?',
    a: 'PageSpeed & Core Web Vitals uses Google PageSpeed Insights. Configure PAGESPEED_API_KEY on the server for reliable quota; some checks may work with shared keys in development.',
  },
  {
    q: 'Which tool should I run first?',
    a: 'Start with the SEO Website Checker or Health Score Calculator for a baseline, then use specialized tools (sitemap, canonical, broken links) based on the issues surfaced.',
  },
  {
    q: 'Are these tools suitable for beginners?',
    a: 'Yes. Outputs include plain-language explanations and the SEO Action Plan Generator produces a prioritized, beginner-friendly roadmap from audit findings.',
  },
  {
    q: 'Where can I read SEO guides on ZetaWala?',
    a: 'Visit the SEO & Webmaster blog section for articles on technical SEO, Core Web Vitals, and webmaster best practices.',
  },
];

export default function SeoCategoryPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero */}
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
          <Search className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          SEO & Webmaster Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium">
          Diagnose technical SEO, validate indexability, audit content, measure Core Web Vitals, and model ROI—all in one webmaster workspace with 17 specialized tools.
        </p>
        <div className="pt-2">
          <Link
            href={getSeoPath('seo', 'website-checker')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
          >
            Run Website SEO Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Tool directory */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">All SEO & Webmaster Tools</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">17 tools for audits, indexability, performance, and ROI analysis.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seoTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getSeoPath('seo', tool.slug)}
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

      {/* Choose the Right SEO Tool */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Choose the Right SEO Tool</h2>
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
                  const tool = seoTools.find((t) => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={getSeoPath('seo', slug)}
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

      {/* SEO Learning */}
      <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-500" />
              SEO Learning
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core concepts behind the webmaster toolkit.</p>
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
              href="/blog/seo-webmaster"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Read SEO & Webmaster blog guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Common questions about the SEO & Webmaster suite.</p>
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
