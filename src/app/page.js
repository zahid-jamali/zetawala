import React from 'react';
import HeroShowcase from '../components/sections/HeroShowcase';
import PipelineFlowShowcase from '../components/sections/PipelineFlowShowcase';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import TrustAnalytics from '../components/sections/TrustAnalytics';
import FAQSection from '../components/sections/FAQSection';
import { getPageHreflangLanguages } from '../i18n/hreflang';

export const metadata = {
  title: 'Free AI YouTube, Daraz, WhatsApp & SEO Tools | Zetawala',
  description:
    'Zetawala offers free AI tools for YouTube automation, Daraz SEO, WhatsApp social commerce, and SEO webmaster audits—titles, scripts, niche research, PageSpeed, and more.',
  alternates: {
    canonical: 'https://zetawala.com/',
    languages: getPageHreflangLanguages('home'),
  },
  openGraph: {
    title: 'Free AI YouTube, Daraz, WhatsApp & SEO Tools | Zetawala',
    description:
      'Free AI tools for YouTube creators, Daraz sellers, WhatsApp marketers, and website owners—research, audit, and create faster with Zetawala.',
    url: 'https://zetawala.com/',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI YouTube, Daraz, WhatsApp & SEO Tools | Zetawala',
    description:
      'YouTube automation, Daraz SEO, WhatsApp commerce, and SEO webmaster tools—free on Zetawala.',
  },
};

export default function HomePage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* 1. Hero Showcase and Dashboard Mockups */}
      <HeroShowcase />

      {/* 2. Interactive Flow Switcher / Tabbed Pipeline Map */}
      <PipelineFlowShowcase />

      {/* 3. Suite Portfolio Grid Cards & Brand Pillars */}
      <FeaturesGrid />

      {/* 5. Trust Performance Metrics */}
      <TrustAnalytics />

      {/* 6. Dynamic SEO Q&A Section Accordion */}
      <FAQSection />

    </div>
  );
}
