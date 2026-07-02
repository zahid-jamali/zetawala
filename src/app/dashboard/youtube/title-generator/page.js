import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Free YouTube Title Generator & Copywriter - ZetaWala',
  description: 'Generate high-CTR, clickbait-free, algorithm-optimized YouTube titles instantly with ZetaWala copywriting intelligence.',
};

export default function TitleGeneratorPage() {
  return <PipelineWorkspace toolSlug="title-generator" categorySlug="youtube-automation" />;
}
