'use client';

import React from 'react';
import NicheFinderTool from './NicheFinderTool';
import NicheOpportunityTool from './NicheOpportunityTool';
import ChannelHealthTool from './ChannelHealthTool';
import VideoPerformanceTool from './VideoPerformanceTool';
import YoutubeRevenueCalculator from './YoutubeRevenueCalculator';

const TOOL_MAP = {
  'niche-finder': NicheFinderTool,
  'niche-opportunity': NicheOpportunityTool,
  'channel-health': ChannelHealthTool,
  'video-performance': VideoPerformanceTool,
  'revenue-calculator': YoutubeRevenueCalculator,
};

export default function YoutubeIntelligenceHost({ toolSlug }) {
  const Comp = TOOL_MAP[toolSlug];
  if (!Comp) return null;
  return <Comp />;
}

export const YOUTUBE_INTELLIGENCE_SLUGS = Object.keys(TOOL_MAP);
