import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { vietnameseTokenizer } from '@/lib/search-tokenizer';

export const revalidate = false;

// 'simple' exports one flat document per page; 'advanced' would ship the raw
// database (~1.5 MB) including unused frequency and sorting tables.
// Passing `language` together with `tokenizer` throws.
export const { staticGET: GET } = createSearchAPI('simple', {
  tokenizer: vietnameseTokenizer,
  indexes: source.getPages().map((page) => {
    const { headings, contents } = page.data.structuredData;

    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      // Rendered as an inline `›`-separated path, so keep it to one segment.
      breadcrumbs:
        page.data.tags.length > 0 ? [page.data.tags.join(' · ')] : [],
      // Indexed but not displayed; headings included so section titles match.
      content: [
        ...headings.map((heading) => heading.content),
        ...contents.map((block) => block.content),
      ].join('\n'),
      keywords: page.data.tags.join(' '),
    };
  }),
});
