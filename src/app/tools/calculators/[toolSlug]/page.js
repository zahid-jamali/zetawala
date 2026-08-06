import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'calculators',
    fallbackTitle: 'Free Business & Marketing Calculator | Zetawala',
    fallbackDescription:
      'Free business calculators by Zetawala—freelance rates, SaaS pricing, LTV, CAC, ROI, AdSense, ecommerce profit, and more.',
  });
}

export default async function DynamicCalculatorToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="calculators" />;
}
