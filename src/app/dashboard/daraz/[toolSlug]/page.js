import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { navigationConfig } from '../../../../config/navigation';

// Dynamically generate SEO metadata matching the target Daraz tool slug
export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const darazCategory = navigationConfig.find(c => c.slug === 'daraz-seo');
  const tool = darazCategory?.tools.find(t => t.slug === toolSlug);

  return {
    title: tool ? `${tool.name} - ZetaWala` : 'Daraz SEO Dashboard - ZetaWala',
    description: tool ? `Optimize listing conversion rates and rank on Daraz search using ${tool.name}.` : 'Premium Daraz SEO dashboard tools.',
  };
}

// Render dynamic workspace matching the target Daraz tool slug
export default async function DynamicDarazToolPage({ params }) {
  const { toolSlug } = await params;
  return <PipelineWorkspace toolSlug={toolSlug} categorySlug="daraz-seo" />;
}
