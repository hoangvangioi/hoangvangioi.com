import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
} from '@icons-pack/react-simple-icons';

export const docsRoute = '/posts';
export const docsImageRoute = '/og/posts';
export const docsContentRoute = '/llms.mdx/posts';

// Never fall back to localhost: an unset SITE_URL would leak into sitemap.xml,
// robots.txt, the feed and every canonical tag.
const DEFAULT_SITE_URL = 'https://hoangvangioi.com';

/** No trailing slash, so `${SITE_URL}/path` never produces `//`. */
export const SITE_URL = (process.env.SITE_URL ?? DEFAULT_SITE_URL).replace(
  /\/+$/,
  '',
);

/**
 * Absolute URL for a page route. trailingSlash: true means the URLs the site
 * actually serves end in "/", so hand-written `${SITE_URL}/about` never matched
 * them. Paths ending in a file name (sitemap.xml, feed.xml) get no slash.
 */
export function siteUrl(path = '/'): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, '');

  if (trimmed === '') return `${SITE_URL}/`;

  const lastSegment = trimmed.slice(trimmed.lastIndexOf('/') + 1);
  if (lastSegment.includes('.')) return `${SITE_URL}${trimmed}`;

  return `${SITE_URL}${trimmed}/`;
}

// export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000';

export const site = {
  site_name: 'Hoàng Văn Giỏi',
  site_url: SITE_URL,
  description: 'Hoàng Văn Giỏi - Blog chia sẻ kiến thức lập trình và công nghệ',
  author: 'Hoàng Văn Giỏi',
  email: 'admin@hoangvangioi.com',
} as const;

export const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT ?? '';
export const AD_SLOT = process.env.NEXT_PUBLIC_AD_SLOT ?? '';

export const gitConfig = {
  user: 'hoangvangioi',
  repo: 'hoangvangioi.com',
  branch: 'main',
} as const;

export type AuthorData = {
  name: string;
  url?: string;
  title?: string;
  image_url?: string;
};

export type TagInfo = {
  count: number;
};

export type FooterItem = {
  label: string;
  href: string;
  newWindow?: boolean;
};

export type SocialLinks = Array<{
  href: string;
  title: string;
  icon: IconType;
}>;

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: 'https://github.com/hoangvangioi',
    title: 'GitHub',
    icon: SiGithub,
  },
  {
    href: 'https://www.facebook.com/hoanggioi.2803',
    title: 'Facebook',
    icon: SiFacebook,
  },
  {
    href: 'https://www.instagram.com/gioihoang3082',
    title: 'Instagram',
    icon: SiInstagram,
  },
];

export const footer: FooterItem[] = [
  {
    label: 'Trang chủ',
    href: '/',
  },
  {
    label: 'Giới thiệu',
    href: '/about/',
  },
  {
    label: 'Liên hệ',
    href: '/contact/',
  },
  {
    label: 'Quyền riêng tư',
    href: '/privacy/',
  },
  {
    label: 'Điều khoản sử dụng',
    href: '/terms/',
  },
];

export const authors: Record<string, AuthorData> = {
  gioi: {
    name: 'Hoàng Văn Giỏi',
    title: 'Tác giả chính',
    url: 'https://github.com/hoangvangioi',
    image_url: '/icon.png',
  },
};
