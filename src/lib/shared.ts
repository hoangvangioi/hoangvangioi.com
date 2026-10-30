import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
} from '@icons-pack/react-simple-icons';

export const docsRoute = '/posts';
export const docsImageRoute = '/og/posts';
export const docsContentRoute = '/llms.mdx/posts';

/**
 * Fallback cứng về domain thật.
 *
 * Trước đây fallback là 'http://localhost:3000' → chỉ cần quên set `SITE_URL`
 * lúc build là sitemap.xml, robots.txt, feed.xml và canonical của TOÀN BỘ bài
 * viết trỏ về localhost (đã kiểm chứng trong bản build thử). Repo lại không có
 * `.env.example` nên rất dễ lọt lên production mà không ai phát hiện.
 */
const DEFAULT_SITE_URL = 'https://hoangvangioi.com';

/** Đã bỏ slash cuối để ghép `${SITE_URL}/path` không bị `//`. */
export const SITE_URL = (process.env.SITE_URL ?? DEFAULT_SITE_URL).replace(
  /\/+$/,
  '',
);

/**
 * Ghép đường dẫn thành URL tuyệt đối, LUÔN có slash cuối.
 *
 * `next.config.mjs` đặt `trailingSlash: true` nên URL thật của mọi page route là
 * `/about/`, `/posts/xxx/`, `/tags/vim/`... Trước đây canonical/sitemap/feed
 * ghép tay `${SITE_URL}/about` (không slash) → không khớp URL thật, bị coi là
 * trùng lặp nội dung và có thể bị redirect 308 khi crawler bấm vào.
 *
 * Route kết thúc bằng tên file (`sitemap.xml`, `feed.xml`, `cover.webp`) thì
 * KHÔNG thêm slash — `trailingSlash` của Next chỉ áp dụng cho page route.
 *
 * Dùng hàm này ở mọi chỗ sinh URL tuyệt đối thay vì ghép chuỗi thủ công.
 */
export function siteUrl(path = '/'): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, '');

  if (trimmed === '') return `${SITE_URL}/`;

  const lastSegment = trimmed.slice(trimmed.lastIndexOf('/') + 1);
  if (lastSegment.includes('.')) return `${SITE_URL}${trimmed}`;

  return `${SITE_URL}${trimmed}/`;
}

/**
 * URL tuyệt đối cho route trả về FILE KHÔNG CÓ ĐUÔI (ảnh OG `/og/posts/<slug>`,
 * markdown `/llms.mdx/posts/<slug>`).
 *
 * Không dùng `siteUrl()` cho những route này: `siteUrl` thấy segment cuối không
 * có dấu chấm nên sẽ thêm slash cuối, mà file thật trong `out/` lại không có
 * slash → 404 (đã đo: `/og/posts/x/` = 404, `/og/posts/x` = 200). Với
 * `og:image` thì 404 nghĩa là Facebook/X không hiển thị được ảnh.
 */
export function siteFileUrl(path: string): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${withLeadingSlash.replace(/\/+$/, '')}`;
}

export const site = {
  site_name: 'Hoàng Văn Giỏi',
  site_url: SITE_URL,
  description: 'Hoàng Văn Giỏi - Blog chia sẻ kiến thức lập trình và công nghệ',
  author: 'Hoàng Văn Giỏi',
  email: 'admin@hoangvangioi.com',
} as const;

export const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT ?? '';
export const AD_SLOT = process.env.NEXT_PUBLIC_AD_SLOT ?? '';

/**
 * AdSense chỉ hoạt động khi có đủ cả publisher ID lẫn slot.
 * Thiếu 1 trong 2 mà vẫn render thì sẽ sinh ra markup lỗi
 * (`ca-pub-`, `data-ad-slot=""`) và `ads.txt` sai định dạng
 * (`google.com, pub-, DIRECT, ...` → bị Google từ chối).
 */
export const ADS_ENABLED = AD_CLIENT.length > 0 && AD_SLOT.length > 0;

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
