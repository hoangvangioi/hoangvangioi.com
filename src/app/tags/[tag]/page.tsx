import type { Metadata } from 'next'
import { BlogItem } from '@/components/BlogItem'
import { LinkButton } from '@/components/LinkButton'
import { getTags } from '@/utils/tags'
import { utils } from '@/utils/source'
import { domain } from '@config'

export default function TagPage({ params }: { params: { tag: string } }) {
	const decodedTag = decodeURIComponent(params.tag)
	const pages = utils
		.getPages()
		.filter((blog) => blog.data.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, '-') === decodedTag))

	return (
		<main className="my-16 flex w-full flex-1 flex-col gap-5">
			<div className="mb-5 flex flex-col gap-5">
				<h1 className="mb-4 text-center text-3xl font-bold">
					{`Bài viết được gắn thẻ`}
					<span className="text-blue-500 dark:text-amber-300">
						{` ${decodedTag.replace(/(\b\w)|-/g, (_, letter: string | undefined) => (letter ? letter.toUpperCase() : ' '))}`}
					</span>
				</h1>
				<LinkButton href="/tags" className="mx-auto">
					Tất cả các thẻ
				</LinkButton>
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				{pages.map((page) => (
					<BlogItem key={page.data.title} page={page} />
				))}
			</div>
		</main>
	)
}

export function generateStaticParams() {
	const tags = [...getTags().keys()]
	console.log(`Generating ${tags.length} tag pages...`)
	return tags.map((key) => ({
		tag: key.toLowerCase().replace(/\s+/g, '-'),
	}))
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
	const decodedTag = decodeURIComponent(params.tag)

	return {
		title: `Bài viết được gắn thẻ ${decodedTag}`,
		alternates: {
			canonical: `${domain}/tags/${params.tag}`,
		},
		openGraph: {
			images: '/cover.png',
			title: `Bài viết được gắn thẻ ${decodedTag}`,
		},
	}
}
