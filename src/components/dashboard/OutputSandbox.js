'use client';

import React from 'react';
import { Sparkles, Loader2, Check, Copy, AlertTriangle } from 'lucide-react';
import IdeaCard from './IdeaCard';
import TitleList from './TitleList';
import TagGrid from './TagGrid';
import PromptList from './PromptList';
import HookViewer from './HookViewer';
import DescriptionViewer from './DescriptionViewer';
import VisualsViewer from './VisualsViewer';
import DarazHuntingMetrics from './DarazHuntingMetrics';
import DarazTrafficKeywords from './DarazTrafficKeywords';
import ScriptViewer from './ScriptViewer';

export default function OutputSandbox({
  toolSlug,
  outputData,
  loading,
  error,
  copied,
  handleCopyText,
  handleSendToTitle,
  handleSendToTool,
  selectedKeywords,
  toggleKeyword,
  handleCopyKeywords,
  keywordCopied,
  steps,
  currentStepIndex,
  handleStepClick
}) {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl sm:rounded-3xl min-h-[300px] sm:min-h-[400px] flex flex-col justify-between h-full shadow-sm">
      
      {/* Header toolbar */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          Live Output Sandbox
        </h2>
        {outputData && !['video-ideas', 'title-generator', 'tags-extractor', 'thumbnail-prompt', 'script-master', 'product-hunting', 'roman-urdu-keywords', 'visuals-recommender'].includes(toolSlug) && (
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
            className="text-[10px] text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 transition-all cursor-pointer"
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
              <HookViewer outputData={outputData} />
            )}

            {toolSlug === 'description-builder' && (
              <DescriptionViewer outputData={outputData} />
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

            {toolSlug === 'visuals-recommender' && (
              <VisualsViewer outputData={outputData} />
            )}

            {![
              'video-ideas',
              'title-generator',
              'hook-architect',
              'description-builder',
              'tags-extractor',
              'thumbnail-prompt',
              'script-master',
              'product-hunting',
              'roman-urdu-keywords',
              'visuals-recommender'
            ].includes(toolSlug) && (
              <div className="space-y-4">
                {outputData.content && (
                  <div className="p-5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl relative group shadow-sm">
                    <p className="text-slate-850 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">{outputData.content}</p>
                  </div>
                )}
                {outputData.results && Array.isArray(outputData.results) && (
                  <div className="space-y-3">
                    {outputData.results.map((item, idx) => (
                      <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl relative group shadow-sm">
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
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold text-white border border-slate-205 dark:border-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            Proceed to Step 0{currentStepIndex + 2} ({steps[currentStepIndex + 1].name})
            <span className="opacity-60">&rarr;</span>
          </button>
        </div>
      )}

    </div>
  );
}
