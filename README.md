# Hoàng Văn Giỏi — Personal Tech Blog

Blog cá nhân về lập trình C/C++, Embedded Linux, firmware và vi điều khiển.
Xây dựng bằng [Next.js](https://nextjs.org/) (App Router, **Static Export**) và
[Fumadocs v16](https://fumadocs.dev).

> **Ghi chú lịch sử repo:** mã nguồn Fumadocs v8 cũ và repo `search-api` riêng
> đã được lưu vào các branch `old-v8` và `search-api`. Tìm kiếm giờ nằm ngay
> trong repo này.

---

## Bắt đầu

Yêu cầu **Node >= 22** (xem `engines` trong `package.json`).

```bash
npm install
npm run dev
```

Mở http://localhost:3000 trên trình duyệt.

> Build **không cần** mạng để tải font: Inter đã được self-host trong
> `public/fonts/` (variable font, wght 100–900, có subset tiếng Việt, giấy phép
> SIL OFL 1.1). Trước đây dùng `next/font/google` nên build sẽ fail cứng nếu
> không truy cập được `fonts.googleapis.com`.

### Scripts

| Lệnh                   | Mô tả                                                 |
| :--------------------- | :---------------------------------------------------- |
| `npm run dev`          | Chạy dev server                                       |
| `npm run build`        | Build static export ra `out/`                         |
| `npm start`            | Serve thử thư mục `out/`                              |
| `npm run types:check`  | Sinh `.source/` + route types rồi chạy `tsc --noEmit` |
| `npm run lint`         | ESLint (flat config, `eslint-config-next`)            |
| `npm run format`       | Prettier ghi đè                                       |
| `npm run format:check` | Prettier kiểm tra (CI dùng lệnh này)                  |
| `npm run check`        | Chạy cả 4 bước trên + build — nên chạy trước khi push |

CI: xem `.github/workflows/ci.yml` (typecheck → lint → prettier → build → kiểm
tra `out/`).

---

## Biến môi trường

Sao chép `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

| Biến                    | Bắt buộc | Mặc định                   | Dùng cho                                                              |
| :---------------------- | :------- | :------------------------- | :-------------------------------------------------------------------- |
| `SITE_URL`              | Không    | `https://hoangvangioi.com` | `sitemap.xml`, `robots.txt`, `feed.xml`, canonical, Open Graph        |
| `NEXT_PUBLIC_AD_CLIENT` | Không    | _(rỗng = tắt ads)_         | Google AdSense publisher ID, **chỉ phần số** (code tự thêm `ca-pub-`) |
| `NEXT_PUBLIC_AD_SLOT`   | Không    | _(rỗng = tắt ads)_         | AdSense slot ID                                                       |

Mọi biến đều được đọc **lúc build** (repo dùng `output: 'export'`), nên phải
set trước khi `npm run build` — kể cả trên CI. Thiếu cả `NEXT_PUBLIC_AD_CLIENT`
lẫn `NEXT_PUBLIC_AD_SLOT` thì quảng cáo bị tắt hoàn toàn: không render `<ins>`,
không tải `adsbygoogle.js`, và `ads.txt` trả về rỗng (thay vì sinh dòng sai
định dạng `google.com, pub-, DIRECT, ...`).

---

## Cấu trúc dự án

### Nội dung & cấu hình

- `content/*.mdx` — bài viết. Frontmatter: `title`, `description`, `tags`,
  `image`, `authors`, `date`, `math`.
- `source.config.ts` — schema frontmatter (Zod) + plugin remark/rehype.
- `src/lib/source.ts` — adapter Fumadocs [`loader()`](https://fumadocs.dev/docs/headless/source-api),
  kèm `sortedPages()` / `getTags()` đã cache ở module scope.
- `src/lib/shared.ts` — hằng số site, `SITE_URL`, helper `siteUrl()`, social links, footer.
- `src/lib/search-tokenizer.ts` — tokenizer tiếng Việt cho Orama (dùng chung
  lúc build index và lúc query).
- `src/lib/date.ts` — format ngày `vi-VN` cố định múi giờ `Asia/Ho_Chi_Minh`.
- `src/lib/layout.shared.tsx` — options cho header.

### Bảng route

| Route / File                                         | Loại          | Mô tả                                                      |
| :--------------------------------------------------- | :------------ | :--------------------------------------------------------- |
| `app/(home)/page.tsx`                                | Page          | Trang chủ: giới thiệu + lưới bài viết                      |
| `app/posts/[slug]/page.tsx`                          | Dynamic Page  | Trang bài viết (Fumadocs `DocsPage`)                       |
| `app/(home)/tags/[tag]/page.tsx`                     | Dynamic Page  | Danh sách bài theo thẻ                                     |
| `app/api/search/route.ts`                            | Route Handler | Index tìm kiếm tĩnh (`/api/search`) cho client-side search |
| `app/feed.xml/route.ts`                              | RSS Feed      | RSS 2.0, xếp mới → cũ                                      |
| `app/sitemap.ts` · `app/robots.ts`                   | SEO           | Sitemap + robots (URL khớp `trailingSlash: true`)          |
| `app/manifest.ts`                                    | PWA           | Web manifest (bộ icon đã thu gọn)                          |
| `app/og/posts/[slug]/route.tsx`                      | Dynamic Image | Ảnh Open Graph 1200×630 cho từng bài                       |
| `app/llms.txt` · `llms-full.txt` · `llms.mdx/[slug]` | AI Friendly   | Nội dung dạng text/markdown cho LLM & AI crawler           |

### Viết bài mới

```mdx
---
title: 'Tiêu đề bài viết'
description: 'Mô tả ngắn cho SEO và RSS.'
authors: [gioi]
date: '2026-01-15T10:00:00.000Z'
tags: ['C', 'Linux']
image: '/posts/ten-bai-viet/cover.webp'
math: false
---
```

- Đặt ảnh cover ở `public/posts/<ten-bai-viet>/cover.webp` (nên là WebP, ~1200×630).
- `math: true` chỉ khi bài có công thức LaTeX — CSS KaTeX (~19 KB) chỉ được tải
  cho những bài bật cờ này.
- `authors` là key trong `authors` của `src/lib/shared.ts` (mặc định `gioi`).
- Component MDX có sẵn: `<Info>`, `<Tip>`, `<Warning>`, `<Error>`, `<Accordion>`,
  `<Tabs>`, `<Steps>`, `<Files>`, `<TypeTable>`, `<LinkButton>`, `<Adsense>`
  (xem `src/components/mdx.tsx`).

---

## Ghi chú tối ưu

- **Tìm kiếm tiếng Việt:** engine của fumadocs (nay là `zbsearch`, trước là
  Orama) không có ngôn ngữ `vietnamese`, còn splitter `english`/`multilingual`
  coi mọi chữ cái Việt là ký tự phân cách (`'Hướng dẫn'` → `['h','ng','d','n']`)
  và không lược dấu (`'huong dan'` → 0 hoặc sai kết quả).
  `src/lib/search-tokenizer.ts` tách từ theo Unicode rồi lược dấu (NFD + `đ/Đ`,
  vì NFD không phân rã U+0111), nên gõ `huong dan` hay `hướng dẫn` đều ra kết
  quả. Tokenizer này **phải** dùng giống nhau ở server
  (`app/api/search/route.ts`) và client (`components/search.tsx`).
  Không truyền `language` kèm custom tokenizer — engine sẽ ném
  `NO_LANGUAGE_WITH_CUSTOM_TOKENIZER`.
- **KaTeX:** CSS + font phục vụ từ `public/vendor/katex/` và chỉ được `<link>`
  khi frontmatter có `math: true`. Không `import 'katex/dist/katex.css'` vì
  Turbopack gom CSS theo module graph của trang: cả component render có điều
  kiện lẫn dynamic import đều vẫn đính 28 KB CSS vào **cả 19** trang bài viết
  (đã đo, cả hai cách đều thất bại). Chỉ vendor 20 file `.woff2` (296 KB) thay
  vì cả woff2/woff/ttf (~1,17 MB). Xem `public/vendor/katex/README.md`.
- **Ảnh OG** sinh ra ở `/og/posts/<slug>` là file không có đuôi trong `out/`,
  nên `public/_headers` khai báo `Content-Type: image/png` cho `/og/*`.
- **Font** dùng variable weight nên `font-bold` / `font-extrabold` / `font-black`
  là độ đậm thật, không bị trình duyệt vẽ giả đậm.

## Dependency & bảo mật

`package.json` có `overrides` cho hai gói **build-time/dev-only**:

| Override              | Lý do                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compression: ^1.8.2` | `serve@14.2.6` pin cứng `1.8.1` (DoS, GHSA-vc2v-76pw-4v95). Chỉ ảnh hưởng `npm start`/CI, không ship xuống trình duyệt.                                                                                               |
| `katex: ^0.18.10`     | `rehype-katex`/`micromark-extension-math` kéo 2 bản lồng `0.16.47` (prototype pollution, GHSA-238p-pmpm-9mq7). Ép lên `0.18.10` vừa vá lỗi vừa **khớp phiên bản** với CSS/font vendored trong `public/vendor/katex/`. |

**Cố ý KHÔNG override `image-size` lên 2.x** (dù `npm audit` báo 1 high):

- `image-size` v2 bỏ nhận đường dẫn file — `imageSize('/path/to.png')` ném
  `TypeError`, việc đọc file chuyển sang `image-size/fromFile` (async).
- `rehype-img-size@1.0.1` gọi `sizeOf(src)` với `src` là **đường dẫn**, và chỉ
  có 2 version (1.0.0/1.0.1) — không có bản nào hỗ trợ v2.
- Override sang v2 làm `npm audit` xanh nhưng **gài bẫy**: hiện 0/19 bài có ảnh
  trong nội dung MDX (ảnh cover render qua `next/image`) nên `sizeOf` không bao
  giờ được gọi, build vẫn pass; tới khi có bài đầu tiên chèn ảnh MDX thì build
  sẽ nổ. Đã kiểm chứng bằng thực nghiệm cả hai chiều.
- Rủi ro thực tế của CVE này (vòng lặp vô hạn khi parse JXL/HEIF/ICNS) bằng 0
  ở đây: plugin chỉ đọc ảnh WebP/PNG/JPEG **có sẵn trong repo** lúc build, không
  nhận input từ người dùng.

Nếu sau này muốn audit sạch hoàn toàn: hoặc gỡ `rehype-img-size` khỏi
`source.config.ts` (hiện nó không làm gì), hoặc đợi upstream ra bản hỗ trợ
`image-size` v2.

`fumadocs-mdx` **pin ở `15.0.8`** (ngoại lệ có chủ đích so với việc nâng cấp
dependency): `15.4.10` phá build Turbopack vì `dist/webpack/macro.js` chỉ bỏ qua
file không phải macro khi `type === "webpack"`, nên với Turbopack luôn gọi
`transformMacroModule` → `analyzeModule`, parse frontmatter MDX như JS:
`content/c-programming-file-handling.mdx:1:3: Invalid operand for
increment/decrement operator`. Các peer thiếu (`rolldown`, `satteri`) không phải
nguyên nhân.

---

## Tìm hiểu thêm

- [Fumadocs Documentation](https://fumadocs.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
