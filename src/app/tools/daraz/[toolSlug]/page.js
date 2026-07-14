import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { navigationConfig } from '../../../../config/navigation';
import { getInternalSlug } from '../../../../config/routes';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  
  const category = navigationConfig.find(c => c.slug === 'daraz-seo');
  const tool = category?.tools.find(t => t.slug === internalSlug);

  return {
    title: tool ? `${tool.name} | Daraz SEO Tool - ZetaWala` : 'Daraz Seller Tools - ZetaWala',
    description: tool ? `Optimize listing ranks and store conversion sales on Daraz using ${tool.name}.` : 'Premium Daraz seller analytics tools.',
  };
}

export default async function DynamicDarazToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="daraz-seo" />;
}
