'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Video, Search, Image, Copy, Check, ChevronDown, Sparkles } from 'lucide-react';

export default function VisualsViewer({ outputData }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedType, setCopiedType] = useState(null); // 'keywords' or 'prompt'
  const [activeAccordions, setActiveAccordions] = useState({}); // { "sceneIdx-sectionIdx": boolean }

  // Read active visuals type filter from Redux store
  const { inputs } = useSelector((state) => state.tool);
  const toolInputs = inputs['visuals-recommender'] || {};
  const visualsType = toolInputs.visualsType || 'all';

  // Auto-expand sections that have data on initial mount
  useEffect(() => {
    if (outputData && outputData.scenes && outputData.scenes.length > 0) {
      const initial = {};
      outputData.scenes.forEach((scene, idx) => {
        if (scene.visualIdea && ['all', 'idea'].includes(visualsType)) initial[`${idx}-idea`] = true;
        if (scene.keywords && ['all', 'keywords'].includes(visualsType)) initial[`${idx}-keywords`] = true;
        if (scene.veoPrompt && ['all', 'prompt'].includes(visualsType)) initial[`${idx}-prompt`] = true;
      });
      setActiveAccordions(initial);
    }
  }, [outputData, visualsType]);

  const handleCopy = (text, idx, type) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 2000);
  };

  const toggleAccordion = (sceneIdx, sectionId) => {
    const key = `${sceneIdx}-${sectionId}`;
    setActiveAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const labelCl = "w-full p-4 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-855 transition-colors";
  const contentCl = "p-4 bg-white dark:bg-slate-900 border-x border-b border-slate-150 dark:border-slate-850 rounded-b-xl text-xs leading-relaxed text-slate-800 dark:text-slate-250 -mt-2 mb-3 whitespace-pre-wrap";

  if (!outputData || !outputData.scenes || !Array.isArray(outputData.scenes)) {
    return (
      <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl text-center text-slate-400 italic">
        No visuals recommended yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-indigo-500" />
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          Recommended Visuals Storyboard
        </span>
      </div>

      <div className="space-y-6">
        {outputData.scenes.map((scene, idx) => {
          const isKeywordsCopied = copiedIndex === idx && copiedType === 'keywords';
          const isPromptCopied = copiedIndex === idx && copiedType === 'prompt';
          
          return (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm relative">
              
              {/* Scene Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-500" />
                  Scene 0{scene.sceneNumber || idx + 1}
                </span>
                {scene.timestamp && (
                  <span className="text-[9px] uppercase font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-455 tracking-wider">
                    {scene.timestamp}
                  </span>
                )}
              </div>

              {/* 3 Collapsible Dropdowns */}
              <div className="space-y-3">
                
                {/* 1. Visual Idea */}
                {scene.visualIdea && ['all', 'idea'].includes(visualsType) && (
                  <div>
                    <button onClick={() => toggleAccordion(idx, 'idea')} className={labelCl}>
                      <span className="flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-indigo-500" />
                        Visual Idea & Scene Imagery
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeAccordions[`${idx}-idea`] ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAccordions[`${idx}-idea`] && (
                      <div className={contentCl}>
                        <p className="font-semibold text-slate-850 dark:text-white mb-1">Director Notes:</p>
                        {scene.visualIdea}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Keywords to Search */}
                {scene.keywords && ['all', 'keywords'].includes(visualsType) && (
                  <div>
                    <button onClick={() => toggleAccordion(idx, 'keywords')} className={labelCl}>
                      <span className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-sky-500" />
                        Stock Footage Search Keywords
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeAccordions[`${idx}-keywords`] ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAccordions[`${idx}-keywords`] && (
                      <div className={contentCl}>
                        <div className="flex justify-between items-start gap-4">
                          <p className="font-mono text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/20 px-2 py-1.5 rounded-lg flex-1 border border-sky-100/30">
                            {scene.keywords}
                          </p>
                          <button
                            onClick={() => handleCopy(scene.keywords, idx, 'keywords')}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy search keywords"
                          >
                            {isKeywordsCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. VEO Prompts */}
                {scene.veoPrompt && ['all', 'prompt'].includes(visualsType) && (
                  <div>
                    <button onClick={() => toggleAccordion(idx, 'prompt')} className={labelCl}>
                      <span className="flex items-center gap-2">
                        <Image className="w-3.5 h-3.5 text-emerald-500" />
                        VEO Prompt (Midjourney / AI Prompt)
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeAccordions[`${idx}-prompt`] ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAccordions[`${idx}-prompt`] && (
                      <div className={contentCl}>
                        <div className="flex justify-between items-start gap-4">
                          <p className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-2 py-1.5 rounded-lg flex-1 border border-emerald-100/30">
                            {scene.veoPrompt}
                          </p>
                          <button
                            onClick={() => handleCopy(scene.veoPrompt, idx, 'prompt')}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-855 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy generation prompt"
                          >
                            {isPromptCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
