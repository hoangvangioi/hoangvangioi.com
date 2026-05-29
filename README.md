# Personal Tech Blog

This is my personal blog and documentation website, powered by [Next.js](https://nextjs.org/) and successfully upgraded to **[Fumadocs v16](https://fumadocs.dev)** with [Static Export](https://nextjs.org/docs/app/guides/static-exports) configured.

> **Repository Note:** This project underwent a major migration. The legacy Fumadocs v8 source code and the old standalone `search-api` repository have been archived into separate Git branches (`old-v8` and `search-api`) to preserve their commit histories. The search functionality is now fully integrated directly within this main repository.

---

## Getting Started

First, install the dependencies and run the development server:

```bash
npm install
npm dev
# or use pnpm / yarn if preferred
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---

## Project Structure

Here are the key files and directories you should know about if you want to explore or contribute:

### Content & Layout Configuration

* `lib/source.ts`: Content source adapter using Fumadocs [`loader()`](https://fumadocs.dev/docs/headless/source-api) to fetch and manage MDX files.
* `lib/layout.shared.tsx`: Shared UI options and configurations for layouts.
* `source.config.ts`: Main configuration for Fumadocs MDX (frontmatter schema, collections, etc.).

### Routing Table

| Route / File | Type | Description |
| :--- | :--- | :--- |
| `app/(home)/page.tsx` | Page | The main landing page of your blog. |
| `app/posts/[slug]/page.tsx`| Dynamic Page | Main blog post renderer powered by Fumadocs v16. |
| `app/api/search/route.ts` | Route Handler | Internal search API integration. |
| `app/feed.xml/route.ts` | RSS Feed | Automatically generates RSS feed for SEO. |
| `app/llms.txt/route.ts` | AI Friendly | Provides full blog context optimized for LLMs/AI crawlers. |
| `app/og/posts/[slug]/route.tsx`| Dynamic Image | Dynamically generates Open Graph sharing images for each post. |

---

## Contribution & Development

If you wish to contribute or clone this for your own use:

1. Make sure your local environment matches the requirements for **Fumadocs v16**.
2. All content is written in MDX and located in the configured content directories.
3. Refer to the [Fumadocs MDX Documentation](https://fumadocs.dev/docs/mdx) for customizing frontmatter schemas.

---

## Learn More

* [Fumadocs Documentation](https://fumadocs.dev) - Learn more about Fumadocs features and components.
* [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and APIs.
