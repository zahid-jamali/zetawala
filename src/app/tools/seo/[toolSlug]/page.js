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
    title: meta.title || 'SEO & Webmaster Tool - ZetaWala',
    description: meta.description || 'Free SEO and webmaster intelligence tools by ZetaWala.',
  };
}

export default async function DynamicSeoToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="seo-webmaster" />;
}
