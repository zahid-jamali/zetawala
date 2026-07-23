import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'seo',
    fallbackTitle: 'Free SEO & Webmaster Tool | Zetawala',
    fallbackDescription:
      'Free SEO tools by Zetawala—website audits, PageSpeed, broken links, sitemaps, canonical checks, and ROI calculators.',
  });
}

export default async function DynamicSeoToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="seo-webmaster" />;
}
