/**
 * PDF & Image Utilities — tool registry (15 tools).
 * Server-side processing via Node open-source libraries (no paid APIs).
 */

export const PDF_UTILITIES_CATEGORY_SLUG = 'pdf-image-utilities';
export const PDF_UTILITIES_FOLDER = 'pdf-utilities';

export const pdfUtilityTools = [
  {
    slug: 'pdf-to-markdown',
    name: 'PDF to Markdown Converter',
    desc: 'Convert PDFs to clean Markdown with headings and lists',
    seoSlug: 'pdf-to-markdown-converter',
    accept: 'application/pdf',
    maxMb: 10,
  },
  {
    slug: 'pdf-table-extractor',
    name: 'PDF Table Extractor',
    desc: 'Detect tables and export CSV, Excel, or JSON',
    seoSlug: 'pdf-table-extractor',
    accept: 'application/pdf',
    maxMb: 10,
  },
  {
    slug: 'pdf-link-extractor',
    name: 'PDF Link Extractor',
    desc: 'Extract URLs, emails, phones, and internal links',
    seoSlug: 'pdf-link-extractor',
    accept: 'application/pdf',
    maxMb: 10,
  },
  {
    slug: 'pdf-metadata-viewer',
    name: 'PDF Metadata Viewer',
    desc: 'View author, dates, encryption, and PDF permissions',
    seoSlug: 'pdf-metadata-viewer',
    accept: 'application/pdf',
    maxMb: 10,
  },
  {
    slug: 'pdf-image-extractor',
    name: 'PDF Image Extractor',
    desc: 'Extract embedded images with gallery and ZIP download',
    seoSlug: 'pdf-image-extractor',
    accept: 'application/pdf',
    maxMb: 10,
  },
  {
    slug: 'excel-formula-generator',
    name: 'Excel Formula Generator',
    desc: 'Rule-based formulas for lookup, math, date, text & logic',
    seoSlug: 'excel-formula-generator',
    clientOnly: true,
  },
  {
    slug: 'excel-formula-explainer',
    name: 'Excel Formula Explainer',
    desc: 'Explain Excel formulas, arguments, and expected output',
    seoSlug: 'excel-formula-explainer',
    clientOnly: true,
  },
  {
    slug: 'excel-to-json',
    name: 'Excel to JSON Converter',
    desc: 'Convert Excel worksheets to structured JSON',
    seoSlug: 'excel-to-json-converter',
    accept: '.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
    maxMb: 8,
  },
  {
    slug: 'json-to-excel',
    name: 'JSON to Excel Converter',
    desc: 'Validate JSON and download as XLSX',
    seoSlug: 'json-to-excel-converter',
    clientUpload: 'json-text',
  },
  {
    slug: 'csv-to-excel',
    name: 'CSV to Excel Converter',
    desc: 'Upload CSV, preview rows, download XLSX',
    seoSlug: 'csv-to-excel-converter',
    accept: 'text/csv,.csv',
    maxMb: 8,
  },
  {
    slug: 'image-metadata-viewer',
    name: 'Image Metadata Viewer',
    desc: 'View EXIF camera, GPS, ISO, aperture, and resolution',
    seoSlug: 'image-metadata-viewer',
    accept: 'image/*',
    maxMb: 8,
  },
  {
    slug: 'exif-metadata-remover',
    name: 'EXIF Metadata Remover',
    desc: 'Strip image metadata while preserving quality',
    seoSlug: 'exif-metadata-remover',
    accept: 'image/*',
    maxMb: 8,
  },
  {
    slug: 'image-color-palette',
    name: 'Image Color Palette Extractor',
    desc: 'Dominant colors with HEX, RGB, CSS & Tailwind hints',
    seoSlug: 'image-color-palette-extractor',
    accept: 'image/*',
    maxMb: 8,
  },
  {
    slug: 'social-image-resizer',
    name: 'Social Media Image Resizer',
    desc: 'Resize for Instagram, Facebook, LinkedIn, X, TikTok & more',
    seoSlug: 'social-media-image-resizer',
    accept: 'image/*',
    maxMb: 8,
  },
  {
    slug: 'screenshot-to-text',
    name: 'Screenshot to Text (OCR)',
    desc: 'OCR screenshots to copyable text, TXT, or Markdown',
    seoSlug: 'screenshot-to-text-ocr',
    accept: 'image/*',
    maxMb: 6,
  },
];

export const PDF_UTILITY_TOOL_SLUGS = pdfUtilityTools.map((t) => t.slug);

export function getPdfUtilityTool(slug) {
  return pdfUtilityTools.find((t) => t.slug === slug) || null;
}
