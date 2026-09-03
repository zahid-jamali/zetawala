import { notFound, redirect } from 'next/navigation';
import {
  Search,
  PenLine,
  BookOpen,
  Briefcase,
  Store,
  FileStack,
} from 'lucide-react';
import PipelineWorkspace from '../../../components/dashboard/PipelineWorkspace';
import LocalizedHome from '../../../components/i18n/LocalizedHome';
import LocalizedCalculatorsHub from '../../../components/i18n/LocalizedCalculatorsHub';
import LocalizedSuiteHub from '../../../components/i18n/LocalizedSuiteHub';
import LocalizedLegalPage from '../../../components/i18n/LocalizedLegalPage';
import LocalizedContact from '../../../components/i18n/LocalizedContact';
import BlogListingClient from '../../../components/blog/BlogListingClient';
import { isPrefixLocale } from '../../../i18n/config';
import { getToolLocalization } from '../../../i18n/catalog';
import { getDictionary, getToolDictionary } from '../../../i18n/dictionary';
import { buildLocalizedPageMetadata, buildLocalizedToolMetadata } from '../../../i18n/metadata';
import { absoluteUrl, getHomePath, getLocalizedToolPath } from '../../../i18n/paths';
import { getEnglishBlogFallbackPath, listLocaleStaticParams, resolveLocalePath } from '../../../i18n/resolve';

export const dynamicParams = true;

export function generateStaticParams() {
  return listLocaleStaticParams();
}

const SUITE_ICONS = {
  seo: Search,
  writing: PenLine,
  study: BookOpen,
  freelancer: Briefcase,
  'freelancer-upwork': Briefcase,
  'freelancer-fiverr': Briefcase,
  shopee: Store,
  lazada: Store,
  'pdf-utilities': FileStack,
};

const SUITE_PAGES = new Set(Object.keys(SUITE_ICONS));
const LEGAL_PAGES = new Set(['privacy-policy', 'terms', 'cookies']);

async function loadToolNames(locale) {
  const pack = await getDictionary(locale, 'tool-copy');
  const names = {};
  for (const [slug, overlay] of Object.entries(pack || {})) {
    if (!overlay?.name) continue;
    names[slug] = { name: overlay.name, desc: overlay.desc || '' };
  }
  return names;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (getEnglishBlogFallbackPath(locale, slug)) {
    return { robots: { index: false, follow: false } };
  }
  const resolved = resolveLocalePath(locale, slug);
  if (!resolved) return { robots: { index: false, follow: false } };

  if (resolved.type === 'home') {
    const dict = await getDictionary(locale, 'home');
    return buildLocalizedPageMetadata({
      locale,
      pageId: 'home',
      dict,
      fallbackTitle: 'Zetawala',
      fallbackDescription: 'Free AI tools and business calculators.',
    });
  }

  if (resolved.type === 'page') {
    const namespace =
      resolved.pageId === 'calculators'
        ? 'calculators-hub'
        : resolved.pageId === 'contact'
          ? 'contact'
          : LEGAL_PAGES.has(resolved.pageId)
            ? `legal-${resolved.pageId}`
            : resolved.pageId === 'blog'
              ? 'blog'
              : `hub-${resolved.pageId}`;
    const dict = await getDictionary(locale, namespace);
    return buildLocalizedPageMetadata({
      locale,
      pageId: resolved.pageId,
      dict,
      fallbackTitle: dict.title || dict.hero?.title || 'Zetawala',
      fallbackDescription: dict.description || dict.hero?.subtitle || '',
    });
  }

  if (resolved.type === 'tool') {
    const dict = await getToolDictionary(locale, resolved.internalSlug);
    return buildLocalizedToolMetadata({
      locale,
      internalSlug: resolved.internalSlug,
      dict,
      fallbackTitle: dict.metadata?.title || dict.name || 'Zetawala',
      fallbackDescription: dict.metadata?.description || dict.desc || '',
    });
  }

  return { robots: { index: false, follow: false } };
}

function BreadcrumbJsonLd({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function LocaleCatchAllPage({ params }) {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) notFound();

  const blogFallback = getEnglishBlogFallbackPath(locale, slug);
  if (blogFallback) redirect(blogFallback);

  const resolved = resolveLocalePath(locale, slug);
  if (!resolved) notFound();

  if (resolved.type === 'home') {
    const dict = await getDictionary(locale, 'home');
    const toolNames = await loadToolNames(locale);
    return <LocalizedHome locale={locale} dict={dict} toolNames={toolNames} />;
  }

  if (resolved.type === 'page' && resolved.pageId === 'calculators') {
    const dict = await getDictionary(locale, 'calculators-hub');
    const toolNames = await loadToolNames(locale);
    return <LocalizedCalculatorsHub locale={locale} dict={dict} toolNames={toolNames} />;
  }

  if (resolved.type === 'page' && resolved.pageId === 'contact') {
    const dict = await getDictionary(locale, 'contact');
    return <LocalizedContact locale={locale} dict={dict} />;
  }

  if (resolved.type === 'page' && resolved.pageId === 'blog') {
    const dict = await getDictionary(locale, 'blog');
    return <BlogListingClient heroTitle={dict.heroTitle} heroDescription={dict.heroDescription} />;
  }

  if (resolved.type === 'page' && LEGAL_PAGES.has(resolved.pageId)) {
    const dict = await getDictionary(locale, `legal-${resolved.pageId}`);
    return <LocalizedLegalPage locale={locale} dict={dict} />;
  }

  if (resolved.type === 'page' && SUITE_PAGES.has(resolved.pageId)) {
    const dict = await getDictionary(locale, `hub-${resolved.pageId}`);
    const toolNames = await loadToolNames(locale);
    const Icon = SUITE_ICONS[resolved.pageId];
    return <LocalizedSuiteHub locale={locale} pageId={resolved.pageId} dict={dict} toolNames={toolNames} Icon={Icon} />;
  }

  if (resolved.type === 'tool') {
    const dict = await getToolDictionary(locale, resolved.internalSlug);
    const loc = getToolLocalization(resolved.internalSlug);
    return (
      <>
        <BreadcrumbJsonLd
          items={[
            { name: 'Zetawala', url: absoluteUrl(getHomePath(locale)) },
            { name: dict.name || resolved.internalSlug, url: absoluteUrl(getLocalizedToolPath(locale, resolved.category, resolved.internalSlug)) },
          ]}
        />
        <PipelineWorkspace
          toolSlug={resolved.internalSlug}
          categorySlug={resolved.categorySlug || loc?.categorySlug || 'calculators'}
          locale={locale}
          toolCopy={dict}
        />
      </>
    );
  }

  notFound();
}
