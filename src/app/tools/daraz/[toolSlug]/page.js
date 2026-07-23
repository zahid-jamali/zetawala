import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'daraz',
    fallbackTitle: 'Free Daraz SEO Tool | Zetawala',
    fallbackDescription:
      'Free Daraz SEO and seller tools by Zetawala—product hunting, titles, keywords, and profit calculators for Pakistan.',
  });
}

export default async function DynamicDarazToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="daraz-seo" />;
}
