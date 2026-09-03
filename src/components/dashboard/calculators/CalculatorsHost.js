'use client';

import React from 'react';
import { CALCULATOR_TOOL_SLUGS } from '../../../config/calculators/tools';
import CalculatorShell from './CalculatorShell';

export const CALCULATOR_HOST_SLUGS = CALCULATOR_TOOL_SLUGS;

export default function CalculatorsHost({ toolSlug, locale, toolCopy }) {
  if (!CALCULATOR_HOST_SLUGS.includes(toolSlug)) return null;
  return <CalculatorShell toolSlug={toolSlug} locale={locale} toolCopy={toolCopy} />;
}
