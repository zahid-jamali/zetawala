'use client';

import React from 'react';
import { PDF_UTILITY_TOOL_SLUGS } from '../../../config/pdfUtilities/tools';
import FileUtilityShell from './FileUtilityShell';
import { ExcelFormulaGenerator, ExcelFormulaExplainer } from './FormulaTools';

export const PDF_UTILITY_HOST_SLUGS = PDF_UTILITY_TOOL_SLUGS;

export default function PdfUtilitiesHost({ toolSlug }) {
  if (toolSlug === 'excel-formula-generator') return <ExcelFormulaGenerator />;
  if (toolSlug === 'excel-formula-explainer') return <ExcelFormulaExplainer />;
  if (!PDF_UTILITY_HOST_SLUGS.includes(toolSlug)) return null;
  return <FileUtilityShell toolSlug={toolSlug} />;
}
