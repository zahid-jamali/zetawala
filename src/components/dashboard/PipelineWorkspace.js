'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setActiveTool, setActiveCategory } from '../../store/uiSlice';
import { setLoading, setError, setOutput, setToolInput } from '../../store/toolSlice';
import PipelineStepTracker from './PipelineStepTracker';
import ToolInputForm from './ToolInputForm';
import OutputSandbox from './OutputSandbox';
import ToolSeoSection from './ToolSeoSection';
import DarazProfitCalculator from './DarazProfitCalculator';
import YoutubeIntelligenceHost, { YOUTUBE_INTELLIGENCE_SLUGS } from './youtube/YoutubeIntelligenceHost';
import SeoToolHost, { SEO_HOST_SLUGS } from './seo/SeoToolHost';
import CalculatorsHost, { CALCULATOR_HOST_SLUGS } from './calculators/CalculatorsHost';
import PdfUtilitiesHost, { PDF_UTILITY_HOST_SLUGS } from './pdfUtilities/PdfUtilitiesHost';
import WritingHost, { WRITING_HOST_SLUGS } from './writing/WritingHost';
import StudyHost, { STUDY_HOST_SLUGS } from './study/StudyHost';
import FreelancerHost, { FREELANCER_HOST_SLUGS } from './freelancer/FreelancerHost';
import MarketplaceHost, { SHOPEE_HOST_SLUGS, LAZADA_HOST_SLUGS } from './marketplace/MarketplaceHost';
import { navigationConfig } from '../../config/navigation';
import { getLocalizedToolPath } from '../../i18n/paths';
import { DEFAULT_LOCALE } from '../../i18n/config';
import { useLocale } from '../i18n/LocaleProvider';

function getCategorySteps(categorySlug) {
  const cat = navigationConfig.find(c => c.slug === categorySlug) || navigationConfig.find(c => c.slug === 'daraz-seo');
  return cat ? cat.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug })) : [];
}

const pipelineLabels = {
  'youtube-automation': 'YouTube Automation pipeline',
  'daraz-seo': 'Daraz SEO intelligence',
  'local-social-commerce': 'Local Social Commerce & WhatsApp suite',
  'seo-webmaster': 'SEO & Webmaster Intelligence',
  'calculators': 'Business & Marketing Calculators',
  'pdf-image-utilities': 'PDF & Image Utilities',
  'ai-writing': 'AI Writing & Language Tools',
  'ai-study': 'AI Study, Quizzes & Typing',
  'freelancer-toolkit': 'Freelancer Toolkit',
  'shopee-seller': 'Shopee Seller Toolkit',
  'lazada-seller': 'Lazada Seller Toolkit'
};

const categoryRouteKeys = {
  'youtube-automation': 'youtube',
  'daraz-seo': 'daraz',
  'local-social-commerce': 'local-commerce',
  'seo-webmaster': 'seo',
  'calculators': 'calculators',
  'pdf-image-utilities': 'pdf-utilities',
  'ai-writing': 'writing',
  'ai-study': 'study',
  'freelancer-toolkit': 'freelancer',
  'shopee-seller': 'shopee',
  'lazada-seller': 'lazada'
};

export default function PipelineWorkspace({ toolSlug, categorySlug, initialLanguage = null, locale: localeProp, toolCopy = null }) {
  const { locale: ctxLocale, t } = useLocale();
  const locale = localeProp || ctxLocale || DEFAULT_LOCALE;
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { loading, error, outputs, inputs } = useSelector((state) => state.tools);
  const outputData = outputs[toolSlug];
  const toolInputs = inputs[toolSlug] || {};

  const [copied, setCopied] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordCopied, setKeywordCopied] = useState(false);
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const routeCategory = categoryRouteKeys[categorySlug] || 'youtube';
  const steps = getCategorySteps(categorySlug);
  const currentStepIndex = steps.findIndex(s => s.slug === toolSlug);
  const categoryToFooterKey = {
    'youtube-automation': 'youtube',
    'daraz-seo': 'daraz',
    'local-social-commerce': 'whatsapp',
    'seo-webmaster': 'seo',
    'calculators': 'calculators',
    'pdf-image-utilities': 'pdf',
    'ai-writing': 'writing',
    'ai-study': 'study',
    'freelancer-toolkit': 'freelancer',
    'shopee-seller': 'shopee',
    'lazada-seller': 'lazada'
  };
  const footerKey = categoryToFooterKey[categorySlug];
  const translatedLabel = footerKey ? t(`footer.${footerKey}`) : t(`categories.${routeCategory}.label`);
  const pipelineLabel = (translatedLabel && !translatedLabel.startsWith('footer.') && !translatedLabel.startsWith('categories.'))
    ? translatedLabel
    : (pipelineLabels[categorySlug] || 'Tool pipeline');

  useEffect(() => {
    dispatch(setActiveTool(toolSlug));
    dispatch(setActiveCategory(categorySlug));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toolSlug, categorySlug, dispatch]);

  useEffect(() => {
    if (toolSlug === 'roman-urdu-keywords' && outputData && Array.isArray(outputData)) {
      setSelectedKeywords(outputData);
    }
  }, [toolSlug, outputData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: toolSlug, payload: toolInputs, securityToken }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate output from AI model.');
      }

      dispatch(setOutput({ toolSlug, data: json.data }));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    }
  };

  const handleStepClick = (slug) => {
    router.push(getLocalizedToolPath(locale, routeCategory, slug));
  };

  const handleSendToTitle = (idea) => {
    dispatch(setToolInput({ toolSlug: 'title-generator', field: 'idea', value: idea }));
    router.push(getLocalizedToolPath(locale, 'youtube', 'title-generator'));
  };

  const handleSendToTool = (title, targetSlug) => {
    dispatch(setToolInput({ toolSlug: targetSlug, field: 'title', value: title }));
    router.push(getLocalizedToolPath(locale, 'youtube', targetSlug));
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleKeyword = (kw) => {
    setSelectedKeywords(prev => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]);
  };

  const handleCopyKeywords = () => {
    if (selectedKeywords.length === 0) return;
    navigator.clipboard.writeText(selectedKeywords.join(', '));
    setKeywordCopied(true);
    setTimeout(() => setKeywordCopied(false), 2000);
  };

  return (
    <div className="flex-1 px-3 py-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full max-w-full min-w-0 overflow-hidden space-y-6 sm:space-y-8 text-slate-900 dark:text-slate-100">
      {/* Step Tracker */}
      <PipelineStepTracker
        steps={steps}
        toolSlug={toolSlug}
        currentStepIndex={currentStepIndex}
        pipelineLabel={pipelineLabel}
        routeCategory={routeCategory}
        locale={locale}
      />

      {/* Main Form/Output Grid */}
      {toolSlug === 'profit-calculator' ? (
        <DarazProfitCalculator />
      ) : YOUTUBE_INTELLIGENCE_SLUGS.includes(toolSlug) ? (
        <YoutubeIntelligenceHost toolSlug={toolSlug} />
      ) : SEO_HOST_SLUGS.includes(toolSlug) ? (
        <SeoToolHost toolSlug={toolSlug} />
      ) : CALCULATOR_HOST_SLUGS.includes(toolSlug) ? (
        <CalculatorsHost toolSlug={toolSlug} locale={locale} toolCopy={toolCopy} />
      ) : PDF_UTILITY_HOST_SLUGS.includes(toolSlug) ? (
        <PdfUtilitiesHost toolSlug={toolSlug} />
      ) : WRITING_HOST_SLUGS.includes(toolSlug) ? (
        <WritingHost toolSlug={toolSlug} initialLanguage={initialLanguage} />
      ) : STUDY_HOST_SLUGS.includes(toolSlug) ? (
        <StudyHost toolSlug={toolSlug} />
      ) : FREELANCER_HOST_SLUGS.includes(toolSlug) ? (
        <FreelancerHost toolSlug={toolSlug} />
      ) : SHOPEE_HOST_SLUGS.includes(toolSlug) ? (
        <MarketplaceHost marketplace="shopee" toolSlug={toolSlug} />
      ) : LAZADA_HOST_SLUGS.includes(toolSlug) ? (
        <MarketplaceHost marketplace="lazada" toolSlug={toolSlug} />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch w-full max-w-full min-w-0">
          
          {/* Left Input Pane */}
          <div className="lg:col-span-4 flex flex-col w-full max-w-full min-w-0">
            <ToolInputForm 
              toolSlug={toolSlug} 
              onSubmit={handleSubmit} 
              inputRef={inputRef} 
              onSecurityTokenChange={setSecurityToken} 
              securityToken={securityToken}
              turnstileResetKey={turnstileResetKey}
            />
          </div>

          {/* Right Output Pane */}
          <div className="lg:col-span-8 flex flex-col w-full max-w-full min-w-0">
            <OutputSandbox
              toolSlug={toolSlug}
              outputData={outputData}
              loading={loading}
              error={error}
              copied={copied}
              handleCopyText={handleCopyText}
              handleSendToTitle={handleSendToTitle}
              handleSendToTool={handleSendToTool}
              selectedKeywords={selectedKeywords}
              toggleKeyword={toggleKeyword}
              handleCopyKeywords={handleCopyKeywords}
              keywordCopied={keywordCopied}
              steps={steps}
              currentStepIndex={currentStepIndex}
              handleStepClick={handleStepClick}
            />
          </div>

        </div>
      )}

      {/* Bottom SEO Section: Description, Example and FAQs */}
      <ToolSeoSection toolSlug={toolSlug} language={initialLanguage} toolCopy={toolCopy} />

    </div>
  );
}
