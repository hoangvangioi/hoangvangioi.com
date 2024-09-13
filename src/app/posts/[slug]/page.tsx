import { utils } from '@/utils/source'
import { authors, domain } from '@config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsPage, DocsBody } from 'fumadocs-ui/page'
import { ExternalLinkIcon } from 'lucide-react'
import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import { findNeighbour } from 'fumadocs-core/server'
import { GITHUB_REPO, GITHUB_USER } from '@config'
import Embed from '@/components/ui/embed'

export default function BlogPage({ params }: { params: { slug: string } }) {
	const page = utils.getPage([params.slug])

	if (!page) notFound()

	return (
		<div className="container mt-3 flex flex-row gap-6 xl:gap-12">
			<DocsPage
				toc={page.data.exports.toc}
				lastUpdate={page.data.date}
				footer={{
					items: findNeighbour(utils.pageTree, page.url),
				}}
				tableOfContent={{
					footer: (
						<a
							href={`https://github.com/${GITHUB_USER}/${GITHUB_REPO}/tree/main/${page.file.path}`}
							rel="noreferrer noopener"
							target="_blank"
							className="inline-flex items-center text-xs text-muted-foreground hover:text-accent-foreground"
						>
							Chỉnh sửa trên Github <ExternalLinkIcon className="ml-2 h-3 w-3" />
						</a>
					),
				}}
			>
				<DocsBody className="-my-10">
					<div className="mx-1 lg:hidden">
						<InlineTOC items={page.data.exports.toc} />
					</div>
					<page.data.exports.default />
				</DocsBody>
				<Embed />
			</DocsPage>
		</div>
	)
}

export function generateStaticParams() {
	return utils.getPages().map((blog) => ({
		slug: blog.slugs[0],
	}))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	const page = utils.getPage([params.slug])
	if (!page) notFound()

	return {
		title: page.data.title,
		description: page.data.description,
		alternates: {
			canonical: `${domain}/posts/${params.slug}`,
		},
		openGraph: {
			type: 'article',
			tags: page.data.tags,
			authors: page.data.authors.map((author) => authors[author].name),
			title: page.data.title,
			description: page.data.description,
			images: page.data.image ?? '/cover.png',
		},
	}
}
