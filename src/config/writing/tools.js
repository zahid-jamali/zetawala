/**
 * AI Writing & Language Tools — registry (10 tools).
 * All AI actions reuse /api/generate → DeepSeek.
 */

export const WRITING_CATEGORY_SLUG = 'ai-writing';
export const WRITING_FOLDER = 'writing';

export const writingTools = [
  {
    slug: 'ai-humanizer',
    name: 'AI Humanizer',
    desc: 'Rewrite AI text to sound natural in English, Spanish, or Urdu',
    seoSlug: 'ai-humanizer',
    languages: ['en', 'es', 'ur'],
  },
  {
    slug: 'ai-content-detector',
    name: 'AI Content Detector',
    desc: 'Estimate AI vs human writing with sentence-level signals',
    seoSlug: 'ai-content-detector',
    languages: ['en', 'es', 'ur'],
  },
  {
    slug: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    desc: 'Local similarity analysis for pasted or uploaded documents',
    seoSlug: 'plagiarism-checker',
    languages: ['en', 'es', 'ur'],
    supportsUpload: true,
  },
  {
    slug: 'grammar-checker',
    name: 'Grammar Checker',
    desc: 'Grammar, spelling, punctuation, and style suggestions',
    seoSlug: 'grammar-checker',
    languages: ['en', 'es', 'ur'],
  },
  {
    slug: 'paraphrasing-tool',
    name: 'Paraphrasing Tool',
    desc: 'Rewrite text in standard, fluency, formal, creative, or academic modes',
    seoSlug: 'paraphrasing-tool',
    languages: ['en', 'es', 'ur'],
    modes: ['standard', 'fluency', 'formal', 'creative', 'academic'],
  },
  {
    slug: 'roman-urdu-to-urdu',
    name: 'Roman Urdu → Urdu Converter',
    desc: 'Convert Roman Urdu to proper Urdu script',
    seoSlug: 'roman-urdu-to-urdu-converter',
  },
  {
    slug: 'urdu-to-roman-urdu',
    name: 'Urdu → Roman Urdu Converter',
    desc: 'Transliterate Urdu script into Roman Urdu',
    seoSlug: 'urdu-to-roman-urdu-converter',
    styles: ['standard', 'phonetic', 'casual'],
  },
  {
    slug: 'roman-urdu-grammar',
    name: 'Roman Urdu Grammar & Spell Checker',
    desc: 'Fix Roman Urdu spelling and grammar with side-by-side compare',
    seoSlug: 'roman-urdu-grammar-spell-checker',
  },
  {
    slug: 'ai-text-summarizer',
    name: 'AI Text Summarizer',
    desc: 'Short, bullet, and key-point summaries in multiple languages',
    seoSlug: 'ai-text-summarizer',
    languages: ['en', 'es', 'ur'],
    lengths: ['short', 'medium', 'detailed'],
  },
  {
    slug: 'ai-rewrite-tool',
    name: 'AI Rewrite Tool',
    desc: 'Rewrite shorter, longer, professional, friendly, or SEO-focused',
    seoSlug: 'ai-rewrite-tool',
    languages: ['en', 'es', 'ur'],
    modes: ['shorter', 'longer', 'professional', 'friendly', 'seo'],
  },
];

export const WRITING_TOOL_SLUGS = writingTools.map((t) => t.slug);

export function getWritingTool(slug) {
  return writingTools.find((t) => t.slug === slug) || null;
}

export const LANG_LABELS = {
  en: 'English',
  es: 'Spanish',
  ur: 'Urdu',
};
