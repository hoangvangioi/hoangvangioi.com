import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { vietnameseTokenizer } from '@/lib/search-tokenizer';

export const revalidate = false;

/**
 * Index tìm kiếm tĩnh (client tự tải về rồi query trong browser).
 *
 * Dùng `'simple'` thay vì `'advanced'`:
 *  - `'advanced'` export nguyên DB Orama kèm `index.frequencies` (~657 KB),
 *    `sorting.sorts` (~309 KB — không hề dùng sorting) và `docs` (~347 KB):
 *    tổng 1.54 MB thô / 247 KB gzip cho 19 bài viết, client phải tải + parse
 *    toàn bộ ngay lần gõ tìm kiếm đầu tiên.
 *  - `'simple'` chỉ lưu 1 document/trang với các field string → nhẹ hơn nhiều,
 *    và kết quả trả về theo trang (không lặp nhiều section của cùng 1 bài).
 *
 * Lưu ý: KHÔNG được truyền `language` khi đã truyền `tokenizer` — Orama sẽ
 * throw `NO_LANGUAGE_WITH_CUSTOM_TOKENIZER`.
 */
export const { staticGET: GET } = createSearchAPI('simple', {
  tokenizer: vietnameseTokenizer,
  indexes: source.getPages().map((page) => {
    const { headings, contents } = page.data.structuredData;

    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      breadcrumbs: headings.map((heading) => heading.content),
      content: contents.map((block) => block.content).join('\n'),
      // giúp tìm theo tên thẻ ("vim", "adb", "malloc"...)
      keywords: page.data.tags.join(' '),
    };
  }),
});
