import RSS from 'rss'
import { utils } from '@/utils/source'
import { SITE_URL, site } from '@config'

export function GET() {
	const feed = new RSS({
		title: `${site.site_name} Blog`,
		description: `${site.site_name} Blog`,
		generator: 'RSS for Node and Next.js',
		feed_url: `${SITE_URL}/feed.xml`,
		site_url: `${SITE_URL}`,
		image_url: `${SITE_URL}/favicon.ico`,
		managingEditor: `${site.email} (${site.author})`,
		webMaster: `${site.email} (${site.author})`,
		copyright: `Copyright ${new Date().getFullYear().toString()}, ${site.author}`,
		language: 'vi',
		pubDate: new Date().toUTCString(),
		ttl: 60,
	})

	utils.getPages().map((post) => {
		feed.item({
			title: post.data.title,
			description: post.data.description ?? '',
			guid: `${SITE_URL}${post.url}`,
			url: `${SITE_URL}${post.url}`,
			categories: post.data.tags || [],
			author: post.data.authors[0],
			date: post.data.date,
		})
	})

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
		},
		status: 200,
	})
}
