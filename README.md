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

Fonts are self-hosted in `public/fonts/` (Inter variable, SIL OFL 1.1) and the
KaTeX assets in `public/vendor/katex/`, so a build needs no third-party network
access. `npm run build` writes the static export to `out/` and `npm start`
serves it locally. CI (`.github/workflows/ci.yml`) runs typecheck → lint →
prettier → build, then verifies `out/`.

### Scripts

| Command                | Description                                              |
| :--------------------- | :------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                     |
| `npm run build`        | Build the static export into `out/`                      |
| `npm start`            | Serve `out/` locally                                     |
| `npm run types:check`  | Generate `.source/` and route types, then `tsc --noEmit` |
| `npm run lint`         | ESLint (flat config, `eslint-config-next`)               |
| `npm run format`       | Prettier, write                                          |
| `npm run format:check` | Prettier, check only                                     |
| `npm run check`        | All four above plus a build                              |

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

All three are read at **build time** (`output: 'export'`), so set them before
`npm run build` — CI included. Leaving both AdSense variables empty turns ads
off entirely: no `<ins>` is rendered, `adsbygoogle.js` is not loaded, and
`ads.txt` returns an empty body.

---

## Project structure

### Content and configuration

- `content/*.mdx` — the posts. Frontmatter: `title`, `description`, `tags`,
  `image`, `authors`, `date`, `math`.
- `source.config.ts` — frontmatter schema (Zod) plus the remark/rehype plugins.
- `src/lib/source.ts` — Fumadocs
  [`loader()`](https://fumadocs.dev/docs/headless/source-api) adapter, with
  `sortedPages()` and `getTags()`.
- `src/lib/shared.ts` — site constants, `SITE_URL`, the `siteUrl()` /
  `siteFileUrl()` helpers, social links, footer copy.
- `src/lib/search-tokenizer.ts` — the Vietnamese tokenizer.
- `src/lib/date.ts` — `vi-VN` date formatting in `Asia/Ho_Chi_Minh`.
- `src/lib/layout.shared.tsx` — header options.
- `src/components/mdx.tsx` — the MDX component map.
- `public/_headers` — Netlify cache and content-type rules.

### Routes

| Route / file                                                   | Kind          | Description                                                |
| :------------------------------------------------------------- | :------------ | :--------------------------------------------------------- |
| `src/app/(home)/page.tsx`                                      | Page          | Home: intro plus the post grid                             |
| `src/app/posts/[slug]/page.tsx`                                | Dynamic page  | Post renderer (Fumadocs `DocsPage`)                        |
| `src/app/(home)/tags/[tag]/page.tsx`                           | Dynamic page  | Posts filtered by tag                                      |
| `src/app/api/search/route.ts`                                  | Route handler | Static search index (`/api/search`) for client-side search |
| `src/app/feed.xml/route.ts`                                    | RSS feed      | RSS 2.0, newest first                                      |
| `src/app/sitemap.ts` · `src/app/robots.ts`                     | SEO           | Sitemap and robots (URLs match `trailingSlash: true`)      |
| `src/app/manifest.ts`                                          | PWA           | Web manifest                                               |
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
- Set `math: true` only for posts that contain LaTeX; the KaTeX stylesheet is
  linked on those pages alone.
- Always set `date`: the schema fallback is the build time, which would make the
  post the newest one on every rebuild.
- `authors` are keys of the `authors` map in `src/lib/shared.ts` (default `gioi`).
- Available MDX components: `<Info>`, `<Tip>`, `<Warning>`, `<Error>`,
  `<Accordion>`, `<Tabs>`, `<Steps>`, `<Files>`, `<TypeTable>`, `<LinkButton>`,
  `<Adsense>`.

### Notes

- `fumadocs-mdx` is pinned to `15.0.8`; later versions break the Turbopack
  build.
- Search has to use the same tokenizer on both sides:
  `src/app/api/search/route.ts` (index) and `src/components/search.tsx` (query).

---

## Learn more

- [Fumadocs Documentation](https://fumadocs.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
