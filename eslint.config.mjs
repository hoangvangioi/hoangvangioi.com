import next from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * ESLint flat config.
 *
 * Repo trước đây hoàn toàn không có ESLint (dù `src/components/mdx/Adsense.tsx`
 * vẫn để comment `eslint-disable-next-line`), nên không có gì chặn lỗi kiểu
 * `useMemo` sai deps, key trùng, hay dùng `<a>` thay `<Link>`.
 */
const config = [
  { ignores: ['.next/**', 'out/**', '.source/**', 'node_modules/**'] },
  ...next,
  ...typescript,
  {
    rules: {
      // Blog dùng cả thẻ <a> có chủ đích (link ngoài, ads) — giữ mức warn để
      // không phải chữa cháy, nhưng vẫn thấy được khi quên dùng <Link>.
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-img-element': 'warn',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default config;
