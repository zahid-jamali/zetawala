import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'AI Script Visuals Recommender - ZetaWala',
  description: 'Chronologically extract stock video search keywords and Midjourney image generation prompts from your YouTube narration scripts.',
};

export default function VisualsRecommenderPage() {
  return <PipelineWorkspace toolSlug="visuals-recommender" categorySlug="youtube-automation" />;
}
