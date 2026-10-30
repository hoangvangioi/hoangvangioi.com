import Link from 'next/link';
import Image from 'next/image';
import { type Post } from '@/lib/source';
import { formatShortDate, toDateOnly } from '@/lib/date';

/**
 * `Post` là `ReturnType<typeof source.getPage>` nên bao gồm cả `undefined`
 * (trang không tìm thấy). Component này chỉ nhận phần tử lấy từ
 * `sortedPages()` — luôn tồn tại — nên khai báo `NonNullable` để type bên
 * trong không phải narrow lại.
 *
 * (Code cũ xử lý bằng `if (!page) notFound()` ngay trong component con của một
 * danh sách: nhánh đó không bao giờ chạy, mà nếu chạy thì lại biến CẢ trang
 * thành 404 thay vì chỉ bỏ qua một card.)
 */
type BlogItemPage = NonNullable<Post>;

export function BlogItem({
  page,
  priority = false,
}: {
  page: BlogItemPage;
  priority?: boolean;
}) {
  const date =
    page.data.date instanceof Date ? page.data.date : new Date(page.data.date);

  return (
    <Link
      href={page.url}
      className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <div className="relative aspect-video w-full">
        {page.data.image ? (
          <Image
            alt={page.data.title}
            src={page.data.image}
            className="object-cover"
            fill
            sizes="(max-width: 760px) 90vw, 400px"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        ) : (
          <div className="flex h-full bg-green-400">
            <Image
              alt="image cover"
              src="/cover.webp"
              className="m-auto rounded-full"
              width={128}
              height={128}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-medium leading-snug">{page.data.title}</h3>

        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {page.data.description}
        </p>

        <time
          dateTime={toDateOnly(date)}
          className="mt-auto pt-2 text-end text-sm text-muted-foreground"
        >
          {formatShortDate(date)}
        </time>
      </div>
    </Link>
  );
}
