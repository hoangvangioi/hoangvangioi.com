import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['md', 'mdx', 'tsx', 'ts'],
  // Đã bỏ `compress: true`: option này chỉ áp dụng cho Next server,
  // không có tác dụng với `output: 'export'` (nén là việc của CDN/host).
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
      // Fumadocs v16.10+ dùng ZBSearch thay Orama cho client-side search
      'zbsearch',
      // lucide-react có ~1.500 icon; thêm vào đây để chắc chắn chỉ những icon
      // được import mới vào bundle (đã kiểm chứng bằng cách grep chunk).
      'lucide-react',
    ],
  },
};

export default withMDX(config);
