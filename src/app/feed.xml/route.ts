import { Feed } from 'feed';
import { source } from '@/lib/source';
import { SITE_URL, site } from '@/lib/shared';

export function GET() {
  const feed = new Feed({
    title: `${site.site_name} Blog`,
    description: `${site.site_name} Blog`,
    id: SITE_URL,
    link: SITE_URL,
    language: 'vi',
    image: `${SITE_URL}/favicon.ico`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `Copyright ${new Date().getFullYear()}, ${site.author}`,
    generator: 'Feed for Next.js',
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
    },
    author: {
      name: site.author,
      email: site.email,
      link: SITE_URL,
    },
  });

  source.getPages().forEach((post) => {
    feed.addItem({
      title: post.data.title,
      id: `${SITE_URL}${post.url}`,
      link: `${SITE_URL}${post.url}`,
      description: post.data.description ?? '',
      category: (post.data.tags || []).map((tag) => ({
        name: tag,
      })),
      author: [
        {
          name: post.data.authors?.[0] ?? site.author,
        },
      ],
      date: new Date(post.data.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
    status: 200,
  });
}

export const dynamic = 'force-static';
