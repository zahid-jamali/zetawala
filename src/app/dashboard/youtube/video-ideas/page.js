import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Free YouTube Video Idea Generator - ZetaWala',
  description: 'Generate 7 distinct, viral, and trending video ideas for your niche instantly with ZetaWala e-commerce and media SEO tools.',
};

export default function VideoIdeasPage() {
  return <PipelineWorkspace toolSlug="video-ideas" categorySlug="youtube-automation" />;
}
