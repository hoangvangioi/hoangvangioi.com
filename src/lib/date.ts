/**
 * Format ngày tháng dùng chung.
 *
 * Luôn cố định locale `vi-VN` + timezone `Asia/Ho_Chi_Minh`:
 *  - `toLocaleDateString()` không tham số phụ thuộc locale/múi giờ của MÁY BUILD
 *    (CI thường chạy en-US + UTC) → trang chủ hiển thị kiểu Mỹ trong khi trang
 *    bài viết hiển thị kiểu Việt, và có thể lệch hẳn 1 ngày với bài đăng sau 17h UTC.
 *  - Kết quả deterministic nên không gây lệch hydration.
 */

const LOCALE = 'vi-VN';
const TIME_ZONE = 'Asia/Ho_Chi_Minh';

/** Ngày đầy đủ: "19 tháng 10, 2025" — dùng ở đầu bài viết. */
export function formatLongDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: TIME_ZONE,
  });
}

/** Ngày ngắn: "19/10/2025" — dùng ở card bài viết. */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: TIME_ZONE,
  });
}

/** Chuỗi ISO cho thẻ <time dateTime> và sitemap. */
export function toDateOnly(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: TIME_ZONE,
  }).format(date);
}
