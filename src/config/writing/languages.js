/**
 * Multilingual writing SEO — separate URLs per language for indexable pages.
 * Base URLs stay as hubs; -english / -spanish / -urdu are additive.
 */

import { writingTools, LANG_LABELS } from './tools';

export const LANG_SEO_SUFFIX = {
  en: 'english',
  es: 'spanish',
  ur: 'urdu',
};

export const LANG_OG_LOCALE = {
  en: 'en_US',
  es: 'es_ES',
  ur: 'ur_PK',
};

const SUFFIX_TO_CODE = Object.fromEntries(
  Object.entries(LANG_SEO_SUFFIX).map(([code, suffix]) => [suffix, code])
);

export function getWritingLangSeoSlug(baseSeoSlug, langCode) {
  const suffix = LANG_SEO_SUFFIX[langCode];
  if (!suffix) return baseSeoSlug;
  return `${baseSeoSlug}-${suffix}`;
}

export function getWritingLangPath(baseSeoSlug, langCode) {
  return `/tools/writing/${getWritingLangSeoSlug(baseSeoSlug, langCode)}`;
}

/** Tools that expose language-specific SEO pages. */
export function getMultilingualWritingTools() {
  return writingTools.filter((t) => Array.isArray(t.languages) && t.languages.length > 1);
}

/**
 * Parse a public writing URL slug into tool + optional language.
 * @returns {{ internalSlug: string, language: string|null, baseSeoSlug: string, publicSeoSlug: string } | null}
 */
export function parseWritingToolSlug(seoSlug) {
  const raw = String(seoSlug || '').trim();
  if (!raw) return null;

  for (const [suffix, code] of Object.entries(SUFFIX_TO_CODE)) {
    const ending = `-${suffix}`;
    if (!raw.endsWith(ending)) continue;
    const base = raw.slice(0, -ending.length);
    const tool = writingTools.find((t) => t.seoSlug === base || t.slug === base);
    if (tool?.languages?.includes(code)) {
      return {
        internalSlug: tool.slug,
        language: code,
        baseSeoSlug: tool.seoSlug,
        publicSeoSlug: raw,
      };
    }
  }

  const tool = writingTools.find((t) => t.seoSlug === raw || t.slug === raw);
  if (!tool) return null;
  return {
    internalSlug: tool.slug,
    language: null,
    baseSeoSlug: tool.seoSlug,
    publicSeoSlug: tool.seoSlug,
  };
}

/** All language-variant public slugs (for folder detection / sitemap). */
export function listWritingLangSeoSlugs() {
  const out = [];
  for (const tool of getMultilingualWritingTools()) {
    for (const lang of tool.languages) {
      out.push(getWritingLangSeoSlug(tool.seoSlug, lang));
    }
  }
  return out;
}

export function listWritingLangSitemapPaths() {
  return listWritingLangSeoSlugs().map((slug) => `/tools/writing/${slug}`);
}

const TOOL_VERB = {
  'ai-humanizer': {
    en: { action: 'Humanize AI text in English', noun: 'AI Humanizer in English' },
    es: { action: 'Humanize AI text in Spanish', noun: 'AI Humanizer in Spanish' },
    ur: { action: 'Humanize AI text in Urdu', noun: 'AI Humanizer in Urdu' },
  },
  'ai-content-detector': {
    en: { action: 'Detect AI writing in English', noun: 'AI Content Detector for English' },
    es: { action: 'Detect AI writing in Spanish', noun: 'AI Content Detector for Spanish' },
    ur: { action: 'Detect AI writing in Urdu', noun: 'AI Content Detector for Urdu' },
  },
  'plagiarism-checker': {
    en: { action: 'Check English document similarity', noun: 'Plagiarism Checker for English' },
    es: { action: 'Check Spanish document similarity', noun: 'Plagiarism Checker for Spanish' },
    ur: { action: 'Check Urdu document similarity', noun: 'Plagiarism Checker for Urdu' },
  },
  'grammar-checker': {
    en: { action: 'Fix English grammar & spelling', noun: 'English Grammar Checker' },
    es: { action: 'Fix Spanish grammar & spelling', noun: 'Spanish Grammar Checker' },
    ur: { action: 'Fix Urdu grammar & spelling', noun: 'Urdu Grammar Checker' },
  },
  'paraphrasing-tool': {
    en: { action: 'Paraphrase English text', noun: 'English Paraphrasing Tool' },
    es: { action: 'Paraphrase Spanish text', noun: 'Spanish Paraphrasing Tool' },
    ur: { action: 'Paraphrase Urdu text', noun: 'Urdu Paraphrasing Tool' },
  },
  'ai-text-summarizer': {
    en: { action: 'Summarize English text', noun: 'English AI Text Summarizer' },
    es: { action: 'Summarize Spanish text', noun: 'Spanish AI Text Summarizer' },
    ur: { action: 'Summarize Urdu text', noun: 'Urdu AI Text Summarizer' },
  },
  'ai-rewrite-tool': {
    en: { action: 'Rewrite English copy', noun: 'English AI Rewrite Tool' },
    es: { action: 'Rewrite Spanish copy', noun: 'Spanish AI Rewrite Tool' },
    ur: { action: 'Rewrite Urdu copy', noun: 'Urdu AI Rewrite Tool' },
  },
};

/**
 * Metadata + hreflang for a writing tool page (base or language variant).
 */
export function getWritingPageSeo(publicSeoSlug) {
  const parsed = parseWritingToolSlug(publicSeoSlug);
  if (!parsed) return null;

  const tool = writingTools.find((t) => t.slug === parsed.internalSlug);
  if (!tool) return null;

  const SITE = 'https://www.zetawala.com';
  const basePath = `/tools/writing/${parsed.baseSeoSlug}`;
  const path = `/tools/writing/${parsed.publicSeoSlug}`;
  const langLabel = parsed.language ? LANG_LABELS[parsed.language] : null;
  const verb = parsed.language ? TOOL_VERB[tool.slug]?.[parsed.language] : null;

  const title = parsed.language
    ? `Free ${verb?.noun || `${tool.name} – ${langLabel}`} | Zetawala`
    : null; // fall back to toolMetadata

  const description = parsed.language
    ? `${verb?.action || tool.name} free with DeepSeek on Zetawala. Optimized for ${langLabel} writing—paste your draft and get clear, natural results. No signup required.`
    : null;

  const keywords = parsed.language
    ? [
        `${tool.name.toLowerCase()} ${langLabel.toLowerCase()}`,
        `${langLabel.toLowerCase()} ${tool.slug.replace(/-/g, ' ')}`,
        `free ${tool.slug.replace(/-/g, ' ')} ${langLabel.toLowerCase()}`,
        `${langLabel.toLowerCase()} ai writing tool`,
        `deepseek ${tool.slug}`,
        tool.name.toLowerCase(),
        langLabel.toLowerCase(),
      ]
    : null;

  const languages = {};
  languages['x-default'] = `${SITE}${basePath}`;
  if (tool.languages?.length) {
    for (const code of tool.languages) {
      languages[code] = `${SITE}${getWritingLangPath(parsed.baseSeoSlug, code)}`;
    }
  }

  return {
    parsed,
    tool,
    path,
    canonicalUrl: `${SITE}${path}`,
    title,
    description,
    keywords,
    locale: parsed.language ? LANG_OG_LOCALE[parsed.language] : 'en_US',
    alternates: {
      canonical: `${SITE}${path}`,
      languages,
    },
  };
}
