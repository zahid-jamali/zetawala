import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return buildToolPageMetadata({
    internalSlug,
    category: 'lazada',
    fallbackTitle: 'Free Lazada Seller Tool | Zetawala',
    fallbackDescription: 'Free Lazada seller tools for listing SEO, keywords, profit, fees, pricing, shipping, and chat replies.',
  });
}

export default async function DynamicLazadaToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="lazada-seller" />;
}
