'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { AdsProvider } from './adsense';

const SearchDialog = dynamic(() => import('@/components/search'), {
  ssr: false,
});

export function Provider({ children }: { children: ReactNode }) {
  return (
    <AdsProvider>
      <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
    </AdsProvider>
  );
}
