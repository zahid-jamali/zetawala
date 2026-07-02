'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function YoutubeDashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/youtube/video-ideas');
  }, [router]);

  return null;
}
