import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { toolMetadata } from '../../../../config/toolMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  
  const meta = toolMetadata[internalSlug] || {};

  return {
    ...meta,
    title: meta.title || 'YouTube Automation Tool - ZetaWala',
    description: meta.description || 'Premium YouTube Automation tools.'
  };
}

export default async function DynamicYoutubeToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="youtube-automation" />;
}
