import type { MetadataRoute } from 'next'
import { SITE_URL } from '@config'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: ['/'],
			disallow: ['/404', '/~offline'],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: `${SITE_URL}`,
	}
}
