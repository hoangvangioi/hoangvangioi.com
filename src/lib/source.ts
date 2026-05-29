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

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
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

export function getTags() {
  const map = new Map<string, TagInfo>();
  for (const page of source.getPages()) {
    for (const tag of page.data.tags) {
      if (map.has(tag)) {
        map.get(tag)!.count++;
      } else {
        map.set(tag, { count: 1 });
      }
    }
  }
  return map;
}
