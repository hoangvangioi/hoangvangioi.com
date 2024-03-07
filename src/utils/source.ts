import { createMDXSource, defaultSchemas } from 'fumadocs-mdx'
import { z } from 'zod'
import { map } from '@/.map'
import { type InferMetaType, type InferPageType, loader } from 'fumadocs-core/source'

const frontmatterSchema = defaultSchemas.frontmatter.extend({
	tags: z.array(z.string()).default([]),
	image: z.string().optional(),
	authors: z.array(z.string()).default([]),
	date: z
		.string()
		.transform((s) => new Date(s))
		.default(new Date().toISOString()),
})

export const utils = loader({
	baseUrl: '/posts',
	source: createMDXSource(map, {
		schema: {
			frontmatter: frontmatterSchema,
		},
	}),
})

export type Page = InferPageType<typeof utils>
export type Meta = InferMetaType<typeof utils>
