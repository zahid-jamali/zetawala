import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'freelancer',
    fallbackTitle: 'Free Freelancer Toolkit Tool | Zetawala',
    fallbackDescription:
      'Free Upwork and Fiverr freelancer tools by Zetawala—proposals, gigs, profiles, pricing, contracts, and client messages.',
  });
}

export default async function DynamicFreelancerToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="freelancer-toolkit" />;
}
