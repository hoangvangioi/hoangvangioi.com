import type { Metadata } from 'next';
import { BlogItem } from '@/components/BlogItem';
import { LinkButton } from '@/components/LinkButton';
import { getTags, slugifyTag, sortedPages } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  // Dùng `sortedPages()` (đã cache + sort sẵn) thay vì tự filter từ
  // `source.getPages()` không có thứ tự.
  const pages = sortedPages().filter((blog) =>
    blog.data.tags?.some((tag) => slugifyTag(tag) === decodedTag),
  );

  return (
    <div className="flex w-full flex-1 flex-col gap-5">
      <div className="mb-5 flex flex-col gap-5">
        <h1 className="mb-4 text-center text-3xl font-bold">
          {`Bài viết được gắn thẻ`}
          <span className="text-blue-500 dark:text-amber-300">
            {` ${decodedTag.replace(
              /(\b\w)|-/g,
              (_, letter: string | undefined) =>
                letter ? letter.toUpperCase() : ' ',
            )}`}
          </span>
        </h1>

        <LinkButton href="/tags" className="mx-auto">
          Tất cả các thẻ
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page, i) => (
          <BlogItem key={page.url} page={page} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [...getTags().keys()].map((tag) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);
  const title = `Bài viết được gắn thẻ ${decodedTag}`;

  return {
    title,
    description: `Tổng hợp các bài viết về ${decodedTag} trên blog Hoàng Văn Giỏi.`,
    alternates: {
      // `trailingSlash: true` → canonical phải khớp URL thật
      canonical: siteUrl(`/tags/${params.tag}`),
    },
    openGraph: {
      title,
      description: `Tổng hợp các bài viết về ${decodedTag}.`,
      images: [{ url: '/cover.webp', width: 1200, height: 630, alt: title }],
    },
  };
}
