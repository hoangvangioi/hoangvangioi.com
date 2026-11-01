import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['md', 'mdx', 'tsx', 'ts'],
  compress: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'fumadocs-ui',
      'fumadocs-core',
      '@icons-pack/react-simple-icons',

      // Fumadocs v16.10+ uses ZBSearch instead of Orama for client-side search.
      'zbsearch',
    ],
  },
};

export default withMDX(config);
