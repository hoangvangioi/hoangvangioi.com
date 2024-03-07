import { utils } from '@/utils/source'
import { type TagInfo } from '@/utils/types'

export function getTagHref(tag: string) {
	return `/tags/${tag.toLowerCase()}`.replace(/\s+/g, '-')
}

export function getTags() {
	const map = new Map<string, TagInfo>()
	for (const page of utils.getPages()) {
		for (const tag of page.data.tags) {
			if (map.has(tag)) {
				map.get(tag)!.count++
			} else {
				map.set(tag, { count: 1 })
			}
		}
	}
	return map
}
