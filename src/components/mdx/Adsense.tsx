'use client';
import { useEffect } from 'react';
import { Warning } from '@/components/mdx/Admonition';
import { useAdsContext } from '@/components/adsense';
import clsx from 'clsx';
import { AD_CLIENT, AD_SLOT } from '@/lib/shared';

export function Adsense() {
  const { failed, disabled } = useAdsContext();

  useEffect(() => {
    if (failed || disabled) return;

    try {
      // eslint-disable-next-line
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (e) {
      console.error(`[Adsense] ${(e as Error).message}`);
    }
  }, [failed, disabled]);

  // Chưa cấu hình NEXT_PUBLIC_AD_CLIENT / NEXT_PUBLIC_AD_SLOT lúc build:
  // render rỗng thay vì khung "không có quảng cáo" + <ins data-ad-client="ca-pub-">.
  if (disabled) return null;

  if (failed)
    return (
      <Warning title="Hãy tắt trình chặn quảng cáo" type="warn">
        <p>Hãy tắt AdBlocker để hỗ trợ trang web của chúng tôi</p>
      </Warning>
    );

  return (
    <div aria-label="ads">
      <p className="my-2 text-center text-sm text-gray-400">
        Quảng cáo giúp chúng tôi duy trì trang web này
      </p>
      <div
        className={clsx(
          "after:content-['Rất tiếc, không có quảng cáo nào được hiển thị.'] relative min-h-[280px] after:z-[-1] after:text-gray-500",
          'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:text-sm',
        )}
      >
        <ins
          className="adsbygoogle"
          aria-label="promote"
          style={{ display: 'block' }}
          data-ad-client={`ca-pub-${AD_CLIENT}`}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

export default Adsense;
