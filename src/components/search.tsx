'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from 'zbsearch';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { vietnameseTokenizer } from '@/lib/search-tokenizer';

/**
 * Fumadocs v16.10+ dùng ZBSearch thay Orama, và `initOrama` đã bị đánh dấu
 * deprecated → dùng `initDB`.
 */
function initDB() {
  return create({
    schema: { _: 'string' },
    // PHẢI dùng đúng tokenizer đã build index ở `src/app/api/search/route.ts`,
    // nếu không token phía query lệch với token phía index và không match.
    // Không truyền `language` kèm `tokenizer` (engine sẽ throw
    // NO_LANGUAGE_WITH_CUSTOM_TOKENIZER).
    // Chi tiết lý do cần tokenizer riêng: xem `src/lib/search-tokenizer.ts`.
    components: { tokenizer: vietnameseTokenizer },
  });
}

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n(); // (optional) for i18n
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initDB,
    locale,
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
