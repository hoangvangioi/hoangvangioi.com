import { BlogItem, LargeBlogItem } from '@/components/BlogItem'
import { LinkButton } from '@/components/LinkButton'
import { EyeIcon, GithubIcon } from 'lucide-react'
import { GITHUB_REPO, GITHUB_USER, largeBlog, domain } from '@config'
import type { Metadata } from 'next'
import { utils } from '@/utils/source'
import { About } from '@/components/About'

export const metadata: Metadata = {
	alternates: {
		canonical: `${domain}`,
	},
}

export default function BlogIndex() {
	const pages = utils.getPages().sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
	const recommendations = pages.find((page) => page.slugs[0] === largeBlog) ?? null

	return (
		<main className="mb-20 flex flex-1 flex-col gap-5">
			<div className="mb-5 mt-16">
				<h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">Chia sẻ trải nghiệm của chúng ta</h1>
				<div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
					<LinkButton href="/tags" icon={<EyeIcon className="h-4 w-4" />} variant="primary">
						Xem tất cả các thẻ
					</LinkButton>
					<LinkButton
						href={`https://github.com/${GITHUB_USER}/${GITHUB_REPO}`}
						icon={<GithubIcon className="h-4 w-4" />}
						target="_blank"
					>
						Tham gia với chúng tôi
					</LinkButton>
				</div>
			</div>

			<div className="mb-16 grid grid-cols-1 gap-8 min-[816px]:grid-cols-2">
				{recommendations != null && <LargeBlogItem page={recommendations} />}
				<About />
			</div>

			<div className="flex flex-col justify-between gap-3 sm:flex-row">
				<h2 className="text-4xl font-bold max-sm:text-center sm:ml-5">Tất cả bài viết</h2>
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				{pages.map((page) => {
					return <BlogItem key={page.data.title} page={page} />
				})}
			</div>
		</main>
	)
}
