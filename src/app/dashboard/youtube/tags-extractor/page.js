import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Free YouTube SEO Tags & Keyword Extractor - ZetaWala',
  description: 'Extract exactly 20 high-score long-tail and short-tail video tags to rank your videos higher in search results with ZetaWala.',
};

export default function TagsExtractorPage() {
  return <PipelineWorkspace toolSlug="tags-extractor" categorySlug="youtube-automation" />;
}
