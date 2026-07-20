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
    title: meta.title || 'Local Social Commerce & WhatsApp Tool - ZetaWala',
    description: meta.description || 'Premium WhatsApp and local social commerce tools for Pakistani sellers.'
  };
}

export default async function DynamicLocalCommerceToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="local-social-commerce" />;
}
