import type { MetadataRoute } from 'next';
import { getTags, slugifyTag, sortedPages } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  priority: number;
}> = [
  { path: '/', priority: 1.0 },
  { path: '/about', priority: 0.7 },
  { path: '/contact', priority: 0.7 },
  { path: '/tags', priority: 0.7 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = sortedPages();

  // Mốc thời gian deterministic: lấy ngày của bài mới nhất thay vì `new Date()`.
  // Trước đây mỗi lần build sitemap lại đổi `lastmod` của toàn bộ route tĩnh dù
  // nội dung không đổi → Google phải crawl lại vô ích, và diff giữa 2 lần
  // build luôn nhiễu (không thể cache/revalidate ổn định).
  const siteLastModified = pages[0]?.data.date ?? new Date(2022, 0, 1);

  const routes = STATIC_ROUTES.map((route) => ({
    url: siteUrl(route.path),
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }));

  const posts = pages.map((post) => ({
    url: siteUrl(post.url),
    // Bài blog cá nhân không đổi hằng ngày; `lastmod` lấy từ frontmatter
    // thay vì ngày build. (Trước đây để `changeFrequency: 'daily'`.)
    lastModified: post.data.date,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  // Mỗi trang thẻ cũng là một URL được prerender (generateStaticParams của
  // /tags/[tag]) nên phải có mặt trong sitemap.
  const tags = [...getTags().keys()].map((tag) => ({
    url: siteUrl(`/tags/${slugifyTag(tag)}`),
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...routes, ...posts, ...tags];
}

export const dynamic = 'force-static';
