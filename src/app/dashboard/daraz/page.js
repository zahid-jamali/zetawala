'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DarazDashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/daraz/product-hunting');
  }, [router]);

  return null;
}
