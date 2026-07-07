'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Loader2, 
  Check, 
  Copy, 
  AlertTriangle 
} from 'lucide-react';
import { setLoading, setError, setOutput, setToolInput } from '../../store/toolSlice';
import { setActiveTool, setActiveCategory } from '../../store/uiSlice';
import ToolInputForm from './ToolInputForm';
import IdeaCard from './IdeaCard';
import TitleList from './TitleList';
import TagGrid from './TagGrid';
import PromptList from './PromptList';
import ScriptViewer from './ScriptViewer';
import DarazHuntingMetrics from './DarazHuntingMetrics';
import DarazTrafficKeywords from './DarazTrafficKeywords';

import { navigationConfig } from '../../config/navigation';

const youtubeCategory = navigationConfig.find(c => c.slug === 'youtube-automation');
const youtubeSteps = youtubeCategory 
  ? youtubeCategory.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug })) 
  : [];

const darazCategory = navigationConfig.find(c => c.slug === 'daraz-seo');
const darazSteps = darazCategory 
  ? darazCategory.tools.filter(t => t.isActive).map(t => ({ name: t.name, slug: t.slug })) 
  : [];

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

  const isYoutube = categorySlug === 'youtube-automation';
  const steps = isYoutube ? youtubeSteps : darazSteps;
  const currentStepIndex = steps.findIndex(s => s.slug === toolSlug);

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
        body: JSON.stringify({ action: toolSlug, payload: toolInputs })
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
    }
  };

  const handleStepClick = (slug) => {
    router.push(`/dashboard/${isYoutube ? 'youtube' : 'daraz'}/${slug}`);
  };

  const handleSendToTitle = (idea) => {
    dispatch(setToolInput({ toolSlug: 'title-generator', field: 'idea', value: idea }));
    router.push('/dashboard/youtube/title-generator');
  };

  const handleSendToTool = (title, targetSlug) => {
    dispatch(setToolInput({ toolSlug: targetSlug, field: 'title', value: title }));
    router.push(`/dashboard/youtube/${targetSlug}`);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleKeyword = (kw) => {
    setSelectedKeywords(prev => 
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    );
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          {isYoutube ? 'YouTube Automation pipeline' : 'Daraz SEO intelligence'}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {steps.map((step, idx) => {
            const isCurrent = step.slug === toolSlug;
            const isPast = idx < currentStepIndex;
            return (
              <React.Fragment key={step.slug}>
                {idx > 0 && <div className="hidden sm:block w-3 h-0.5 bg-slate-200 dark:bg-slate-800" />}
                <button
                  onClick={() => handleStepClick(step.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    isCurrent 
                      ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                      : isPast
                        ? 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-405'
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
                  }`}
                >
                  <span className="mr-1 text-[10px] opacity-60">0{idx + 1}</span>
                  {step.name}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Column Split */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Input Pane */}
        <div className="lg:col-span-4 flex flex-col">
          <ToolInputForm 
            toolSlug={toolSlug} 
            onSubmit={handleSubmit} 
            inputRef={inputRef} 
          />
        </div>

        {/* Right Output Pane */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl min-h-[400px] flex flex-col justify-between h-full shadow-sm">
            
            {/* Header toolbar */}
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                Live Output Sandbox
              </h2>
              {outputData && !['video-ideas', 'title-generator', 'tags-extractor', 'thumbnail-prompt', 'script-master', 'product-hunting', 'roman-urdu-keywords'].includes(toolSlug) && (
                <button
                  onClick={() => {
                    let text = '';
                    if (toolSlug === 'hook-architect') text = outputData.script;
                    else if (toolSlug === 'description-builder') text = outputData.description;
                    else if (outputData.content) text = outputData.content;
                    else if (outputData.results && Array.isArray(outputData.results)) {
                      text = outputData.results.map(r => `${r.title ? r.title + '\n' : ''}${r.content}`).join('\n\n');
                    }
                    handleCopyText(text);
                  }}
                  className="text-[10px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-indigo-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy output'}
                </button>
              )}
            </div>

            {/* Error alerts */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-905/20 border border-red-200 dark:border-red-500/20 text-red-650 dark:text-red-400 text-xs flex items-start gap-2.5 mb-4">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Render Output Content */}
            <div className="flex-1">
              {loading ? (
                /* Spinner skeleton */
                <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-3">
                  <Loader2 className="w-10 h-10 text-slate-800 dark:text-white animate-spin" />
                  <p className="text-xs text-slate-600 dark:text-slate-400">Generative model is processing search parameters...</p>
                </div>
              ) : outputData ? (
                
                /* Render individual atomic components */
                <>
                  {toolSlug === 'video-ideas' && (
                    <IdeaCard ideas={outputData} onSendToTitle={handleSendToTitle} />
                  )}

                  {toolSlug === 'title-generator' && (
                    <TitleList titles={outputData} onSendToTool={handleSendToTool} />
                  )}

                  {toolSlug === 'hook-architect' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Delivery Tonal Guidance</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{outputData.toneGuidelines}</p>
                      </div>
                      <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl space-y-2 relative group/hook">
                        <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Narrative Hook block</span>
                        <p className="text-slate-850 dark:text-white text-sm leading-relaxed whitespace-pre-wrap">{outputData.script}</p>
                      </div>
                    </div>
                  )}

                  {toolSlug === 'description-builder' && (
                    <div className="space-y-2 h-full flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Rich Text Preview</span>
                      <textarea
                        readOnly
                        value={outputData.description}
                        className="flex-1 w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-mono focus:outline-none h-[300px] resize-none"
                      />
                    </div>
                  )}

                  {toolSlug === 'tags-extractor' && (
                    <TagGrid tags={outputData.tags} />
                  )}

                  {toolSlug === 'thumbnail-prompt' && (
                    <PromptList prompts={outputData} />
                  )}

                  {toolSlug === 'script-master' && (
                    <ScriptViewer script={outputData} />
                  )}

                  {toolSlug === 'product-hunting' && (
                    <DarazHuntingMetrics huntingOutput={outputData} />
                  )}

                  {toolSlug === 'roman-urdu-keywords' && (
                    <DarazTrafficKeywords
                      keywordOutput={outputData}
                      selectedKeywords={selectedKeywords}
                      toggleKeyword={toggleKeyword}
                      handleCopyKeywords={handleCopyKeywords}
                      copied={keywordCopied}
                    />
                  )}

                  {!['video-ideas', 'title-generator', 'hook-architect', 'description-builder', 'tags-extractor', 'thumbnail-prompt', 'script-master', 'product-hunting', 'roman-urdu-keywords'].includes(toolSlug) && (
                    <div className="space-y-4">
                      {outputData.content && (
                        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl relative group shadow-sm">
                          <p className="text-slate-850 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">{outputData.content}</p>
                        </div>
                      )}
                      {outputData.results && Array.isArray(outputData.results) && (
                        <div className="space-y-3">
                          {outputData.results.map((item, idx) => (
                            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl relative group shadow-sm">
                              {item.title && <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{item.title}</span>}
                              <p className="text-slate-805 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">{item.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>

              ) : (
                /* Empty/Inactive state */
                <div className="h-full flex flex-col items-center justify-center py-24 text-center">
                  <Sparkles className="w-10 h-10 text-slate-400 dark:text-slate-700 mb-4 animate-pulse" />
                  <h3 className="font-bold text-slate-500 dark:text-slate-400">Awaiting Search Trigger</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-500 mt-1 max-w-xs leading-normal">
                    Fill out the parameters form on the left and click Generate to analyze content logs.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom transition CTA for pipeline flow */}
            {outputData && currentStepIndex < steps.length - 1 && (
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-850 flex justify-end">
                <button
                  onClick={() => handleStepClick(steps[currentStepIndex + 1].slug)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold text-white border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  Proceed to Step 0{currentStepIndex + 2} ({steps[currentStepIndex + 1].name})
                  <span className="opacity-60">&rarr;</span>
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
