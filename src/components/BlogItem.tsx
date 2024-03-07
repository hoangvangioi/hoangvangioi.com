import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { notFound } from 'next/navigation'
import { type Page } from '@/utils/source'

export function BlogItem({ page }: { page: Page }) {
	if (!page) notFound()
	return (
		<Link
			href={`${page.url}`}
			className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			<div className="relative aspect-video h-auto w-full">
				{page.data.image != null ? (
					<Image
						alt="image"
						src={page.data.image}
						className="h-full object-cover"
						fill
						sizes="(max-width: 760px) 90vw, 400px"
					/>
				) : (
					<div className="flex h-full flex-1 flex-col bg-green-400">
						<Image
							alt="image cover"
							src="/cover.png"
							className="m-auto h-20 w-20 rounded-full"
							width={128}
							height={128}
						/>
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-3 p-4">
				<p className="text-lg font-medium">{page.data.title}</p>
				<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted-foreground">
					{page.data.description}
				</p>

				<p className="mt-auto pt-2 text-end text-sm text-muted-foreground">
					{page.data.date.toLocaleDateString()}
				</p>
			</div>
		</Link>
	)
}

export function LargeBlogItem({ page }: { page: Page }) {
	if (!page) notFound()
	return (
		<Link
			href={`${page.url}`}
			className="flex h-fit flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			<div className="relative aspect-video w-full">
				{page.data.image != null ? (
					<Image
						alt="image"
						src={page.data.image}
						className="h-full object-cover"
						fill
						priority
						sizes="80vw"
					/>
				) : (
					<div className="flex h-full flex-1 flex-col bg-green-400">
						<Image
							alt="image cover"
							src="/cover.png"
							className="m-auto h-20 w-20"
							width={128}
							height={128}
						/>
					</div>
				)}
			</div>
			<div className="flex flex-col p-5">
				<p className="text-lg font-medium">{page.data.title}</p>
				<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted-foreground">
					{page.data.description}
				</p>
			</div>
		</Link>
	)
}
