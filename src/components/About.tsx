'use client'
import Link from 'next/link'
import React from 'react'
import {
	SiArchlinux,
	SiBootstrap,
	SiC,
	SiCplusplus,
	SiCss3,
	SiDjango,
	SiFastapi,
	SiGit,
	SiGnubash,
	SiHtml5,
	SiJavascript,
	SiLinux,
	SiMarkdown,
	SiNeovim,
	SiPostgresql,
	SiPython,
	SiReact,
	SiStmicroelectronics,
	SiTailwindcss,
	SiVisualstudiocode,
} from '@icons-pack/react-simple-icons'
import { ZapIcon, LinkIcon } from 'lucide-react'
import { SOCIAL_LINKS } from '@config'

export function About() {
	return (
		<div className="grid gap-4">
			<Stacks />
			<Connect />
		</div>
	)
}

const Connect = () => {
	return (
		<div className="flex flex-col gap-6 rounded-xl border p-4 lg:p-6">
			<div className="flex items-center gap-2">
				<LinkIcon className="size-[18px]" />
				<h2 className="text-sm font-light">Connect</h2>
			</div>
			<div className="flex flex-col gap-4 px-2">
				{SOCIAL_LINKS.map((link) => {
					const { href, title, icon } = link
					const Icon = icon

					return (
						<Link
							key={href}
							href={href}
							className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
						>
							<Icon className="size-[18px]" />
							<h2 className="font-light">{title}</h2>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

const Stacks = () => {
	return (
		<div className="flex h-60 flex-col gap-2 overflow-hidden rounded-xl border p-4 lg:p-6">
			<div className="flex items-center gap-2">
				<ZapIcon className="size-[18px]" />
				<h2 className="text-sm font-light">Stacks</h2>
			</div>
			<div className="group flex flex-row gap-5 overflow-hidden py-4 [mask-image:linear-gradient(to_right,_transparent_0%,_rgba(0,_0,_0,_1.0)_10%,_rgba(0,_0,_0,_1.0)_90%,_transparent_100%)]">
				{Array.from({ length: 2 }).map((_, i) => (
					<div
						key={i}
						className="flex shrink-0 animate-marquee-left flex-row justify-around gap-5 group-hover:[animation-play-state:paused]"
					>
						<SiC className="size-10" />
						<SiCplusplus className="size-10" />
						<SiPython className="size-10" />
						<SiHtml5 className="size-10" />
						<SiCss3 className="size-10" />
						<SiJavascript className="size-10" />
						<SiBootstrap className="size-10" />
						<SiTailwindcss className="size-10" />
						<SiReact className="size-10" />
						<SiMarkdown className="size-10" />
					</div>
				))}
			</div>
			<div className="group flex flex-row gap-5 overflow-hidden py-4 [mask-image:linear-gradient(to_right,_transparent_0%,_rgba(0,_0,_0,_1.0)_10%,_rgba(0,_0,_0,_1.0)_90%,_transparent_100%)]">
				{Array.from({ length: 2 }).map((_, i) => (
					<div
						key={i}
						className="animate-marquee-left-reverse flex shrink-0 flex-row justify-around gap-5 group-hover:[animation-play-state:paused]"
					>
						<SiStmicroelectronics className="size-10" />
						<SiArchlinux className="size-10" />
						<SiGit className="size-10" />
						<SiVisualstudiocode className="size-10" />
						<SiNeovim className="size-10" />
						<SiPostgresql className="size-10" />
						<SiLinux className="size-10" />
						<SiDjango className="size-10" />
						<SiFastapi className="size-10" />
						<SiGnubash className="size-10" />
					</div>
				))}
			</div>
		</div>
	)
}
