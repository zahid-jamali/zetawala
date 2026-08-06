import BlogListingClient from '../../../components/blog/BlogListingClient';

export const metadata = {
  title: 'PDF & Image Utility Guides | ZetaWala Blog',
  description:
    'Read ZetaWala guides on PDF conversion, table extraction, Excel transforms, EXIF privacy, image color palettes, social resizing, and OCR.',
  alternates: {
    canonical: 'https://zetawala.com/blog/pdf-utilities',
  },
  openGraph: {
    title: 'PDF & Image Utility Guides',
    description:
      'PDF conversion, Excel transforms, EXIF privacy, social resizing, and OCR guides from ZetaWala.',
    url: 'https://zetawala.com/blog/pdf-utilities',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF & Image Utility Guides',
    description:
      'PDF conversion, Excel transforms, EXIF privacy, social resizing, and OCR guides from ZetaWala.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PdfUtilitiesBlogPage() {
  return (
    <BlogListingClient
      category="pdf-utilities"
      heroTitle="PDF & Image Utility Guides"
      heroDescription="Convert PDFs, transform spreadsheets, protect image privacy, resize for social, and extract text with OCR—practical playbooks for creators and teams."
    />
  );
}
