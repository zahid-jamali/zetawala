/**
 * Flat category nav — every active suite on the first screen.
 * Hover a category → all of its tools. Search indexes the same list.
 */

import {
  Video,
  ShoppingBag,
  MessageCircle,
  Search,
  Calculator,
  FileStack,
  PenLine,
  BookOpen,
  Briefcase,
  Store,
} from 'lucide-react';
import { navigationConfig } from './navigation';
import { getSeoPath } from './routes';

function activeTools(categorySlug) {
  const cat = navigationConfig.find((c) => c.slug === categorySlug);
  return cat ? cat.tools.filter((t) => t.isActive) : [];
}

function firstToolHref(routeKey, categorySlug) {
  const tools = activeTools(categorySlug);
  if (!tools.length) return '/';
  return getSeoPath(routeKey, tools[0].slug);
}

/** Short labels so every category fits on the first screen. */
export const NAV_CATEGORIES = [
  {
    id: 'youtube',
    label: 'YouTube',
    desc: 'Niche research, monetization & content pipeline',
    icon: Video,
    accent: 'text-red-500',
    routeKey: 'youtube',
    categorySlug: 'youtube-automation',
    hubHref: firstToolHref('youtube', 'youtube-automation'),
    tools: activeTools('youtube-automation'),
  },
  {
    id: 'daraz',
    label: 'Daraz',
    desc: 'Product hunting, listings & profit math',
    icon: ShoppingBag,
    accent: 'text-orange-500',
    routeKey: 'daraz',
    categorySlug: 'daraz-seo',
    hubHref: firstToolHref('daraz', 'daraz-seo'),
    tools: activeTools('daraz-seo'),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    desc: 'Broadcasts, ads & local seller copy',
    icon: MessageCircle,
    accent: 'text-emerald-500',
    routeKey: 'local-commerce',
    categorySlug: 'local-social-commerce',
    hubHref: firstToolHref('local-commerce', 'local-social-commerce'),
    tools: activeTools('local-social-commerce'),
  },
  {
    id: 'shopee',
    label: 'Shopee',
    desc: 'Listing SEO, fees, shipping & chat replies',
    icon: Store,
    accent: 'text-orange-500',
    routeKey: 'shopee',
    categorySlug: 'shopee-seller',
    hubHref: '/shopee',
    tools: activeTools('shopee-seller'),
  },
  {
    id: 'lazada',
    label: 'Lazada',
    desc: 'Titles, keywords, margins & optimizer',
    icon: Store,
    accent: 'text-blue-500',
    routeKey: 'lazada',
    categorySlug: 'lazada-seller',
    hubHref: '/lazada',
    tools: activeTools('lazada-seller'),
  },
  {
    id: 'writing',
    label: 'Writing',
    desc: 'Humanizer, grammar, Urdu & rewrite',
    icon: PenLine,
    accent: 'text-indigo-500',
    routeKey: 'writing',
    categorySlug: 'ai-writing',
    hubHref: '/writing',
    tools: activeTools('ai-writing'),
  },
  {
    id: 'study',
    label: 'Study',
    desc: 'Notes, quizzes, flashcards & typing',
    icon: BookOpen,
    accent: 'text-sky-500',
    routeKey: 'study',
    categorySlug: 'ai-study',
    hubHref: '/study',
    tools: activeTools('ai-study'),
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    desc: 'Upwork & Fiverr proposals, gigs & rates',
    icon: Briefcase,
    accent: 'text-emerald-500',
    routeKey: 'freelancer',
    categorySlug: 'freelancer-toolkit',
    hubHref: '/freelancer',
    tools: activeTools('freelancer-toolkit'),
  },
  {
    id: 'seo',
    label: 'SEO',
    desc: 'Audits, PageSpeed, sitemaps & ROI',
    icon: Search,
    accent: 'text-sky-500',
    routeKey: 'seo',
    categorySlug: 'seo-webmaster',
    hubHref: '/seo',
    tools: activeTools('seo-webmaster'),
  },
  {
    id: 'calculators',
    label: 'Calculators',
    desc: 'Freelance rates, LTV, ads & margins',
    icon: Calculator,
    accent: 'text-violet-500',
    routeKey: 'calculators',
    categorySlug: 'calculators',
    hubHref: '/calculators',
    tools: activeTools('calculators'),
  },
  {
    id: 'pdf',
    label: 'PDF',
    desc: 'Extract, convert, EXIF & OCR',
    icon: FileStack,
    accent: 'text-teal-500',
    routeKey: 'pdf-utilities',
    categorySlug: 'pdf-image-utilities',
    hubHref: '/pdf-utilities',
    tools: activeTools('pdf-image-utilities'),
  },
];

/** Flat index for the tool search bar. */
export function getSearchableTools() {
  return NAV_CATEGORIES.flatMap((cat) =>
    cat.tools.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      desc: tool.desc,
      href: getSeoPath(cat.routeKey, tool.slug),
      categoryId: cat.id,
      categoryLabel: cat.label,
    }))
  );
}

export function searchTools(query, limit = 12) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = [];

  for (const tool of getSearchableTools()) {
    const hay = `${tool.name} ${tool.desc} ${tool.categoryLabel} ${tool.slug}`.toLowerCase();
    if (!tokens.every((t) => hay.includes(t))) continue;
    let score = 0;
    if (tool.name.toLowerCase().startsWith(q)) score += 40;
    if (tool.name.toLowerCase().includes(q)) score += 20;
    if (tool.categoryLabel.toLowerCase().includes(q)) score += 10;
    if (tool.slug.includes(q.replace(/\s+/g, '-'))) score += 8;
    scored.push({ tool, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit)
    .map((s) => s.tool);
}
