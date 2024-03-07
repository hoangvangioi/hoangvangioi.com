import { AD_CLIENT } from '@config'

export function GET() {
	const ads: string = `google.com, pub-${AD_CLIENT}, DIRECT, f08c47fec0942fa0`
	return new Response(ads, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		status: 200,
	})
}
