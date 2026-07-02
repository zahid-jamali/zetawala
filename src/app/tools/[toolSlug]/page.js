'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const routeMap = {
  'video-ideas': '/dashboard/youtube/video-ideas',
  'yt-ideas-generator': '/dashboard/youtube/video-ideas',
  'title-generator': '/dashboard/youtube/title-generator',
  'yt-title-generator': '/dashboard/youtube/title-generator',
  'hook-architect': '/dashboard/youtube/hook-architect',
  'yt-hook-generator': '/dashboard/youtube/hook-architect',
  'description-builder': '/dashboard/youtube/description-builder',
  'yt-description-generator': '/dashboard/youtube/description-builder',
  'tags-extractor': '/dashboard/youtube/tags-extractor',
  'yt-tags-generator': '/dashboard/youtube/tags-extractor',
  'thumbnail-prompt': '/dashboard/youtube/thumbnail-prompt',
  'yt-thumbnail-prompt': '/dashboard/youtube/thumbnail-prompt',
  'script-master': '/dashboard/youtube/script-master',
  'yt-script-writer': '/dashboard/youtube/script-master',
  'product-hunting': '/dashboard/daraz/product-hunting',
  'daraz-product-hunting': '/dashboard/daraz/product-hunting',
  'roman-urdu-keywords': '/dashboard/daraz/roman-urdu-keywords',
  'daraz-keyword-generator': '/dashboard/daraz/roman-urdu-keywords',
};

export default function ToolWorkspaceRedirectPage({ params }) {
  const resolvedParams = use(params);
  const { toolSlug } = resolvedParams;
  const router = useRouter();

  useEffect(() => {
    const targetPath = routeMap[toolSlug];
    if (targetPath) {
      router.replace(targetPath);
    } else {
      router.replace('/');
    }
  }, [toolSlug, router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
      <p className="text-sm text-slate-405">Redirecting to ZetaWala SEO Suite...</p>
    </div>
  );
}
