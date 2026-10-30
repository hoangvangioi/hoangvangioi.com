import type { MetadataRoute } from 'next';
import { SITE_URL, siteUrl } from '@/lib/shared';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/404', '/~offline'],
    },
    // `siteUrl` tự bỏ slash cuối cho route dạng file (`/sitemap.xml`)
    sitemap: siteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}

export const dynamic = 'force-static';
