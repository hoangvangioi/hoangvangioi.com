import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { vietnameseTokenizer } from '@/lib/search-tokenizer';

export const revalidate = false;

/**
 * Static search index, downloaded and queried entirely in the browser.
 *
 * 'simple' instead of 'advanced': the advanced export ships the raw database
 * including index.frequencies (~657 KB) and sorting.sorts (~309 KB, unused),
 * i.e. 1.54 MB raw / 247 KB gzipped for 19 posts. 'simple' stores one flat
 * document per page and returns one hit per page instead of per section.
 *
 * Do not pass `language` together with `tokenizer` — the engine throws
 * NO_LANGUAGE_WITH_CUSTOM_TOKENIZER.
 */
export const { staticGET: GET } = createSearchAPI('simple', {
  tokenizer: vietnameseTokenizer,
  indexes: source.getPages().map((page) => {
    const { headings, contents } = page.data.structuredData;

    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      // Rendered inline with `›` separators above the title, so it must stay a
      // short path: one joined segment here, not the page's heading list.
      breadcrumbs:
        page.data.tags.length > 0 ? [page.data.tags.join(' · ')] : [],
      // Headings go into `content` so section titles stay searchable; the field
      // is indexed only, never displayed.
      content: [
        ...headings.map((heading) => heading.content),
        ...contents.map((block) => block.content),
      ].join('\n'),
      keywords: page.data.tags.join(' '),
    };
  }),
});
