import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'local-commerce',
    fallbackTitle: 'Free WhatsApp & Local Commerce Tool | Zetawala',
    fallbackDescription:
      'Free WhatsApp broadcast, Facebook ad script, and local social commerce tools for Pakistani sellers on Zetawala.',
  });
}

export default async function DynamicLocalCommerceToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="local-social-commerce" />;
}
