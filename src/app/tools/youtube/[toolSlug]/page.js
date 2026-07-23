import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'youtube',
    fallbackTitle: 'Free YouTube Automation Tool | Zetawala',
    fallbackDescription:
      'Free YouTube automation and SEO tools by Zetawala—titles, scripts, tags, niches, and channel analytics.',
  });
}

export default async function DynamicYoutubeToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="youtube-automation" />;
}
