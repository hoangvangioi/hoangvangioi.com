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
      '@orama/orama',
    ],
  },
};

export default withMDX(config);
