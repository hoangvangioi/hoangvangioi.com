import type { Tokenizer } from 'zbsearch';

/**
 * Tokenizer tiếng Việt cho ZBSearch (engine tìm kiếm của Fumadocs từ v16.10+,
 * thay cho Orama).
 *
 * ── Vấn đề với engine cũ (Orama, `language: 'english'`) ──
 * Orama không có ngôn ngữ `vietnamese`, và splitter của english là
 * `/[^A-Za-zàèéìòóù0-9_'-]+/` — mọi chữ cái Việt (ư ơ ẫ ế ộ …) bị coi là
 * KÝ TỰ PHÂN CÁCH nên từ bị băm vụn:
 *
 *   'Hướng dẫn debug'   -> ['h','ng','d','n','debug']
 *   'Kỹ thuật tìm kiếm' -> ['k','thu','t','tim','ki','m']
 *
 * ── Tokenizer `multilingual` mặc định của ZBSearch ──
 * Đã tốt hơn hẳn (giữ từ nguyên vẹn):
 *
 *   'Hướng dẫn debug'   -> ['hướng','dẫn','debug']
 *
 * nhưng vẫn KHÔNG lược dấu, nên gõ không dấu — kiểu gõ rất phổ biến của người
 * Việt — vẫn fail (đã đo thực tế):
 *
 *   'ky thuat' -> 0 kết quả      'bo nho' -> 0 kết quả
 *   'huong dan' -> ra SAI bài (khớp 'dangling' của bài khác)
 *
 * ── Tokenizer này ──
 * Tách từ theo Unicode (\p{L}\p{N}) rồi mới lược dấu, để 'Hướng dẫn' và
 * 'huong dan' cùng chuẩn hoá về ['huong','dan']. Đo lại thì cả hai kiểu gõ
 * đều trúng đúng bài.
 *
 * File này PHẢI dùng chung cho cả 2 phía (index lúc build + query lúc chạy),
 * nếu không token 2 bên lệch nhau và không match:
 *   - server: src/app/api/search/route.ts
 *   - client: src/components/search.tsx
 * Vì vậy KHÔNG được import gì server-only ở đây.
 *
 * Lưu ý: `load()` của ZBSearch chỉ ghi đè `tokenizer.language`, không thay
 * tokenizer, nên instance phía client vẫn giữ đúng hàm `tokenize` này.
 */

/** Tách từ: giữ lại chữ cái (mọi ngôn ngữ), chữ số, `_`, `'` và `-`. */
const SPLIT_RULE = /[^\p{L}\p{N}_'-]+/u;

/**
 * Lược dấu tiếng Việt: 'Hướng' -> 'huong', 'đường' -> 'duong'.
 *
 * Lưu ý `đ`/`Đ` (U+0111/U+0110) KHÔNG bị phân rã bởi NFD nên phải thay thủ công.
 */
export function stripTones(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/** Chuẩn hoá 1 chuỗi thành danh sách token (đã lowercase + lược dấu + khử trùng). */
export function tokenize(input: string): string[] {
  const tokens = input
    .toLowerCase()
    .split(SPLIT_RULE)
    .map(stripTones)
    .filter(Boolean);

  // `allowDuplicates: false` là hành vi mặc định của engine — giữ nguyên để
  // tần suất token trong index không bị thổi phồng.
  return Array.from(new Set(tokens));
}

/**
 * Nhãn ngôn ngữ chỉ mang tính thủ tục (được `save()`/`load()` ghi nhận);
 * việc tách từ thực tế do hàm `tokenize` bên dưới tự xử lý nên nhãn này không
 * ảnh hưởng kết quả. Để 'english' vì đó là nhãn hợp lệ sẵn có.
 */
const TOKENIZER_LANGUAGE = 'english';

export const vietnameseTokenizer: Tokenizer = {
  language: TOKENIZER_LANGUAGE,
  normalizationCache: new Map(),
  tokenize: (raw) =>
    // Engine gọi với giá trị không phải string cho field dạng mảng
    // (vd `breadcrumbs: string[]`) — giữ đúng hành vi của tokenizer mặc định.
    typeof raw === 'string' ? tokenize(raw) : [raw as unknown as string],
};
