import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'study',
    fallbackTitle: 'Free AI Study, Quiz & Typing Tool | Zetawala',
    fallbackDescription:
      'Free study tools by Zetawala—AI notes, quizzes, flashcards, YouTube notes, homework help, typing tests, and coding typing practice.',
  });
}

export default async function DynamicStudyToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="ai-study" />;
}
