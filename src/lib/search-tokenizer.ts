import type { Tokenizer } from 'zbsearch';

/**
 * Vietnamese tokenizer for ZBSearch (Fumadocs' search engine since v16.10).
 *
 * The built-in tokenizers do not fold diacritics, so searching without tones —
 * a very common Vietnamese typing style — fails: "huong dan" matched the wrong
 * post, "ky thuat" and "bo nho" matched nothing. Splitting on non-ASCII letters
 * (the old Orama `english` behaviour) was worse still: "Hướng dẫn debug"
 * became ["h","ng","d","n","debug"].
 *
 * Split on Unicode word boundaries first, then fold tones, so "Hướng dẫn" and
 * "huong dan" normalize to the same tokens. This module must stay isomorphic:
 * the server route builds the index with it and the client queries with it,
 * and any mismatch between the two means no results.
 */

/** Keeps letters of any script, digits, `_`, `'` and `-`. */
const SPLIT_RULE = /[^\p{L}\p{N}_'-]+/u;

/**
 * Folds Vietnamese tones: 'Hướng' -> 'huong'.
 * `đ`/`Đ` (U+0111/U+0110) are not decomposed by NFD, so replace them by hand.
 */
export function stripTones(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/** Lowercases, splits, folds tones and de-duplicates. */
export function tokenize(input: string): string[] {
  const tokens = input
    .toLowerCase()
    .split(SPLIT_RULE)
    .map(stripTones)
    .filter(Boolean);

  return Array.from(new Set(tokens));
}

// Only bookkeeping for save()/load(); the actual splitting is done by
// `tokenize` below, so this label does not affect results.
const TOKENIZER_LANGUAGE = 'english';

export const vietnameseTokenizer: Tokenizer = {
  language: TOKENIZER_LANGUAGE,
  normalizationCache: new Map(),
  // The engine passes non-string values for array fields (e.g. `breadcrumbs`);
  // keep the default tokenizer's behaviour for those.
  tokenize: (raw) =>
    typeof raw === 'string' ? tokenize(raw) : [raw as unknown as string],
};
