import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';
import { getWritingPageSeo, parseWritingToolSlug } from '../../../../config/writing/languages';
import { toolMetadata } from '../../../../config/toolMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const seo = getWritingPageSeo(toolSlug);
  const internalSlug = seo?.parsed?.internalSlug || getInternalSlug(toolSlug);
  const baseMeta = toolMetadata[internalSlug] || {};

  if (seo?.parsed?.language) {
    const title = seo.title || baseMeta.title || 'Free AI Writing Tool | Zetawala';
    const description = seo.description || baseMeta.description || '';
    const keywords = seo.keywords || baseMeta.keywords || [];
    return {
      title,
      description,
      keywords,
      authors: [{ name: 'Zetawala' }],
      creator: 'Zetawala',
      publisher: 'Zetawala',
      category: 'Technology',
      applicationName: 'Zetawala',
      alternates: seo.alternates,
      openGraph: {
        title,
        description,
        url: seo.canonicalUrl,
        siteName: 'Zetawala',
        locale: seo.locale,
        type: 'website',
        images: [{ url: '/opengraph-image.png', width: 512, height: 512, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/opengraph-image.png'],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      },
    };
  }

  // Base hub page — keep existing metadata, add hreflang when multilingual
  const meta = buildToolPageMetadata({
    internalSlug,
    category: 'writing',
    fallbackTitle: 'Free AI Writing & Language Tool | Zetawala',
    fallbackDescription:
      'Free AI writing tools by Zetawala—humanizer, AI detector, grammar checker, paraphraser, Urdu converters, summarizer, and rewrite tools powered by DeepSeek.',
  });

  if (seo?.alternates?.languages) {
    return {
      ...meta,
      alternates: {
        ...meta.alternates,
        languages: seo.alternates.languages,
      },
    };
  }

  return meta;
}

export default async function DynamicWritingToolPage({ params }) {
  const { toolSlug } = await params;
  const parsed = parseWritingToolSlug(toolSlug);
  const internalSlug = parsed?.internalSlug || getInternalSlug(toolSlug);
  const initialLanguage = parsed?.language || null;

  return (
    <PipelineWorkspace
      toolSlug={internalSlug}
      categorySlug="ai-writing"
      initialLanguage={initialLanguage}
    />
  );
}
