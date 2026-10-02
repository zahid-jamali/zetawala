'use client';

import React from 'react';
import { getToolGuide } from '../../../config/toolGuides';
import ToolSeoSection from '../ToolSeoSection';
import BlogCarousel from '../BlogCarousel';
import DocWhatItDoes from './DocWhatItDoes';
import DocInputsGuide from './DocInputsGuide';
import DocMethodology from './DocMethodology';
import DocInterpretation from './DocInterpretation';
import DocExampleSandbox from './DocExampleSandbox';
import DocUseCasesMistakes from './DocUseCasesMistakes';
import DocFaqAccordion from './DocFaqAccordion';
import DocRelatedNav from './DocRelatedNav';

const SITE_URL = 'https://www.zetawala.com';

export default function ToolDocumentationSection({ toolSlug, language = null, toolCopy = null }) {
  const guide = getToolGuide(toolSlug);

  // If this tool has not yet been migrated to the new deep documentation format,
  // seamlessly fall back to legacy ToolSeoSection
  if (!guide) {
    return <ToolSeoSection toolSlug={toolSlug} language={language} toolCopy={toolCopy} />;
  }

  // Schema generation
  const faqSchema = guide.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } : null;

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: guide.h1 || guide.seoTitle,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: guide.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'ZetaWala',
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: guide.category.charAt(0).toUpperCase() + guide.category.slice(1),
        item: `${SITE_URL}/${guide.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.h1,
      },
    ],
  };

  return (
    <div className="mt-14 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-12 text-slate-900 dark:text-slate-100 w-full max-w-full min-w-0 overflow-hidden">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Sections B, C, D: What It Does, Problem Solved, Who Is It For */}
      <DocWhatItDoes guide={guide} />

      {/* Section E: Inputs Guide */}
      <DocInputsGuide guide={guide} />

      {/* Sections F & G: How It Works & Methodology/Formula */}
      <DocMethodology guide={guide} />

      {/* Section H: Output Interpretation */}
      <DocInterpretation guide={guide} />

      {/* Section I: Real-world Example Sandbox */}
      <DocExampleSandbox guide={guide} />

      {/* Sections J, K, L: Use Cases, Limitations, Common Mistakes */}
      <DocUseCasesMistakes guide={guide} />

      {/* Section M: FAQs Accordion */}
      <DocFaqAccordion guide={guide} />

      {/* Sections N & O: Related Tools and Guides */}
      <DocRelatedNav guide={guide} />

      {/* Contextual Blog Carousel */}
      <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
        <BlogCarousel category={guide.category} />
      </div>
    </div>
  );
}
