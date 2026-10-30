'use client';
import { AD_CLIENT, ADS_ENABLED } from '@/lib/shared';
import Script from 'next/script';
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

type AdsContextValue = {
  /** Script `adsbygoogle.js` tải lỗi (thường do AdBlocker) */
  failed: boolean;
  /** Chưa cấu hình `NEXT_PUBLIC_AD_CLIENT` / `NEXT_PUBLIC_AD_SLOT` lúc build */
  disabled: boolean;
};

// Khai báo type tường minh: nếu để TS tự suy ra từ giá trị mặc định
// (`{ failed: false }`) thì `disabled` không tồn tại trong type, và
// `useAdsContext().disabled` bên `mdx/Adsense.tsx` báo lỗi TS2339.
const AdsContext = createContext<AdsContextValue>({
  failed: false,
  disabled: !ADS_ENABLED,
});

export function useAdsContext() {
  return useContext(AdsContext);
}

export function AdsProvider({ children }: { children: ReactNode }) {
  const [failed, setFailed] = useState(false);
  // `disabled` = chưa cấu hình AdSense lúc build (thiếu env). Khi đó đừng tải
  // script `adsbygoogle.js` với `client=ca-pub-` (URL sai) — vừa tốn 1 request
  // render-blocking kiểu lazyOnload, vừa làm console báo lỗi.
  const value = useMemo(() => ({ failed, disabled: !ADS_ENABLED }), [failed]);

  return (
    <AdsContext.Provider value={value}>
      {ADS_ENABLED && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${AD_CLIENT}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </AdsContext.Provider>
  );
}
