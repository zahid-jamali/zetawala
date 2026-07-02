import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Free YouTube AI Thumbnail Prompt Generator - ZetaWala',
  description: 'Generate high-fidelity detailed prompts for Midjourney or DALL-E to design click-worthy thumbnails with ZetaWala.',
};

export default function ThumbnailPromptPage() {
  return <PipelineWorkspace toolSlug="thumbnail-prompt" categorySlug="youtube-automation" />;
}
