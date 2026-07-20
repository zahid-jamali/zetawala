'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getSeoPath } from '../../../config/routes';

const routeMap = {
  'video-ideas': { cat: 'youtube', slug: 'video-ideas' },
  'yt-ideas-generator': { cat: 'youtube', slug: 'video-ideas' },
  'title-generator': { cat: 'youtube', slug: 'title-generator' },
  'yt-title-generator': { cat: 'youtube', slug: 'title-generator' },
  'hook-architect': { cat: 'youtube', slug: 'hook-architect' },
  'yt-hook-generator': { cat: 'youtube', slug: 'hook-architect' },
  'description-builder': { cat: 'youtube', slug: 'description-builder' },
  'yt-description-generator': { cat: 'youtube', slug: 'description-builder' },
  'tags-extractor': { cat: 'youtube', slug: 'tags-extractor' },
  'yt-tags-generator': { cat: 'youtube', slug: 'tags-extractor' },
  'thumbnail-prompt': { cat: 'youtube', slug: 'thumbnail-prompt' },
  'yt-thumbnail-prompt': { cat: 'youtube', slug: 'thumbnail-prompt' },
  'script-master': { cat: 'youtube', slug: 'script-master' },
  'yt-script-writer': { cat: 'youtube', slug: 'script-master' },
  'product-hunting': { cat: 'daraz', slug: 'product-hunting' },
  'daraz-product-hunting': { cat: 'daraz', slug: 'product-hunting' },
  'roman-urdu-keywords': { cat: 'daraz', slug: 'roman-urdu-keywords' },
  'daraz-keyword-generator': { cat: 'daraz', slug: 'roman-urdu-keywords' },
  'whatsapp-broadcast': { cat: 'local-commerce', slug: 'whatsapp-broadcast' },
  'local-ad-script': { cat: 'local-commerce', slug: 'local-ad-script' },
  'wholesale-negotiation': { cat: 'local-commerce', slug: 'wholesale-negotiation' },
  'social-comment-responder': { cat: 'local-commerce', slug: 'social-comment-responder' },
  'product-storyboard': { cat: 'local-commerce', slug: 'product-storyboard' },
};

export default function ToolWorkspaceRedirectPage({ params }) {
  const resolvedParams = use(params);
  const { toolSlug } = resolvedParams;
  const router = useRouter();

  useEffect(() => {
    const match = routeMap[toolSlug];
    if (match) {
      router.replace(getSeoPath(match.cat, match.slug));
    } else {
      router.replace('/');
    }
  }, [toolSlug, router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
      <p className="text-sm text-slate-400">Redirecting to ZetaWala SEO Suite...</p>
    </div>
  );
}
