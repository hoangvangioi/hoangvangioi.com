import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
} from '@icons-pack/react-simple-icons';

export const docsRoute = '/posts';
export const docsImageRoute = '/og/posts';
export const docsContentRoute = '/llms.mdx/posts';

export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000';

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
