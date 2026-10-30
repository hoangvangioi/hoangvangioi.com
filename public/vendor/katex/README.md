# KaTeX (vendored)

Bản copy của CSS + font KaTeX, dùng để **chỉ tải khi bài viết có công thức toán**.

| | |
| --- | --- |
| Nguồn | `node_modules/katex/dist/` (KaTeX — MIT License, https://katex.org) |
| Phiên bản | `katex@0.18.10` |
| Đã sửa | `katex.min.css`: bỏ các `src` `.woff`/`.ttf`, chỉ giữ `.woff2` (60 → 20 `url()`, 24.794 → 22.660 byte) |
| Font | 20 file `.woff2` (~296 KB) — bỏ `.woff` (~336 KB) và `.ttf` (~540 KB) vì mọi trình duyệt từ 2016 đều hỗ trợ woff2 |

## Vì sao phải vendor thay vì `import 'katex/dist/katex.css'`?

Turbopack gom CSS theo **module graph** của trang, nên kể cả khi:

1. bọc `import` trong component chỉ render khi `page.data.math === true`, hoặc
2. dùng `await import('@/components/KatexStyles')` trong server component async,

chunk CSS KaTeX (~28 KB) **vẫn bị đính vào cả 19 trang bài viết** và build vẫn copy đủ
60 file font (~1,17 MB) vào `out/` — dù 0/19 bài có công thức toán. Đã đo và xác nhận
cả hai cách đều thất bại.

`<link rel="stylesheet" href="/vendor/katex/katex.min.css" precedence="default" />` là
HTML thuần nên có render hay không phụ thuộc hoàn toàn vào `page.data.math`
(xem `src/app/posts/[slug]/page.tsx`).

## Cập nhật lên phiên bản KaTeX mới

```bash
npm i katex@<version>
cp node_modules/katex/dist/fonts/*.woff2 public/vendor/katex/fonts/
python3 - <<'PY'
import re, pathlib
css = pathlib.Path('node_modules/katex/dist/katex.min.css').read_text()
css = re.sub(r',url\([^)]*\.woff\) format\("woff"\)', '', css)
css = re.sub(r',url\([^)]*\.ttf\) format\("truetype"\)', '', css)
pathlib.Path('public/vendor/katex/katex.min.css').write_text(css)
PY
```

Rồi sửa bảng "Phiên bản" ở trên.
