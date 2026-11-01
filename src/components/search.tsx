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
import { useStaticSearch } from 'fumadocs-core/search/client';
import { create } from 'zbsearch';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { vietnameseTokenizer } from '@/lib/search-tokenizer';

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const { search, onSearchChange, isLoading, data } = useStaticSearch({
    // Must match the tokenizer that built the index in api/search/route.ts,
    // otherwise query tokens never match index tokens.
    initDB: () =>
      create({
        schema: { _: 'string' },
        components: { tokenizer: vietnameseTokenizer },
      }),
    locale,
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={onSearchChange}
      isLoading={isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={data?.items ?? null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
