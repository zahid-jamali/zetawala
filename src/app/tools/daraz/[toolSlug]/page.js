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
    title: meta.title || 'Daraz SEO Tool - ZetaWala',
    description: meta.description || 'Premium Daraz seller optimization tools.'
  };
}

export default async function DynamicDarazToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="daraz-seo" />;
}
