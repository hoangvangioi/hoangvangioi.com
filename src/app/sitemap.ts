import type { MetadataRoute } from 'next';
import { getTags, slugifyTag, sortedPages } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

const STATIC_ROUTES: ReadonlyArray<{ path: string; priority: number }> = [
  { path: '/', priority: 1.0 },
  { path: '/about', priority: 0.7 },
  { path: '/contact', priority: 0.7 },
  { path: '/tags', priority: 0.7 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = sortedPages();

  // Deterministic: the newest post date instead of new Date(), so rebuilding
  // without content changes does not rewrite every lastmod.
  const siteLastModified = pages[0]?.data.date ?? new Date(2022, 0, 1);

  const routes = STATIC_ROUTES.map((route) => ({
    url: siteUrl(route.path),
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }));

  const posts = pages.map((post) => ({
    url: siteUrl(post.url),
    lastModified: post.data.date,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  // Tag pages are prerendered by generateStaticParams, so they belong here too.
  const tags = [...getTags().keys()].map((tag) => ({
    url: siteUrl(`/tags/${slugifyTag(tag)}`),
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...routes, ...posts, ...tags];
}

export const dynamic = 'force-static';
