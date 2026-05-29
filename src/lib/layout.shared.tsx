import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import { LogoSVG } from '@/components/LogoSVG';

export function baseOptions(): BaseLayoutProps {
  return {
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
    links: [],
  };
}
