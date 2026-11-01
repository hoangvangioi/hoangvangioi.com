import type { MetadataRoute } from 'next';
import { SITE_URL, siteUrl } from '@/lib/shared';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/404', '/~offline'],
    },
    sitemap: siteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}

export const dynamic = 'force-static';
