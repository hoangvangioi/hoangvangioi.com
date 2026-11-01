import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { vietnameseTokenizer } from '@/lib/search-tokenizer';

export const revalidate = false;

/**
 * Static search index, downloaded and queried entirely in the browser.
 *
 * Use 'simple' to keep the search index lightweight.
 *
 * Do not pass 'language' together with 'tokenizer' — the engine throws
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
      // Keep breadcrumbs as a single short path.
      breadcrumbs:
        page.data.tags.length > 0 ? [page.data.tags.join(' · ')] : [],
      // Headings are indexed but never displayed.
      content: [
        ...headings.map((heading) => heading.content),
        ...contents.map((block) => block.content),
      ].join('\n'),
      keywords: page.data.tags.join(' '),
    };
  }),
});
