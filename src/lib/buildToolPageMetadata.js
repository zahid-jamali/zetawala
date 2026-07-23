/**
 * Build complete Next.js Metadata for a tool page.
 * Always sets a tool-specific canonical + Open Graph URL so pages never inherit
 * the homepage canonical/og:url from root layout.
 */

import { toolMetadata } from '../config/toolMetadata';
import { getSeoPath } from '../config/routes';

const SITE = 'https://zetawala.com';
const OG_IMAGE = '/opengraph-image.png';

/**
 * @param {object} opts
 * @param {string} opts.internalSlug - internal tool key (e.g. title-generator)
 * @param {string} opts.category - route category key (youtube | daraz | local-commerce | seo)
 * @param {string} opts.fallbackTitle
 * @param {string} opts.fallbackDescription
 */
export function buildToolPageMetadata({
  internalSlug,
  category,
  fallbackTitle,
  fallbackDescription,
}) {
  const meta = toolMetadata[internalSlug] || {};
  const path = getSeoPath(category, internalSlug);
  const canonicalUrl = `${SITE}${path}`;
  const title = meta.title || fallbackTitle;
  const description = meta.description || fallbackDescription;
  const keywords = meta.keywords || [];

  const known = Boolean(meta.title);

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Zetawala' }],
    creator: 'Zetawala',
    publisher: 'Zetawala',
    category: 'Technology',
    applicationName: 'Zetawala',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Zetawala',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: known
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: true },
  };
}
