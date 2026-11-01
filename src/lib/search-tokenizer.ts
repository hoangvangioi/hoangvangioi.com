import type { Tokenizer } from 'zbsearch';

/**
 * Vietnamese tokenizer for ZBSearch. The built-in tokenizers do not fold
 * diacritics, so tone-less queries ("huong dan") miss; splitting on non-ASCII
 * letters (the old Orama behaviour) shredded words instead. This module must
 * stay isomorphic: the server builds the index with it and the client queries
 * with it, so any mismatch means no results.
 */
const SPLIT_RULE = /[^\p{L}\p{N}_'-]+/u;

export function stripTones(input: string): string {
  return (
    input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // NFD does not decompose U+0111/U+0110.
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  );
}

export function tokenize(input: string): string[] {
  return Array.from(
    new Set(
      input.toLowerCase().split(SPLIT_RULE).map(stripTones).filter(Boolean),
    ),
  );
}

// Bookkeeping for save()/load() only; splitting is done by `tokenize`.
const TOKENIZER_LANGUAGE = 'english';

export const vietnameseTokenizer: Tokenizer = {
  language: TOKENIZER_LANGUAGE,
  normalizationCache: new Map(),
  // The engine passes non-strings for array fields (e.g. `breadcrumbs`).
  tokenize: (raw) =>
    typeof raw === 'string' ? tokenize(raw) : [raw as unknown as string],
};
