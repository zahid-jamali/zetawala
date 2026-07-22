'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setActiveTool, setActiveCategory } from '../../store/uiSlice';
import { setLoading, setError, setOutput, setToolInput } from '../../store/toolSlice';
import ToolInputForm from './ToolInputForm';
import OutputSandbox from './OutputSandbox';
import ToolSeoSection from './ToolSeoSection';
import DarazProfitCalculator from './DarazProfitCalculator';
import YoutubeIntelligenceHost, { YOUTUBE_INTELLIGENCE_SLUGS } from './youtube/YoutubeIntelligenceHost';
import SeoToolHost, { SEO_HOST_SLUGS } from './seo/SeoToolHost';
import { navigationConfig } from '../../config/navigation';
import { getSeoPath } from '../../config/routes';

const youtubeCategory = navigationConfig.find(c => c.slug === 'youtube-automation');
const youtubeSteps = youtubeCategory 
  ? youtubeCategory.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug })) 
  : [];

const darazCategory = navigationConfig.find(c => c.slug === 'daraz-seo');
const darazSteps = darazCategory 
  ? darazCategory.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug })) 
  : [];

const localCommerceCategory = navigationConfig.find(c => c.slug === 'local-social-commerce');
const localCommerceSteps = localCommerceCategory
  ? localCommerceCategory.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug }))
  : [];

const seoCategory = navigationConfig.find(c => c.slug === 'seo-webmaster');
const seoSteps = seoCategory
  ? seoCategory.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug }))
  : [];

const pipelineLabels = {
  'youtube-automation': 'YouTube Automation pipeline',
  'daraz-seo': 'Daraz SEO intelligence',
  'local-social-commerce': 'Local Social Commerce & WhatsApp suite',
  'seo-webmaster': 'SEO & Webmaster Intelligence'
};

const categoryRouteKeys = {
  'youtube-automation': 'youtube',
  'daraz-seo': 'daraz',
  'local-social-commerce': 'local-commerce',
  'seo-webmaster': 'seo'
};

export default function PipelineWorkspace({ toolSlug, categorySlug }) {
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

  const isYoutube = categorySlug === 'youtube-automation';
  const steps = isYoutube
    ? youtubeSteps
    : categorySlug === 'local-social-commerce'
      ? localCommerceSteps
      : categorySlug === 'seo-webmaster'
        ? seoSteps
        : darazSteps;
  const currentStepIndex = steps.findIndex(s => s.slug === toolSlug);
  const routeCategory = categoryRouteKeys[categorySlug] || 'daraz';
  const pipelineLabel = pipelineLabels[categorySlug] || 'Tool pipeline';

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
    router.push(getSeoPath(routeCategory, slug));
  };

  const handleSendToTitle = (idea) => {
    dispatch(setToolInput({ toolSlug: 'title-generator', field: 'idea', value: idea }));
    router.push(getSeoPath('youtube', 'title-generator'));
  };

  const handleSendToTool = (title, targetSlug) => {
    dispatch(setToolInput({ toolSlug: targetSlug, field: 'title', value: title }));
    router.push(getSeoPath('youtube', targetSlug));
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
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Step Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          {pipelineLabel}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {steps.map((step, idx) => {
            const isCurrent = step.slug === toolSlug;
            const isPast = idx < currentStepIndex;
            return (
              <button
                key={step.slug}
                onClick={() => handleStepClick(step.slug)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${isCurrent ? 'bg-sky-500 text-white border-transparent shadow-sm' : isPast ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-800' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'}`}
              >
                {String(idx + 1).padStart(2, '0')} {step.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form/Output Grid */}
      {toolSlug === 'profit-calculator' ? (
        <DarazProfitCalculator />
      ) : YOUTUBE_INTELLIGENCE_SLUGS.includes(toolSlug) ? (
        <YoutubeIntelligenceHost toolSlug={toolSlug} />
      ) : SEO_HOST_SLUGS.includes(toolSlug) ? (
        <SeoToolHost toolSlug={toolSlug} />
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Input Pane */}
          <div className="lg:col-span-4 flex flex-col">
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
          <div className="lg:col-span-8 flex flex-col">
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
      <ToolSeoSection toolSlug={toolSlug} />

    </div>
  );
}
