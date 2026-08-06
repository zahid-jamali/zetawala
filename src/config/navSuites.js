/**
 * Desktop/mobile nav structure — hubs first, tools on demand.
 * Keeps the top bar lean as categories grow.
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

function activeTools(categorySlug) {
  const cat = navigationConfig.find((c) => c.slug === categorySlug);
  return cat ? cat.tools.filter((t) => t.isActive) : [];
}

/** Top-level desktop groups (no Blog / Coming Soon clutter). */
export const NAV_GROUPS = [
  {
    id: 'youtube',
    label: 'YouTube',
    kind: 'tools',
    icon: Video,
    accent: 'text-red-500',
    tagline: 'Niche research, monetization & content pipeline',
    routeKey: 'youtube',
    categorySlug: 'youtube-automation',
    hubHref: null,
    tools: activeTools('youtube-automation'),
  },
  {
    id: 'marketplaces',
    label: 'Marketplaces',
    kind: 'suites',
    tagline: 'Sell on Daraz, WhatsApp, Shopee & Lazada',
    suites: [
      {
        label: 'Daraz SEO',
        desc: 'Product hunting, listings & profit math',
        icon: ShoppingBag,
        accent: 'text-orange-500',
        hubHref: '/tools/daraz/daraz-product-hunting',
        routeKey: 'daraz',
        categorySlug: 'daraz-seo',
        tools: activeTools('daraz-seo').slice(0, 4),
      },
      {
        label: 'WhatsApp Commerce',
        desc: 'Broadcasts, ads & local seller copy',
        icon: MessageCircle,
        accent: 'text-emerald-500',
        hubHref: '/tools/local-commerce/whatsapp-broadcast-status-copywriter',
        routeKey: 'local-commerce',
        categorySlug: 'local-social-commerce',
        tools: activeTools('local-social-commerce').slice(0, 4),
      },
      {
        label: 'Shopee Seller',
        desc: 'Listing SEO, fees, shipping & chat replies',
        icon: Store,
        accent: 'text-orange-500',
        hubHref: '/shopee',
        routeKey: 'shopee',
        categorySlug: 'shopee-seller',
        tools: activeTools('shopee-seller').slice(0, 4),
      },
      {
        label: 'Lazada Seller',
        desc: 'Titles, keywords, margins & optimizer',
        icon: Store,
        accent: 'text-blue-500',
        hubHref: '/lazada',
        routeKey: 'lazada',
        categorySlug: 'lazada-seller',
        tools: activeTools('lazada-seller').slice(0, 4),
      },
    ],
  },
  {
    id: 'creator',
    label: 'Creator',
    kind: 'suites',
    tagline: 'Writing, study & freelancer growth',
    suites: [
      {
        label: 'AI Writing',
        desc: 'Humanizer, grammar, Urdu & rewrite',
        icon: PenLine,
        accent: 'text-indigo-500',
        hubHref: '/writing',
        routeKey: 'writing',
        categorySlug: 'ai-writing',
        tools: activeTools('ai-writing').slice(0, 4),
      },
      {
        label: 'AI Study',
        desc: 'Notes, quizzes, flashcards & typing',
        icon: BookOpen,
        accent: 'text-sky-500',
        hubHref: '/study',
        routeKey: 'study',
        categorySlug: 'ai-study',
        tools: activeTools('ai-study').slice(0, 4),
      },
      {
        label: 'Freelancer',
        desc: 'Upwork & Fiverr proposals, gigs & rates',
        icon: Briefcase,
        accent: 'text-emerald-500',
        hubHref: '/freelancer',
        routeKey: 'freelancer',
        categorySlug: 'freelancer-toolkit',
        tools: activeTools('freelancer-toolkit').slice(0, 4),
      },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    kind: 'suites',
    tagline: 'SEO audits, pricing math & file utilities',
    suites: [
      {
        label: 'SEO & Webmaster',
        desc: 'Audits, PageSpeed, sitemaps & ROI',
        icon: Search,
        accent: 'text-sky-500',
        hubHref: '/seo',
        routeKey: 'seo',
        categorySlug: 'seo-webmaster',
        tools: activeTools('seo-webmaster').slice(0, 4),
      },
      {
        label: 'Calculators',
        desc: 'Freelance rates, LTV, ads & margins',
        icon: Calculator,
        accent: 'text-violet-500',
        hubHref: '/calculators',
        routeKey: 'calculators',
        categorySlug: 'calculators',
        tools: activeTools('calculators').slice(0, 4),
      },
      {
        label: 'PDF & Images',
        desc: 'Extract, convert, EXIF & OCR',
        icon: FileStack,
        accent: 'text-teal-500',
        hubHref: '/pdf-utilities',
        routeKey: 'pdf-utilities',
        categorySlug: 'pdf-image-utilities',
        tools: activeTools('pdf-image-utilities').slice(0, 4),
      },
    ],
  },
];
