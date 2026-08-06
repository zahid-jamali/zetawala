import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';
import { getInternalSlug } from '../../../../config/routes';
import { buildToolPageMetadata } from '../../../../lib/buildToolPageMetadata';

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);

  return buildToolPageMetadata({
    internalSlug,
    category: 'pdf-utilities',
    fallbackTitle: 'Free PDF & Image Utility | Zetawala',
    fallbackDescription:
      'Free PDF and image utilities by Zetawala—convert PDFs, extract tables and links, Excel converters, EXIF tools, color palettes, social resizers, and OCR.',
  });
}

export default async function DynamicPdfUtilityToolPage({ params }) {
  const { toolSlug } = await params;
  const internalSlug = getInternalSlug(toolSlug);
  return <PipelineWorkspace toolSlug={internalSlug} categorySlug="pdf-image-utilities" />;
}
