import { getLocaleMeta } from './config.js';
import { getPageHreflangLanguages, getToolHreflangLanguages } from './hreflang.js';
import { absoluteUrl, getCatalogToolPath, getLocalizedPagePath } from './urls.js';

const OG_IMAGE = '/opengraph-image.png';

const indexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

function baseFields({ title, description, keywords, canonicalUrl, locale, languages }) {
  const meta = getLocaleMeta(locale);
  return {
    title,
    description,
    keywords: keywords || [],
    authors: [{ name: 'Zetawala' }],
    creator: 'Zetawala',
    publisher: 'Zetawala',
    category: 'Technology',
    applicationName: 'Zetawala',
    alternates: {
      canonical: canonicalUrl,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Zetawala',
      locale: meta.ogLocale,
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
    robots: indexableRobots,
  };
}

export function buildLocalizedToolMetadata({
  locale,
  internalSlug,
  dict,
  fallbackTitle,
  fallbackDescription,
}) {
  const meta = dict?.metadata || {};
  const path = getCatalogToolPath(locale, internalSlug);
  const canonicalUrl = absoluteUrl(path || '/');
  const languages = getToolHreflangLanguages(internalSlug);

  return baseFields({
    title: meta.title || fallbackTitle,
    description: meta.description || fallbackDescription,
    keywords: meta.keywords || [],
    canonicalUrl,
    locale,
    languages,
  });
}

export function buildLocalizedPageMetadata({ locale, pageId, dict, fallbackTitle, fallbackDescription }) {
  const meta = dict?.metadata || {};
  const path = getLocalizedPagePath(locale, pageId);
  const canonicalUrl = absoluteUrl(path);
  const languages = getPageHreflangLanguages(pageId);

  return baseFields({
    title: meta.title || fallbackTitle,
    description: meta.description || fallbackDescription,
    keywords: meta.keywords || [],
    canonicalUrl,
    locale,
    languages,
  });
}

export function withHreflang(metadata, languages) {
  if (!languages) return metadata;
  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates || {}),
      languages,
    },
  };
}
