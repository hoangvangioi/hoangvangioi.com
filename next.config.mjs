import createMDX from "fumadocs-mdx/config";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeImgSize from 'rehype-img-size'
import { remarkImage, remarkDynamicContent, rehypeCode } from 'fumadocs-core/mdx-plugins';
import { randomUUID } from "crypto";
import withPWAInit from "@ducanh2912/next-pwa";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	generateBuildId: async () => await randomUUID(),
	pageExtensions: ['md', 'mdx', 'tsx', 'ts'],
	compress: true,
	swcMinify: true,
	images: {
		unoptimized: true,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 60 * 60 * 24 * 365,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	output: "export",
	cleanDistDir: true,
	staticPageGenerationTimeout: 60 * 10,
	reactStrictMode: true,
	trailingSlash: true,
}

const withMDX = createMDX({
	rootMapPath: "./src/.map.ts",
	rootContentPath: "./content",
	mdxOptions: {
		remarkPlugins: [
			remarkMath,
			remarkImage,
			remarkDynamicContent,
		],
		rehypePlugins: (v) => [
			[rehypeKatex, ...v],
			[rehypeImgSize, { dir: "public" }],
			[rehypeCode]
		],
	},
});

const withPWA = withPWAInit({
	cacheOnFrontEndNav: true,
	sw: '/service-worker.js',
	fallbacks: {
		document: "/~offline",
	},
	disable: process.env.NODE_ENV === "development",
})

export default withPWA(withMDX(nextConfig))
