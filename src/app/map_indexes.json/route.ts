import { utils } from '@/utils/source'
import type { StructuredData } from 'fumadocs-core/mdx-plugins'

type Index = {
	id: string
	title: string
	description?: string
	url: string
	structuredData: StructuredData
}

export function GET() {
	const indexes: Index[] = utils.getPages().map((page) => ({
		id: page.url,
		title: page.data.title,
		url: page.url,
		structuredData: page.data.exports.structuredData,
	}))
	return Response.json(
		{ indexes },
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			status: 200,
		},
	)
}
