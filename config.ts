import type { AuthorData, FooterItem, SocialLinks } from '@/utils/types'
import { SiFacebook, SiGithub, SiInstagram } from '@icons-pack/react-simple-icons'

export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000'
export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO ?? ''
export const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USER ?? ''
export const SEARCH_URL = process.env.NEXT_PUBLIC_SEARCH_URL ?? '/api/search'
export const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT ?? ''
export const AD_SLOT = process.env.NEXT_PUBLIC_AD_SLOT ?? ''
export const EMBED_ELEMENT = process.env.NEXT_PUBLIC_EMBED_ELEMENT ?? ''

export const urlBase = new URL(SITE_URL)

export const domain = urlBase.origin

export const site = {
	site_name: 'Hoàng Văn Giỏi',
	site_url: domain,
	description: 'Hoàng Văn Giỏi',
	author: 'Hoàng Văn Giỏi',
	email: 'admin@hoangvangioi.com',
}

export const SOCIAL_LINKS: SocialLinks = [
	{
		href: 'https://github.com/hoangvangioi',
		title: 'GitHub',
		icon: SiGithub,
	},
	{
		href: 'https://www.facebook.com/hoanggioi.2803',
		title: 'Facebook',
		icon: SiFacebook,
	},
	{
		href: 'https://www.instagram.com/gioihoang3082',
		title: 'Instagram',
		icon: SiInstagram,
	},
]

export const footer: FooterItem[] = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Quyền riêng tư',
		href: '/privacy/',
	},
	{
		label: 'Điều khoản sử dụng',
		href: '/terms/',
	},
]

export const largeBlog = 'example-blog-post'

export const authors: Record<string, AuthorData> = {
	gioi: {
		name: 'Hoàng Văn Giỏi',
		title: 'Tác giả trang web',
		url: 'https://github.com/hoangvangioi',
		image_url: '/icon.png',
	},
}
