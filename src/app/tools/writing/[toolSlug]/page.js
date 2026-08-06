import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'writing',
    fallbackTitle: 'Free AI Writing & Language Tool | Zetawala',
    fallbackDescription:
      'Free AI writing tools by Zetawala—humanizer, AI detector, grammar checker, paraphraser, Urdu converters, summarizer, and rewrite tools powered by DeepSeek.',
  });
}

export default async function DynamicWritingToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="ai-writing" />;
}
