import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { SITE_URL } from '@/lib/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = source.getPages().map((post) => ({
    url: `${SITE_URL}${post.url}`,
    lastModified: post.data.date.toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const routes = ['', '/tags', '/privacy', '/terms'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...posts];
}

export const dynamic = 'force-static';
