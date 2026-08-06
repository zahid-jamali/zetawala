'use client';

import React from 'react';
import { FREELANCER_TOOL_SLUGS } from '../../../config/freelancer/tools';
import FreelancerAiHost from './FreelancerAiHost';
import UpworkHourlyRateCalculator from './UpworkHourlyRateCalculator';

export const FREELANCER_HOST_SLUGS = FREELANCER_TOOL_SLUGS;

export default function FreelancerHost({ toolSlug }) {
  if (toolSlug === 'upwork-hourly-rate-calculator') {
    return <UpworkHourlyRateCalculator />;
  }
  return <FreelancerAiHost toolSlug={toolSlug} />;
}
