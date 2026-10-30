import { Provider } from '@/components/provider';
import type { Metadata, Viewport } from 'next';
import Footer from '@/components/Footer';
import './global.css';
import { footer, SITE_URL } from '@/lib/shared';
import { Header } from '@/components/header';
import { baseOptions } from '@/lib/layout.shared';

export const metadata: Metadata = {
  title: {
    template: 'Hoàng Văn Giỏi - %s',
    default: 'Hoàng Văn Giỏi - Blog lưu trữ và chia sẻ kiến thức',
  },
  description:
    'Khám phá kiến thức mới, học hỏi từ các bài viết về lập trình, công nghệ, và lưu trữ kiến thức lập trình.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    images: [
      {
        url: '/cover.webp',
        width: 1200,
        height: 630,
        alt: 'Hoàng Văn Giỏi - Blog lưu trữ và chia sẻ kiến thức',
      },
    ],
    title: {
      template: 'Hoàng Văn Giỏi - %s',
      default: 'Hoàng Văn Giỏi - Blog lưu trữ và chia sẻ kiến thức',
    },
    description:
      'Khám phá kiến thức mới, học hỏi từ các bài viết về lập trình, công nghệ, và lưu trữ kiến thức lập trình.',
  },
  metadataBase: new URL(SITE_URL),
  applicationName: 'Hoàng Văn Giỏi',
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'rss' }],
    },
  },
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
  appleWebApp: {
    capable: true,
    title: 'Hoàng Văn Giỏi',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/*
        KHÔNG tự thêm <link rel="preload" as="font"> cho Inter:
        React 19 (Float) hoist link lên đầu <head> và Next vẫn render thêm bản
        sao tại chỗ, nên 1 link trong JSX hoá ra 2 link trong HTML (đã đo:
        4 link cho 2 file). Thay vào đó dựa vào:
          - Next đã preload chunk CSS (chứa @font-face) ngay trong <head>
            → font được phát hiện ngay sau khi parse CSS;
          - `font-display: swap` nên chữ hiển thị tức thì bằng font dự phòng,
            không bị chặn render.
        Chi tiết @font-face: xem src/app/global.css.
      */}
      <body className="flex min-h-screen flex-col font-sans [--fd-layout-width:1400px]">
        <Provider>
          <Header {...baseOptions()} />
          {children}
          <Footer items={footer} />
        </Provider>
      </body>
    </html>
  );
}
