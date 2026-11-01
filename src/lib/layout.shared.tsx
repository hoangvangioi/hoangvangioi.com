import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import { LogoSVG } from '@/components/LogoSVG';

let cached: BaseLayoutProps | undefined;

/**
 * Header options, memoized at module scope. The value is build-time constant,
 * so callers always get the same reference; do not cache anything here that
 * depends on request data.
 */

export function baseOptions(): BaseLayoutProps {
  cached ??= {
    nav: {
      title: (
        <>
          <LogoSVG
            className="size-8"
            fill="currentColor"
            aria-label="Hoàng Văn Giỏi"
          />
          <span className="ml-3 font-semibold max-md:hidden">
            Hoàng Văn Giỏi
          </span>
          <span className="ml-3 hidden font-semibold max-md:block">
            H.V.Giỏi
          </span>
        </>
      ),
      transparentMode: 'top',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'Giới thiệu',
        url: '/about/',
      },
      {
        text: 'Liên hệ',
        url: '/contact/',
      },
    ],
  };
  return cached;
}
