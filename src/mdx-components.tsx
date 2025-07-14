import type { MDXComponents } from 'mdx/types'
import defaultComponents from 'fumadocs-ui/mdx'
import { Adsense, Error, Info, LinkButton, Tip, Warning, Accordion } from '@/components/mdx'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { AccessibleImageZoom } from '@/components/AccessibleImageZoom'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { File, Folder, Files } from 'fumadocs-ui/components/files'

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...defaultComponents,
		Adsense: (() => <Adsense />) as typeof Adsense,
		Tip,
		Info,
		Error,
		Warning,
		LinkButton,
		Tab,
		Tabs,
		Step,
		Steps,
		File,
		Files,
		Folder,
		TypeTable,
		Accordion,
		ImageZoom: AccessibleImageZoom,
		...components,
	}
}
