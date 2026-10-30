import { Feed } from 'feed';
import { sortedPages } from '@/lib/source';
import { SITE_URL, site, siteUrl } from '@/lib/shared';

export function GET() {
  const feed = new Feed({
    title: `${site.site_name} Blog`,
    description: site.description,
    id: SITE_URL,
    link: siteUrl('/'),
    language: 'vi',
    image: siteUrl('/icon.png'),
    favicon: siteUrl('/favicon.ico'),
    // Năm cố định theo thời điểm build, không phải `new Date().getFullYear()`
    // lồng trong template (kết quả như nhau nhưng rõ ý hơn).
    copyright: `Copyright ${new Date().getFullYear()}, ${site.author}`,
    generator: 'Feed for Next.js',
    feedLinks: {
      rss2: siteUrl('/feed.xml'),
    },
    author: {
      name: site.author,
      email: site.email,
      link: SITE_URL,
    },
  });

  // `sortedPages()`: RSS phải xếp mới → cũ. Trước đây dùng `source.getPages()`
  // (thứ tự theo file hệ thống) nên thứ tự item trong feed không ổn định.
  sortedPages().forEach((post) => {
    const url = siteUrl(post.url);

    feed.addItem({
      title: post.data.title,
      id: url,
      link: url,
      description: post.data.description ?? '',
      category: post.data.tags.map((tag) => ({ name: tag })),
      author: [
        {
          name: post.data.authors?.[0] ?? site.author,
        },
      ],
      date:
        post.data.date instanceof Date
          ? post.data.date
          : new Date(post.data.date),
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
