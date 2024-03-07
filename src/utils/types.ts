import { type IconType } from '@icons-pack/react-simple-icons'

export type AuthorData = {
	name: string
	url?: string
	title?: string
	image_url?: string
}

export type TagInfo = {
	count: number
}

export type FooterItem = {
	label: string
	href: string
	newWindow?: boolean
}

export type SocialLinks = Array<{
	href: string
	title: string
	icon: IconType
}>
