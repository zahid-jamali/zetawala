import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: 'Free YouTube AI Script Writer & MASTER - ZetaWala',
  description: 'Write complete word-for-word scripts segmented into hook, body points, and outro with ZetaWala AI script copywriter.',
};

export default function ScriptMasterPage() {
  return <PipelineWorkspace toolSlug="script-master" categorySlug="youtube-automation" />;
}
