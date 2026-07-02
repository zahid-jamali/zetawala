import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Free YouTube SEO Description Writer & Generator - ZetaWala',
  description: 'Create high-ranking SEO-optimized YouTube video descriptions rich in structural keywords and visual layout presets with ZetaWala.',
};

export default function DescriptionBuilderPage() {
  return <PipelineWorkspace toolSlug="description-builder" categorySlug="youtube-automation" />;
}
