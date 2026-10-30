import { loader } from 'fumadocs-core/source';
import { docsContentRoute, docsImageRoute } from './shared';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { posts } from 'collections/server';
import { type TagInfo } from '@/lib/shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/posts',
  source: toFumadocsSource(posts, []),
});

export type Post = ReturnType<typeof source.getPage>;

/**
 * Danh sách bài viết đã sort mới → cũ, cache ở module scope.
 *
 * Nội dung MDX là bất biến sau khi build, nhưng trước đây trang chủ / trang tag
 * / sitemap / feed đều tự sort lại `source.getPages()` mỗi lần render
 * (O(n log n) + cấp phát mảng mới). Cache lại một lần cho gọn.
 */
let sortedCache: ReturnType<typeof source.getPages> | undefined;

export function sortedPages(): NonNullable<typeof sortedCache> {
  sortedCache ??= [...source.getPages()].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  return sortedCache;
}

/**
 * Ảnh Open Graph của bài viết, sinh bởi `src/app/og/posts/[slug]/route.tsx`.
 *
 * Trước đây hàm này trả về `url` = `/og/posts/<slug>/image.png` — nhưng route
 * chỉ có MỘT segment `[slug]`, nên URL đó 404 (file thật trong `out/` là
 * `og/posts/<slug>`, không có đuôi). Vì metadata chưa từng tham chiếu ảnh OG
 * nên lỗi này không bị phát hiện; nay đã nối vào `openGraph.images` nên phải
 * trả về đúng URL của route.
 *
 * `segments[0]` vẫn là slug — `generateStaticParams` của route OG đang dùng.
 */
export function getPageImage(page: (typeof source)['$inferPage']) {
  return {
    segments: page.slugs,
    url: `${docsImageRoute}/${page.slugs.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, ''];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

export function getTagHref(tag: string) {
  return `/tags/${tag.toLowerCase()}`.replace(/\s+/g, '-');
}

/** Slug hoá tên thẻ — dùng chung cho `getTagHref` và `generateStaticParams`. */
export function slugifyTag(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

let tagsCache: Map<string, TagInfo> | undefined;

/**
 * Đếm số bài theo thẻ, cache ở module scope.
 *
 * Trước đây `/tags` gọi `getTags()` để render, rồi `generateStaticParams` của
 * `/tags/[tag]` gọi lại lần nữa (và `sitemap.ts` cũng tự duyệt lại toàn bộ
 * pages) — mỗi lần là một vòng lặp qua mọi bài viết + mọi thẻ.
 */
export function getTags(): Map<string, TagInfo> {
  if (tagsCache) return tagsCache;

  const map = new Map<string, TagInfo>();
  for (const page of source.getPages()) {
    for (const tag of page.data.tags) {
      const info = map.get(tag);
      if (info) info.count++;
      else map.set(tag, { count: 1 });
    }
  }

  tagsCache = map;
  return map;
}
