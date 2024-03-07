import { SEARCH_URL } from '@config'
import { useEffect, useState } from 'react'
import useSWR, { type SWRResponse } from 'swr'

interface SortedResult {
	id: string
	url: string
	type: 'page' | 'heading' | 'text'
	content: string
}

interface UseDocsSearch {
	search: string
	setSearch: (v: string) => void
	query: SWRResponse<SortedResult[] | 'empty', Error, { keepPreviousData: true }>
}

async function fetchDocs(api: string, query: string): Promise<SortedResult[] | 'empty'> {
	if (query.length === 0) return 'empty'

	const params = new URLSearchParams()
	params.set('query', query)

	const res = await fetch(`${api}?${params.toString()}`)

	if (!res.ok) throw new Error(await res.text())
	return (await res.json()) as SortedResult[]
}

export function useDocsSearch(): UseDocsSearch {
	const [search, setSearch] = useState('')
	const debouncedValue = useDebounce(search, 100)

	const query = useSWR(
		[`${SEARCH_URL}`, debouncedValue],
		async ([api, value]) => {
			return fetchDocs(api, value)
		},
		{
			keepPreviousData: true,
		},
	)
	return { search, setSearch, query }
}

function useDebounce<T>(value: T, delayMs = 1000): T {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delayMs)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delayMs])

	return debouncedValue
}
