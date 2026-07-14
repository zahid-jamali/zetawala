import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { navigationConfig } from '../../../../config/navigation';
import { getInternalSlug } from '../../../../config/routes';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  
  const category = navigationConfig.find(c => c.slug === 'youtube-automation');
  const tool = category?.tools.find(t => t.slug === internalSlug);

  return {
    title: tool ? `${tool.name} | YouTube Automation Tool - ZetaWala` : 'YouTube SEO Tools - ZetaWala',
    description: tool ? `Generate viral channel results and optimize watch time using ${tool.name}.` : 'Premium YouTube video automation tools.',
  };
}

export default async function DynamicYoutubeToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="youtube-automation" />;
}
