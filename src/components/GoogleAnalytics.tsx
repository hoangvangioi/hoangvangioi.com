import { GA_MEASUREMENT_ID } from '@config'
import Script from 'next/script'

export function GoogleAnalytics() {
	if (!GA_MEASUREMENT_ID) return null

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
				async
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_MEASUREMENT_ID}');
					`,
				}}
			/>
		</>
	)
}
