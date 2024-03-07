import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { AdsProvider } from '@/adsense'
import { DocsProvider } from '@/app/provider'
import Footer from '@/components/Footer'
import { GITHUB_USER, footer, urlBase } from '@config'
import type { Metadata, Viewport } from 'next'
import { DocsLayout } from 'fumadocs-ui/layout'
import { utils } from '@/utils/source'
import { RollButton } from 'fumadocs-ui/components/roll-button'
import { LogoSVG } from '@/components/LogoSVG'
import './global.css'

const inter = Inter({
	weight: '400',
	display: 'swap',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		template: 'Hoàng Văn Giỏi - %s',
		default: 'Hoàng Văn Giỏi - Blog lưu trữ và chia sẻ kiến thức',
	},
	description:
		'Khám phá kiến thức mới, học hỏi từ các bài viết về lập trình, công nghệ, và lưu trữ kiến thức lập trình.',
	twitter: {
		card: 'summary_large_image',
	},
	openGraph: {
		images: '/cover.png',
		title: {
			template: 'Hoàng Văn Giỏi - %s',
			default: 'Hoàng Văn Giỏi - Blog lưu trữ và chia sẻ kiến thức',
		},
		description:
			'Khám phá kiến thức mới, học hỏi từ các bài viết về lập trình, công nghệ, và lưu trữ kiến thức lập trình.',
	},
	metadataBase: urlBase,
	applicationName: 'Hoàng Văn Giỏi',
	manifest: '/manifest.webmanifest',
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		types: {
			'application/rss+xml': [{ url: '/feed.xml', title: 'rss' }],
		},
	},
	icons: { icon: '/icon.png', apple: '/apple-icon.png' },
	appleWebApp: { capable: true, title: 'Hoàng Văn Giỏi', statusBarStyle: 'default' },
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
	],
	colorScheme: 'dark light',
	width: 'device-width',
	initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="vi" className={inter.className} suppressHydrationWarning>
			<body className="flex min-h-screen flex-col">
				<AdsProvider>
					<DocsProvider>
						<DocsLayout
							tree={utils.pageTree}
							sidebar={{
								enabled: false,
								collapsible: false,
							}}
							nav={{
								githubUrl: `https://github.com/${GITHUB_USER}`,
								title: (
									<>
										<LogoSVG className="size-8" fill="currentColor" aria-label="Hoàng Văn Giỏi" />
										<span className="ml-3 font-semibold max-md:hidden">Hoàng Văn Giỏi</span>
										<span className="ml-3 hidden font-semibold max-md:block">H.V.Giỏi</span>
									</>
								),
								enabled: true,
								transparentMode: 'top',
							}}
						>
							{children}
						</DocsLayout>
						<Footer items={footer} />
						<RollButton />
					</DocsProvider>
				</AdsProvider>
			</body>
		</html>
	)
}
