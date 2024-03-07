'use client'

import { useDocsSearch } from '@/utils/search'
import { type ReactNode } from 'react'
import { SearchDialogContent, SearchDialog, type SharedProps } from 'fumadocs-ui/components/dialog/search'

export type DefaultSearchDialogProps = SharedProps & ContentProps

export default function DefaultSearchDialog({ footer, ...props }: DefaultSearchDialogProps): JSX.Element {
	return (
		<SearchDialog {...props}>
			<Content footer={footer} />
		</SearchDialog>
	)
}

interface ContentProps {
	footer?: ReactNode
}

function Content({ footer }: ContentProps): JSX.Element {
	const { search, setSearch, query } = useDocsSearch()

	return <SearchDialogContent search={search} onSearchChange={setSearch} results={query.data ?? []} footer={footer} />
}
