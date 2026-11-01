import type { Tokenizer } from 'zbsearch';

/**
 * Vietnamese tokenizer for ZBSearch (Fumadocs' search engine since v16.10).
 *
 * Built-in tokenizers do not fold diacritics, causing searches without tones
 * to fail. Splitting on non-ASCII letters also breaks Vietnamese characters.
 *
 * Split on Unicode word boundaries first, then fold tones so "Hướng dẫn"
 * and "huong dan" normalize to the same tokens.
 *
 * Must stay isomorphic: the server builds the index and the client queries
 * with the same tokenizer.
 */

/** Keeps letters of any script, digits, `_`, `'` and `-`. */
const SPLIT_RULE = /[^\p{L}\p{N}_'-]+/u;

/**
 * Folds Vietnamese tones: 'Hướng' -> 'huong'.
 * `đ`/`Đ` are not decomposed by NFD, so replace them manually.
 */
export function stripTones(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function tokenize(input: string): string[] {
  const tokens = input
    .toLowerCase()
    .split(SPLIT_RULE)
    .map(stripTones)
    .filter(Boolean);

  return Array.from(new Set(tokens));
}

// Used only for save()/load(); actual tokenization is handled by `tokenize`.
const TOKENIZER_LANGUAGE = 'english';

export const vietnameseTokenizer: Tokenizer = {
  language: TOKENIZER_LANGUAGE,
  normalizationCache: new Map(),
  // Preserve default behavior for non-string fields such as `breadcrumbs`.
  tokenize: (raw) =>
    typeof raw === 'string' ? tokenize(raw) : [raw as unknown as string],
};
