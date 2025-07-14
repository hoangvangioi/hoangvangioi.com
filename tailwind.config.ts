import type { Config } from 'tailwindcss'
import { createPreset } from 'fumadocs-ui/tailwind-plugin'

export default {
	darkMode: 'class',
	content: [
		'./content/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{jsx,tsx,mdx}',
		'./mdx-components.{ts,tsx}',
		'./node_modules/fumadocs-ui/dist/**/*.js',
	],
	theme: {
		extend: {
			animation: {
				'marquee-left': 'marquee-left 30s linear infinite',
				'marquee-left-reverse': 'marquee-left 30s linear infinite reverse',
			},
			keyframes: {
				'marquee-left': {
					'0%': {
						transform: 'translate(0)',
					},
					'100%': {
						transform: 'translateX(calc(-100% - 20px))',
					},
				},
			},
		},
	},
	presets: [
		createPreset({
			preset: 'ocean',
		}),
	],
} satisfies Config
