import { LinkButton } from '@/components/mdx'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTagHref, getTags } from '@/utils/tags'
import { type TagInfo } from '@/utils/types'
import { domain } from '@config'

export const metadata: Metadata = {
	alternates: {
		canonical: `${domain}/tags`,
	},
}

export default function AllTags() {
	const tags: [string, TagInfo][] = [...getTags().entries()].sort((a, b) => b[1].count - a[1].count)

	return (
		<main className="my-16 flex w-full flex-col gap-3">
			<div className="mb-3 flex flex-col gap-3">
				<h1 className="mb-4 text-center text-5xl font-bold">Tất cả các thẻ</h1>
				<LinkButton href="/" wrapper={{ className: 'mx-auto' }} variant="primary">
					Xem bài viết
				</LinkButton>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{tags.map(([tag, info]) => (
					<Link
						key={tag}
						href={getTagHref(tag)}
						className="flex flex-row justify-between gap-3 rounded-md border bg-card p-2 text-card-foreground"
					>
						<span className="font-medium">{tag}</span>
						<span className="text-sm text-muted-foreground">{info.count}</span>
					</Link>
				))}
			</div>
		</main>
	)
}
