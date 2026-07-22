/**
 * SEO & Webmaster Intelligence — tool registry (exactly 17 tools).
 * Do NOT add Keyword Finder, Keyword Opportunity Analyzer, Backlink Checker, or Backlink Analyzer.
 */

export const SEO_CATEGORY_SLUG = 'seo-webmaster';
export const SEO_FOLDER = 'seo';

export const seoTools = [
  {
    slug: 'website-checker',
    name: 'SEO Website Checker',
    desc: 'Technical & on-page audit with scores and fixes',
    seoSlug: 'seo-website-checker',
    mode: 'url',
    apiAction: 'website-checker',
  },
  {
    slug: 'content-audit',
    name: 'SEO Content Audit',
    desc: 'Page content, headings, links & readability signals',
    seoSlug: 'seo-content-audit',
    mode: 'url',
    apiAction: 'content-audit',
  },
  {
    slug: 'title-meta-analyzer',
    name: 'SEO Title & Meta Description Analyzer',
    desc: 'Find missing, duplicate & weak titles/descriptions',
    seoSlug: 'seo-title-meta-description-analyzer',
    mode: 'url',
    apiAction: 'title-meta-analyzer',
  },
  {
    slug: 'pagespeed-analyzer',
    name: 'PageSpeed & Core Web Vitals Analyzer',
    desc: 'Google PSI performance, CWV & opportunities',
    seoSlug: 'pagespeed-core-web-vitals-analyzer',
    mode: 'pagespeed',
    apiAction: 'pagespeed-analyzer',
  },
  {
    slug: 'internal-link-analyzer',
    name: 'Internal Link & Orphan Page Analyzer',
    desc: 'Map internal links, weak anchors & orphans',
    seoSlug: 'internal-link-orphan-page-analyzer',
    mode: 'url',
    apiAction: 'internal-link-analyzer',
  },
  {
    slug: 'broken-link-checker',
    name: 'Broken Link Checker',
    desc: 'Find broken internal & external links',
    seoSlug: 'broken-link-checker',
    mode: 'url',
    apiAction: 'broken-link-checker',
  },
  {
    slug: 'sitemap-tool',
    name: 'Sitemap Generator & Validator',
    desc: 'Generate XML sitemaps or validate existing ones',
    seoSlug: 'sitemap-generator-validator',
    mode: 'sitemap',
    apiAction: 'sitemap-tool',
  },
  {
    slug: 'canonical-indexability',
    name: 'Canonical & Indexability Checker',
    desc: 'Canonical, robots, noindex & HTTP index signals',
    seoSlug: 'canonical-indexability-checker',
    mode: 'url',
    apiAction: 'canonical-indexability',
  },
  {
    slug: 'action-plan',
    name: 'SEO Action Plan Generator',
    desc: 'Prioritized beginner-friendly SEO roadmap',
    seoSlug: 'seo-action-plan-generator',
    mode: 'url',
    apiAction: 'action-plan',
  },
  {
    slug: 'robots-txt-tool',
    name: 'Robots.txt Generator & Tester',
    desc: 'Generate robots.txt and test crawl rules',
    seoSlug: 'robots-txt-generator-tester',
    mode: 'robots',
    apiAction: 'robots-txt-tool',
  },
  {
    slug: 'header-meta-inspector',
    name: 'SEO Header & Meta Tags Inspector',
    desc: 'Inspect title, OG, Twitter, canonical & more',
    seoSlug: 'seo-header-meta-tags-inspector',
    mode: 'url',
    apiAction: 'header-meta-inspector',
  },
  {
    slug: 'traffic-revenue',
    name: 'SEO Traffic & Ad Revenue Estimator',
    desc: 'Estimate traffic value with labeled assumptions',
    seoSlug: 'seo-traffic-ad-revenue-estimator',
    mode: 'traffic',
    apiAction: 'traffic-revenue',
  },
  {
    slug: 'health-score',
    name: 'SEO Health Score Calculator',
    desc: 'Overall SEO health with category breakdowns',
    seoSlug: 'seo-health-score-calculator',
    mode: 'url',
    apiAction: 'health-score',
  },
  {
    slug: 'keyword-density',
    name: 'Keyword Density Checker',
    desc: '1–3 word phrase frequency from URL or text',
    seoSlug: 'keyword-density-checker',
    mode: 'density',
    apiAction: 'keyword-density',
  },
  {
    slug: 'seo-roi',
    name: 'SEO ROI Calculator',
    desc: 'Estimate SEO return from traffic & conversions',
    seoSlug: 'seo-roi-calculator',
    mode: 'seo-roi',
    apiAction: 'seo-roi',
  },
  {
    slug: 'keyword-roi',
    name: 'Keyword ROI Calculator',
    desc: 'Estimate keyword traffic, leads & revenue',
    seoSlug: 'keyword-roi-calculator',
    mode: 'keyword-roi',
    apiAction: 'keyword-roi',
  },
  {
    slug: 'content-roi',
    name: 'Content ROI Calculator',
    desc: 'Estimate content marketing ROI from costs & traffic',
    seoSlug: 'content-roi-calculator',
    mode: 'content-roi',
    apiAction: 'content-roi',
  },
];

export const SEO_TOOL_SLUGS = seoTools.map((t) => t.slug);

export function getSeoTool(slug) {
  return seoTools.find((t) => t.slug === slug) || null;
}
