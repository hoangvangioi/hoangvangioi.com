import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import { LogoSVG } from '@/components/LogoSVG';

let cached: BaseLayoutProps | undefined;

/**
 * Options cho header, cache ở module scope.
 *
 * `Header` (client component) bọc phần phân loại nav/menu trong
 * `useMemo(..., [links, githubUrl])`. Trước đây hàm này trả về object + array
 * `links` MỚI ở mỗi lần gọi nên tham chiếu luôn khác nhau: memo không bao giờ
 * trúng cache và `resolveLinkItems` chạy lại mỗi lần render.
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
