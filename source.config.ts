import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeImgSize from 'rehype-img-size';
import remarkDirective from 'remark-directive';
import {
  remarkImage,
  rehypeCode,
  remarkDirectiveAdmonition,
} from 'fumadocs-core/mdx-plugins';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const posts = defineCollections({
  type: 'doc',
  dir: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    authors: z.array(z.string()).default([]),
    date: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : new Date())),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
    remarkPlugins: [
      remarkMath,
      remarkImage,
      remarkDirective,
      remarkDirectiveAdmonition,
    ],
    rehypePlugins: (v) => [
      rehypeKatex,
      [rehypeImgSize, { dir: 'public' }],
      rehypeCode,
      ...v,
    ],
  },
});
