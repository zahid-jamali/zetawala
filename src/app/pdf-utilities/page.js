import Link from 'next/link';
import { FileStack, ArrowRight, BookOpen, ChevronDown, HelpCircle } from 'lucide-react';
import { pdfUtilityTools } from '../../config/pdfUtilities/tools';
import { getSeoPath } from '../../config/routes';

export const metadata = {
  title: 'Free PDF & Image Utilities – Convert, Extract, Resize & OCR | Zetawala',
  description:
    'Free PDF and image utilities: PDF to Markdown, table and link extractors, Excel converters, EXIF tools, color palettes, social image resizers, and screenshot OCR.',
  keywords: [
    'pdf to markdown converter',
    'pdf table extractor',
    'excel to json converter',
    'exif metadata remover',
    'image color palette extractor',
    'social media image resizer',
    'screenshot to text ocr',
    'free pdf tools',
  ],
  alternates: {
    canonical: 'https://www.zetawala.com/pdf-utilities',
  },
  openGraph: {
    title: 'Free PDF & Image Utilities – Convert, Extract, Resize & OCR | Zetawala',
    description:
      'Convert PDFs, extract tables and links, transform Excel/JSON/CSV, manage image metadata, and run OCR—15 free utilities with no paid APIs.',
    url: 'https://www.zetawala.com/pdf-utilities',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF & Image Utilities | Zetawala',
    description:
      'PDF converters, Excel tools, EXIF utilities, social image resizers, and screenshot OCR.',
  },
  robots: { index: true, follow: true },
};

const toolPicker = [
  {
    title: 'Work with PDFs',
    desc: 'Convert documents to Markdown, extract tables, links, metadata, and embedded images.',
    slugs: ['pdf-to-markdown', 'pdf-table-extractor', 'pdf-link-extractor', 'pdf-metadata-viewer', 'pdf-image-extractor'],
  },
  {
    title: 'Excel & spreadsheet helpers',
    desc: 'Generate or explain formulas and convert between Excel, JSON, and CSV.',
    slugs: ['excel-formula-generator', 'excel-formula-explainer', 'excel-to-json', 'json-to-excel', 'csv-to-excel'],
  },
  {
    title: 'Image metadata & design',
    desc: 'Inspect or strip EXIF data and pull dominant colors for design systems.',
    slugs: ['image-metadata-viewer', 'exif-metadata-remover', 'image-color-palette'],
  },
  {
    title: 'Resize & OCR',
    desc: 'Prepare images for social platforms and turn screenshots into editable text.',
    slugs: ['social-image-resizer', 'screenshot-to-text'],
  },
];

const learningTopics = [
  {
    title: 'Why Markdown from PDF helps',
    body: 'Clean Markdown keeps headings and lists editable for blogs, docs, and LLM pipelines without messy copy-paste from PDFs.',
  },
  {
    title: 'EXIF privacy risk',
    body: 'Photos often embed camera, GPS, and device details. Strip metadata before sharing client or personal images publicly.',
  },
  {
    title: 'Social crop sizes',
    body: 'Each network expects different aspect ratios. Resize once per platform to avoid blurry auto-crops in feeds.',
  },
  {
    title: 'OCR for screenshots',
    body: 'Screenshots of chats, dashboards, and docs become searchable notes when OCR exports plain text or Markdown.',
  },
];

const categoryFaqs = [
  {
    q: 'What is the PDF & Image Utilities suite on ZetaWala?',
    a: 'It is a suite of 15 free utilities for PDF conversion and extraction, Excel/JSON/CSV transforms, image metadata and color tools, social resizing, and screenshot OCR—processed with open-source Node libraries, not paid APIs.',
  },
  {
    q: 'Do these tools use AI?',
    a: 'Most tools are deterministic file processors. Formula helpers are rule-based. OCR uses Tesseract.js for text recognition rather than a generative LLM.',
  },
  {
    q: 'Which tool should I start with?',
    a: 'Start with PDF to Markdown for documents, Excel Formula Generator for spreadsheets, Image Metadata Viewer for photos, or Screenshot to Text for OCR.',
  },
  {
    q: 'Are uploads stored?',
    a: 'Files are processed for your request and are not retained as a permanent library. Keep originals on your device for safety.',
  },
  {
    q: 'Where can I read related guides?',
    a: 'Visit the PDF & Image Utilities blog section for conversion, EXIF, and OCR tips.',
  },
];

export default function PdfUtilitiesCategoryPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30 flex items-center justify-center shrink-0">
          <FileStack className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          PDF & Image Utilities
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium">
          Convert PDFs, extract tables and links, transform Excel and JSON, manage image metadata, resize for social, and run OCR—15 free file utilities with no paid APIs.
        </p>
        <div className="pt-2">
          <Link
            href={getSeoPath('pdf-utilities', 'pdf-to-markdown')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
          >
            Open PDF to Markdown
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">All PDF & Image Tools</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">15 utilities for documents, spreadsheets, images, and OCR.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pdfUtilityTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getSeoPath('pdf-utilities', tool.slug)}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-500/30 dark:hover:border-teal-500/20 transition-all group"
            >
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Choose the Right Utility</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Match your file task to the right starting point in the suite.</p>
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
                  const tool = pdfUtilityTools.find((t) => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={getSeoPath('pdf-utilities', slug)}
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
              <BookOpen className="w-5 h-5 text-teal-500" />
              File Utility Learning
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core concepts behind the PDF and image toolkit.</p>
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
              href="/blog/pdf-utilities"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Read PDF & Image blog guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Common questions about the PDF & Image Utilities suite.</p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {categoryFaqs.map((faq, idx) => (
            <details key={idx} className="group transition-all">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/45 select-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 pr-4">
                  <HelpCircle className="w-4 h-4 text-teal-500 shrink-0" />
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
