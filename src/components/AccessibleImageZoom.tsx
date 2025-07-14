'use client'

import { ImageZoom as FumadocsImageZoom } from 'fumadocs-ui/components/image-zoom'
import { useEffect, useRef } from 'react'

interface ImageZoomProps {
	alt: string
	src: string
	width?: number | `${number}`
	height?: number | `${number}`
	className?: string
}

export function AccessibleImageZoom({ alt, src, width, height, className }: ImageZoomProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		// Find the span element with aria-owns attribute
		const spanElement = container.querySelector('[aria-owns]') as HTMLElement
		if (!spanElement) return

		const ariaOwnsValue = spanElement.getAttribute('aria-owns')
		if (!ariaOwnsValue) return

		// Remove aria-owns initially since the modal doesn't exist yet
		spanElement.removeAttribute('aria-owns')

		// Create a MutationObserver to watch for the modal creation
		const observer = new MutationObserver(() => {
			const modalElement = document.getElementById(ariaOwnsValue)
			if (modalElement) {
				// Modal exists, add back the aria-owns attribute
				spanElement.setAttribute('aria-owns', ariaOwnsValue)
			} else {
				// Modal doesn't exist, remove aria-owns attribute
				spanElement.removeAttribute('aria-owns')
			}
		})

		// Start observing the document for changes
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		})

		return () => observer.disconnect()
	}, [])

	return (
		<div ref={containerRef}>
			<FumadocsImageZoom alt={alt} src={src} width={width} height={height} className={className} />
		</div>
	)
}
