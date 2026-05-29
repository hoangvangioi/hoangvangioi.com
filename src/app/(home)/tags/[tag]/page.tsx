import type { Metadata } from 'next';
import { BlogItem } from '@/components/BlogItem';
import { LinkButton } from '@/components/LinkButton';
import { getTags, source } from '@/lib/source';
import { SITE_URL } from '@/lib/shared';

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  const pages = source
    .getPages()
    .filter((blog) =>
      blog.data.tags?.some(
        (tag) => tag.toLowerCase().replace(/\s+/g, '-') === decodedTag,
      ),
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
          <BlogItem key={page.data.title} page={page} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const tags = [...getTags().keys()];
  return tags.map((key) => ({
    tag: key.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  return {
    title: `Bài viết được gắn thẻ ${decodedTag}`,
    alternates: {
      canonical: `${SITE_URL}/tags/${params.tag}`,
    },
    openGraph: {
      images: '/cover.webp',
      title: `Bài viết được gắn thẻ ${decodedTag}`,
    },
  };
}
