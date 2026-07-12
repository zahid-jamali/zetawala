import React from 'react';
import HeroShowcase from '../components/sections/HeroShowcase';
import PipelineFlowShowcase from '../components/sections/PipelineFlowShowcase';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import TrustAnalytics from '../components/sections/TrustAnalytics';
import FAQSection from '../components/sections/FAQSection';

export const metadata = {
  title: 'ZetaWala | E-Commerce SEO & Video Automation Systems',
  description: 'Boost watch time and shop sales. Leverage optimized pipelines to hunt profitable products, extract Roman Urdu search volume tags, and write video script hooks.',
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
