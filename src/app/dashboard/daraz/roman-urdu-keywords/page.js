import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Daraz Roman Urdu & Local Keyword Finder - ZetaWala',
  description: 'Generate Roman Urdu and English e-commerce keyword tags tailored specifically to Daraz customer searches in Pakistan with ZetaWala.',
};

export default function RomanUrduKeywordsPage() {
  return <PipelineWorkspace toolSlug="roman-urdu-keywords" categorySlug="daraz-seo" />;
}
