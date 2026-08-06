'use client';

import React from 'react';
import { STUDY_AI_SLUGS, STUDY_TOOL_SLUGS } from '../../../config/study/tools';
import StudyAiHost from './StudyAiHost';
import TypingSpeedTest from './TypingSpeedTest';
import TypingMasterCourse from './TypingMasterCourse';
import CodingTypingTest from './CodingTypingTest';

export const STUDY_HOST_SLUGS = STUDY_TOOL_SLUGS;

export default function StudyHost({ toolSlug }) {
  if (toolSlug === 'typing-speed-test') return <TypingSpeedTest />;
  if (toolSlug === 'typing-master-course') return <TypingMasterCourse />;
  if (toolSlug === 'coding-typing-test') return <CodingTypingTest />;
  if (STUDY_AI_SLUGS.includes(toolSlug)) return <StudyAiHost toolSlug={toolSlug} />;
  return null;
}
