# Hoàng Văn Giỏi — Personal Tech Blog

A personal blog about C/C++ programming, Embedded Linux, firmware and
microcontrollers. Built with [Next.js](https://nextjs.org/) (App Router,
**Static Export**) and [Fumadocs v16](https://fumadocs.dev).

> **Repository history:** the legacy Fumadocs v8 source and the separate
> `search-api` repository are preserved in the `old-v8` and `search-api`
> branches. Search now lives in this repository.

---

## Getting started

Requires **Node >= 22** (see `engines` in `package.json`).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> The build needs **no network access for fonts**: Inter is self-hosted in
> `public/fonts/` (variable font, wght 100–900, Vietnamese subset, SIL OFL 1.1).
> It used to come from `next/font/google`, which made the build fail hard
> whenever `fonts.googleapis.com` was unreachable.

### Scripts

| Command                | Description                                              |
| :--------------------- | :------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                     |
| `npm run build`        | Build the static export into `out/`                      |
| `npm start`            | Serve `out/` locally                                     |
| `npm run types:check`  | Generate `.source/` and route types, then `tsc --noEmit` |
| `npm run lint`         | ESLint (flat config, `eslint-config-next`)               |
| `npm run format`       | Prettier, write                                          |
| `npm run format:check` | Prettier, check only (this is what CI runs)              |
| `npm run check`        | All four above plus a build — run it before pushing      |

CI: `.github/workflows/ci.yml` (typecheck → lint → prettier → build → verify
`out/`).

---

## Environment variables

```bash
cp .env.example .env.local
```

| Variable                | Required | Default                    | Used for                                                          |
| :---------------------- | :------- | :------------------------- | :---------------------------------------------------------------- |
| `SITE_URL`              | No       | `https://hoangvangioi.com` | `sitemap.xml`, `robots.txt`, `feed.xml`, canonical URLs, OG tags  |
| `NEXT_PUBLIC_AD_CLIENT` | No       | _(empty = ads off)_        | AdSense publisher ID, **numeric part only** (code adds `ca-pub-`) |
| `NEXT_PUBLIC_AD_SLOT`   | No       | _(empty = ads off)_        | AdSense slot ID                                                   |

Every variable is read at **build time** (`output: 'export'`), so it has to be
set before `npm run build` — CI included. When both AdSense variables are empty,
ads are off completely: no `<ins>` is rendered, `adsbygoogle.js` is never
loaded, and `ads.txt` returns an empty body instead of a malformed
`google.com, pub-, DIRECT, ...` line.

---

## Project structure

### Content and configuration

- `content/*.mdx` — the posts. Frontmatter: `title`, `description`, `tags`,
  `image`, `authors`, `date`, `math`.
- `source.config.ts` — frontmatter schema (Zod) plus the remark/rehype plugins.
- `src/lib/source.ts` — Fumadocs
  [`loader()`](https://fumadocs.dev/docs/headless/source-api) adapter, with
  `sortedPages()` / `getTags()` cached at module scope.
- `src/lib/shared.ts` — site constants, `SITE_URL`, the `siteUrl()` /
  `siteFileUrl()` helpers, social links, footer copy.
- `src/lib/search-tokenizer.ts` — the Vietnamese tokenizer, shared by index
  build time and query time.
- `src/lib/date.ts` — `vi-VN` date formatting pinned to `Asia/Ho_Chi_Minh`.
- `src/lib/layout.shared.tsx` — header options.

### Routes

| Route / file                                                   | Kind          | Description                                                |
| :------------------------------------------------------------- | :------------ | :--------------------------------------------------------- |
| `src/app/(home)/page.tsx`                                      | Page          | Home: intro plus the post grid                             |
| `src/app/posts/[slug]/page.tsx`                                | Dynamic page  | Post renderer (Fumadocs `DocsPage`)                        |
| `src/app/(home)/tags/[tag]/page.tsx`                           | Dynamic page  | Posts filtered by tag                                      |
| `src/app/api/search/route.ts`                                  | Route handler | Static search index (`/api/search`) for client-side search |
| `src/app/feed.xml/route.ts`                                    | RSS feed      | RSS 2.0, newest first                                      |
| `src/app/sitemap.ts` · `src/app/robots.ts`                     | SEO           | Sitemap and robots (URLs match `trailingSlash: true`)      |
| `src/app/manifest.ts`                                          | PWA           | Web manifest (trimmed icon set)                            |
| `src/app/og/posts/[slug]/route.tsx`                            | Dynamic image | 1200×630 Open Graph image per post                         |
| `src/app/llms.txt` · `llms-full.txt` · `llms.mdx/posts/[slug]` | AI friendly   | Plain text / markdown for LLMs and AI crawlers             |

### Writing a post

```mdx
---
title: 'Post title'
description: 'Short description used for SEO and RSS.'
authors: [gioi]
date: '2026-01-15T10:00:00.000Z'
tags: ['C', 'Linux']
image: '/posts/post-slug/cover.webp'
math: false
---
```

- Put the cover image in `public/posts/<post-slug>/cover.webp` (WebP, about
  1200×630).
- Set `math: true` only for posts that contain LaTeX: the KaTeX stylesheet
  (22,660 B, 3,487 B gzipped) is linked on those pages alone.
- `authors` are keys of the `authors` map in `src/lib/shared.ts` (default
  `gioi`).
- Always set `date`. The schema allows omitting it, but the fallback is
  `new Date()` at build time, so a post without a date becomes the "newest" one
  on every rebuild: it jumps to the top of the home page, of `feed.xml` and of
  `sitemap.xml`, its `<pubDate>` / `lastModified` keep changing, and it drags
  the site-wide `lastModified` (taken from the newest post) along with it.
- Available MDX components: `<Info>`, `<Tip>`, `<Warning>`, `<Error>`,
  `<Accordion>`, `<Tabs>`, `<Steps>`, `<Files>`, `<TypeTable>`, `<LinkButton>`,
  `<Adsense>` (see `src/components/mdx.tsx`).

---

## Optimization notes

- **Vietnamese search.** The engine fumadocs uses (`zbsearch`, previously Orama)
  has no `vietnamese` language, and its `english` / `multilingual` splitters
  treat every Vietnamese letter as a separator (`'Hướng dẫn'` →
  `['h', 'ng', 'd', 'n']`) without folding diacritics (`'huong dan'` → zero or
  wrong hits). `src/lib/search-tokenizer.ts` splits on Unicode boundaries first
  and folds diacritics afterwards (NFD plus a manual `đ`/`Đ`, because NFD does
  not decompose U+0111), so both `huong dan` and `hướng dẫn` match. The very
  same tokenizer **must** run on the server (`src/app/api/search/route.ts`) and
  on the client (`src/components/search.tsx`). Never pass `language` alongside a
  custom tokenizer — the engine throws `NO_LANGUAGE_WITH_CUSTOM_TOKENIZER`.
- **KaTeX.** The stylesheet and fonts are served from `public/vendor/katex/` and
  `<link>`ed only when the frontmatter sets `math: true`. Do not
  `import 'katex/dist/katex.css'`: Turbopack collects CSS through the page
  module graph, so both a conditionally rendered component and a dynamic import
  still attached the 33 KB stylesheet to **all 19** post pages (measured, both
  approaches fail). Only the 20 `.woff2` files are vendored (263,888 B) instead
  of the full woff2/woff/ttf set (1,080,668 B), and the `,url(...woff)` /
  `,url(...ttf)` fallbacks were stripped from the CSS, leaving 20 `url()`
  references. No post sets `math: true` today, so 0 of 19 pages ship the
  stylesheet. See `public/vendor/katex/README.md`.
- **Open Graph images.** `/og/posts/<slug>` writes extension-less files into
  `out/`, so `public/_headers` sets `Content-Type: image/png` for `/og/*`.
  `_headers` is a Netlify feature: a local `serve out` answers
  `application/octet-stream`, which is expected.
- **Fonts.** Inter is a variable-weight font, so `font-bold` / `font-extrabold`
  / `font-black` render real weights instead of browser-synthesized faux bold.

## Dependencies and security

`package.json` carries `overrides` for two **build-time / dev-only** packages:

| Override              | Reason                                                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `compression: ^1.8.2` | `serve@14.2.6` hard-pins `1.8.1` (DoS, GHSA-vc2v-76pw-4v95). Affects `npm start` and CI only, never shipped to a browser.                                                                                                |
| `katex: ^0.18.10`     | `rehype-katex` / `micromark-extension-math` pull two nested copies of `0.16.47` (prototype pollution, GHSA-238p-pmpm-9mq7). Forcing `0.18.10` patches it and **matches the version** vendored in `public/vendor/katex/`. |

**`image-size` is deliberately NOT overridden to 2.x**, even though `npm audit`
reports one high:

- v2 dropped path support: `imageSize('/path/to.png')` throws a `TypeError`, and
  reading a file moved to `image-size/fromFile` (async).
- `rehype-img-size@1.0.1` calls `sizeOf(src)` where `src` is a **path**, and that
  package only ever published 1.0.0 / 1.0.1 — no version supports v2.
- Overriding to v2 turns `npm audit` green but plants a trap: 0 of the 19 posts
  currently embed an inline MDX image (covers render through `next/image`), so
  `sizeOf` is never called and the build passes. The first post that embeds an
  MDX image would break it. Verified experimentally in both directions.
- The real exposure of that CVE (an infinite loop while parsing JXL/HEIF/ICNS) is
  zero here: the plugin only reads WebP/PNG/JPEG images **already committed to
  the repo**, at build time, with no user input.

For a fully clean audit later: either drop `rehype-img-size` from
`source.config.ts` (it currently does nothing) or wait for an upstream release
that supports `image-size` v2.

**The 18 moderate `minimatch` advisories are expected and left alone on
purpose.** They all trace back to one root — `minimatch <11.0.1` (denial of
service via globparts amplification, CVE-2026-118764) — reached through the
ESLint dependency tree (`@eslint/config-array`, `@eslint/eslintrc`,
`@typescript-eslint/typescript-estree`, `eslint-plugin-import`,
`eslint-plugin-jsx-a11y`, `eslint-plugin-react`) plus `serve-handler`. All of it
is dev-only and none of it ships to a browser.

Do **not** run `npm audit fix --force` here: the "fix" npm proposes is
downgrading `eslint` to 4.0.0, `eslint-config-next` to 12.0.4 or `serve` to
6.5.8. Overriding `minimatch` to 11.x is not an option either — ESLint 9 calls
`minimatch()` as a function and v11 changed the export shape, which breaks
linting. Revisit once ESLint's own tree moves to a patched minimatch.

For reference, `npm audit` went from 9 advisories before this work (3 high:
`compression` twice and `image-size`, plus 2 moderate and 4 low) to 19 (1 high —
`image-size`, deliberate; 18 moderate — `minimatch`, dev-only; 0 low).

`fumadocs-mdx` is **pinned to `15.0.8`** — a deliberate exception to the
dependency upgrades. `15.4.10` breaks the Turbopack build: its
`dist/webpack/macro.js` (line 16 of the published tarball) only skips non-macro
files when the bundler type is `"webpack"`, so under Turbopack the loader always
calls `transformMacroModule` → `analyzeModule` and parses MDX frontmatter as
JavaScript:
`content/c-programming-file-handling.mdx:1:3: Invalid operand for
increment/decrement operator`. The missing peers (`rolldown`, `satteri`) are not
the cause.

---

## Learn more

- [Fumadocs Documentation](https://fumadocs.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
