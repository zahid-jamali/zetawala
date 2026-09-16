'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { seoData } from '../../config/seo';
import BlogCarousel from './BlogCarousel';
import { LANG_LABELS, getWritingTool } from '../../config/writing/tools';
import { getWritingLangPath } from '../../config/writing/languages';

export default function ToolSeoSection({ toolSlug, language = null, toolCopy = null }) {
  const base = toolCopy?.seo || seoData[toolSlug];
  if (!base) return null;

  const langLabel = !toolCopy && language ? LANG_LABELS[language] : null;
  const data = langLabel
    ? {
        ...base,
        title: `${String(base.title || '').split(/[–—|-]/)[0].trim()} for ${langLabel}`,
        description: `${base.description} This page is optimized for ${langLabel} drafts—select ${langLabel} in the tool and get language-aware results.`,
      }
    : base;

  const writingTool = getWritingTool(toolSlug);
  const showLangLinks = writingTool?.languages?.length > 1;

  // Determine matching blog category for interlinking
  const isYoutube = [
    'niche-finder', 'niche-opportunity', 'channel-health', 'video-performance', 'revenue-calculator',
    'video-ideas', 'title-generator', 'hook-architect', 'description-builder',
    'tags-extractor', 'thumbnail-prompt', 'script-master', 'visuals-recommender'
  ].includes(toolSlug);

  const isLocalCommerce = [
    'whatsapp-broadcast', 'local-ad-script', 'wholesale-negotiation',
    'social-comment-responder', 'product-storyboard'
  ].includes(toolSlug);

  const isSeoWebmaster = [
    'website-checker', 'content-audit', 'title-meta-analyzer', 'pagespeed-analyzer',
    'internal-link-analyzer', 'broken-link-checker', 'sitemap-tool', 'canonical-indexability',
    'action-plan', 'robots-txt-tool', 'header-meta-inspector', 'traffic-revenue',
    'health-score', 'keyword-density', 'seo-roi', 'keyword-roi', 'content-roi'
  ].includes(toolSlug);

  const isCalculators = [
    'freelance-hourly-rate', 'ai-api-cost', 'saas-pricing', 'customer-ltv', 'customer-cac',
    'break-even', 'profit-margin', 'content-marketing-roi', 'google-ads-profit',
    'email-marketing-roi', 'affiliate-earnings', 'adsense-revenue', 'ecommerce-profit',
    'amazon-fba-profit', 'etsy-fee-profit', 'ebay-fee', 'freelance-project-pricing',
    'salary-to-hourly'
  ].includes(toolSlug);

  const isPdfUtilities = [
    'pdf-to-markdown', 'pdf-table-extractor', 'pdf-link-extractor', 'pdf-metadata-viewer',
    'pdf-image-extractor', 'excel-formula-generator', 'excel-formula-explainer', 'excel-to-json',
    'json-to-excel', 'csv-to-excel', 'image-metadata-viewer', 'exif-metadata-remover',
    'image-color-palette', 'social-image-resizer', 'screenshot-to-text'
  ].includes(toolSlug);

  const isWriting = [
    'ai-humanizer', 'ai-content-detector', 'plagiarism-checker', 'grammar-checker',
    'paraphrasing-tool', 'roman-urdu-to-urdu', 'urdu-to-roman-urdu', 'roman-urdu-grammar',
    'ai-text-summarizer', 'ai-rewrite-tool'
  ].includes(toolSlug);

  const isStudy = [
    'ai-notes-generator', 'ai-quiz-generator', 'pdf-to-quiz', 'ai-flashcard-generator',
    'youtube-study-notes', 'ai-assignment-generator', 'ai-homework-solver',
    'typing-speed-test', 'typing-master-course', 'coding-typing-test'
  ].includes(toolSlug);

  const isFreelancer = [
    'upwork-proposal-generator', 'upwork-proposal-analyzer', 'upwork-job-match-analyzer',
    'upwork-profile-optimizer', 'upwork-cover-letter-generator', 'upwork-interview-answer-generator',
    'upwork-hourly-rate-calculator', 'upwork-contract-generator', 'upwork-portfolio-description-generator',
    'upwork-client-followup-generator', 'fiverr-gig-title-generator', 'fiverr-gig-description-generator',
    'fiverr-gig-seo-analyzer', 'fiverr-tag-generator', 'fiverr-faq-generator', 'fiverr-pricing-generator',
    'fiverr-gig-image-text-generator', 'fiverr-buyer-request-reply-generator', 'fiverr-profile-bio-generator',
    'fiverr-review-response-generator'
  ].includes(toolSlug);

  const isShopee = String(toolSlug).startsWith('shopee-');
  const isLazada = String(toolSlug).startsWith('lazada-');

  const blogCategory = isYoutube
    ? 'youtube'
    : isLocalCommerce
      ? 'local-commerce'
      : isSeoWebmaster
        ? 'seo-webmaster'
        : isCalculators
          ? 'calculators'
          : isPdfUtilities
            ? 'pdf-utilities'
            : isWriting
              ? 'writing'
              : isStudy
                ? 'study'
                : isFreelancer
                  ? 'freelancer'
                  : isShopee
                    ? 'shopee'
                    : isLazada
                      ? 'lazada'
                      : 'daraz';

  return (
    <div className="mt-12 pt-12 border-t border-slate-205 dark:border-slate-800 space-y-10 text-slate-900 dark:text-slate-100 w-full max-w-full min-w-0 overflow-hidden">
      {data.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: data.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      )}
      {data.title && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: data.title,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              description: data.description,
              provider: {
                '@type': 'Organization',
                name: 'Zetawala',
                url: 'https://www.zetawala.com',
              },
            }),
          }}
        />
      )}
      
      {/* 1. SEO Description */}
      <section className="grid md:grid-cols-12 gap-6 items-start w-full max-w-full min-w-0">
        <div className="md:col-span-4 space-y-1">
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
            {toolCopy?.ui?.sectionTitle || 'Algorithm Optimization & SEO Insights'}
          </h3>
          <p className="text-[11px] text-slate-500">{toolCopy?.ui?.sectionHint || 'How this metadata tool helps search visibility & content ranking.'}</p>
        </div>
        <div className="md:col-span-8 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-xs leading-relaxed text-slate-700 dark:text-slate-303 space-y-3">
          <p>{data.description}</p>
          {showLangLinks && (
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
              Dedicated language pages:{' '}
              {writingTool.languages.map((code, i) => (
                <React.Fragment key={code}>
                  {i > 0 ? ' · ' : ''}
                  <Link
                    href={getWritingLangPath(writingTool.seoSlug, code)}
                    className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    {LANG_LABELS[code]}
                  </Link>
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </section>

      {/* 2. Tool Example Sandbox */}
      {data.example && (
        <section className="grid md:grid-cols-12 gap-6 items-start w-full max-w-full min-w-0">
          <div className="md:col-span-4 space-y-1">
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              {toolCopy?.ui?.exampleTitle || 'Practical Usage Example'}
            </h3>
            <p className="text-[11px] text-slate-500">{toolCopy?.ui?.exampleHint || 'Standard input parameters and the expected optimization output.'}</p>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-4 w-full max-w-full min-w-0">
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-2 overflow-hidden">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">{toolCopy?.ui?.sampleInput || 'Sample Input'}</span>
              <p className="text-xs font-mono text-slate-650 dark:text-slate-400 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{data.example.input}</p>
            </div>
            <div className="p-4 sm:p-5 bg-sky-50/30 dark:bg-sky-950/10 border border-sky-100/50 dark:border-sky-900/20 rounded-2xl space-y-2 overflow-hidden">
              <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">{toolCopy?.ui?.sampleOutput || 'Generated Output'}</span>
              <p className="text-xs font-mono text-slate-750 dark:text-slate-300 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{data.example.output}</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. SEO FAQ Accordions */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="grid md:grid-cols-12 gap-6 items-start w-full max-w-full min-w-0">
          <div className="md:col-span-4 space-y-1">
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              {toolCopy?.ui?.faqTitle || 'Frequently Asked Questions'}
            </h3>
            <p className="text-[11px] text-slate-500">{toolCopy?.ui?.faqHint || 'Essential answers to technical ranking & search indexing questions.'}</p>
          </div>
          <div className="md:col-span-8 space-y-3 w-full max-w-full min-w-0">
            {data.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm"
              >
                <summary className="flex items-center justify-between p-4 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors">
                  <span className="flex items-center gap-2 min-w-0 pr-2">
                    <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="break-words [overflow-wrap:anywhere]">{faq.q}</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:-rotate-180 transition-transform duration-200 shrink-0" />
                </summary>
                <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-650 dark:text-slate-350 break-words [overflow-wrap:anywhere]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 4. Dynamic Related Blog Posts Interlinking Carousel */}
      <BlogCarousel category={blogCategory} />

    </div>
  );
}
