import type { MetadataRoute } from 'next';

/**
 * Manifest PWA.
 *
 * Bộ icon đã được thu gọn: trước đây manifest khai báo 113 icon (8.7 KB JSON)
 * và `public/icons/` nặng ~1 MB với đầy đủ tile Windows 11 (80 file) + iOS
 * (26 file). Với một blog chạy trên trình duyệt thì chỉ cần vài size chuẩn:
 *   - 192 & 512 (any)  → điều kiện tối thiểu để Chrome/Edge cài được PWA
 *   - 512 (maskable)   → icon thích ứng trên Android
 *   - 48/72/96/144     → các mật độ màn hình mdpi..xxxhdpi
 *   - 180 (apple)      → iOS home screen
 * Windows tiles không dùng tới (chỉ PWA Builder cần), và iOS đã có
 * `apple-icon.png` khai báo trong metadata của `src/app/layout.tsx`.
 */
const ANDROID_ICON = (size: number) =>
  `/icons/android/android-launchericon-${size}-${size}.png`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hoàng Văn Giỏi',
    short_name: 'H.V.Giỏi',
    description:
      'Khám phá kiến thức mới, học hỏi từ các bài viết về lập trình, công nghệ, và lưu trữ kiến thức lập trình.',
    dir: 'ltr',
    lang: 'vi',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    id: '/?screen=1',
    theme_color: '#000000',
    background_color: '#000000',
    display_override: ['window-controls-overlay', 'standalone', 'browser'],
    categories: ['news'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: ANDROID_ICON(48),
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: ANDROID_ICON(72),
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: ANDROID_ICON(96),
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: ANDROID_ICON(144),
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: ANDROID_ICON(192),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: ANDROID_ICON(512),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: ANDROID_ICON(512),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

export const dynamic = 'force-static';
