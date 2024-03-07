import Image from 'next/image'
import Link from 'next/link'
import { ExternalLinkIcon, Star } from 'lucide-react'
import type { FooterItem } from '@/utils/types'
import { GITHUB_REPO, GITHUB_USER } from '@config'

export default function Footer({ items }: { items: FooterItem[] }) {
	return (
		<footer className="container mt-auto border-t p-8 pb-20">
			<div className="flex flex-col justify-between gap-6 sm:flex-row">
				<Info />
				<Item item={items} />
			</div>
		</footer>
	)
}

function Info() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row items-center gap-2">
				<Image alt="logo" src="/icon.png" width={42} height={42} className="rounded-full" />
				<p className="text-xl font-bold">Hoàng Văn Giỏi</p>
			</div>
			<p className="mt-2 text-xs text-muted-foreground">&copy; Copyright 2022. All rights reserved.</p>
		</div>
	)
}

function Item({ item }: { item: FooterItem[] }) {
	return (
		<div className="flex flex-row flex-wrap items-center gap-6">
			{item.map((i) => (
				<Link
					key={i.href}
					href={i.href}
					className="flex flex-row items-center text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
					target={i.newWindow === true ? '_blank' : '_self'}
				>
					{i.label}
					{i.newWindow && <ExternalLinkIcon className="ml-1.5 inline h-3 w-3" />}
				</Link>
			))}
			<a
				href={`https://github.com/${GITHUB_USER}/${GITHUB_REPO}`}
				rel="noreferrer noopener"
				target="_blank"
				className="flex flex-row items-center text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
			>
				<Star className="mr-2 size-4" />
				Give us a star
			</a>
		</div>
	)
}
