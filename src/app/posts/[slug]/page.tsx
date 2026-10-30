import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
  PageLastUpdate,
  EditOnGitHub,
} from 'fumadocs-ui/layouts/docs/page';
import { getPageImage, getTagHref, source } from '@/lib/source';
import { formatLongDate, toDateOnly } from '@/lib/date';
import { gitConfig, authors, siteUrl, siteFileUrl } from '@/lib/shared';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';

export default async function Page(props: PageProps<'/posts/[slug]'>) {
  const params = await props.params;
  const page = source.getPage([params.slug]);

  if (!page) notFound();

  const MDX = page.data.body;
  const date =
    page.data.date instanceof Date ? page.data.date : new Date(page.data.date);

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: 'clerk' }}
      className="max-w-[950px]"
    >
      {/*
        CSS KaTeX chỉ tải khi bài khai báo `math: true` trong frontmatter.

        Phục vụ như static asset trong `public/vendor/katex/` chứ không
        `import 'katex/dist/katex.css'`: Turbopack gom CSS theo MODULE GRAPH của
        page, nên kể cả khi bọc trong component render có điều kiện HOẶC dùng
        dynamic import, chunk CSS KaTeX (~28 KB) vẫn bị đính vào cả 19 trang bài
        viết dù 0/19 bài có công thức toán (đã đo, cả 2 cách đều thất bại).
        `<link>` là HTML thuần nên phụ thuộc hoàn toàn vào `page.data.math`.
      */}
      {page.data.math && (
        // `<link>` thủ công là cách DUY NHẤT gate được CSS KaTeX theo từng
        // trang: Turbopack gom CSS theo module graph nên mọi cách `import` đều
        // dính vào cả 19 trang bài viết.
        // eslint-disable-next-line @next/next/no-css-tags
        <link
          rel="stylesheet"
          href="/vendor/katex/katex.min.css"
          precedence="default"
        />
      )}

      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>

      <div className="flex flex-col gap-6 pb-8 border-b border-border">
        <div className="flex items-center gap-3">
          {page.data.authors.map((authorKey) => {
            const author = authors[authorKey] || authors['gioi'];
            return (
              <a
                key={authorKey}
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5"
              >
                {author.image_url && (
                  <Image
                    src={author.image_url}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                )}
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{author.name}</span>
                </div>
              </a>
            );
          })}

          <span className="text-muted-foreground">•</span>
          <time dateTime={toDateOnly(date)} className="text-muted-foreground">
            {formatLongDate(date)}
          </time>
        </div>

        {page.data.tags && page.data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {page.data.tags.map((tag) => (
              <Link
                key={tag}
                href={getTagHref(tag)}
                className="inline-flex items-center rounded-lg bg-muted px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-primary transition-colors border border-border/60"
                prefetch={false}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {page.data.image && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={page.data.image}
            alt={page.data.title}
            fill
            preload
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 860px"
          />
        </div>
      )}

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 empty:hidden">
        <PageLastUpdate date={date} />
        <EditOnGitHub
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/${page.path}`}
        />
      </div>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => page.slugs.length > 0)
    .map((page) => ({
      slug: page.slugs.at(-1)!,
    }));
}

export async function generateMetadata(
  props: PageProps<'/posts/[slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage([params.slug]);
  if (!page) notFound();

  const date =
    page.data.date instanceof Date ? page.data.date : new Date(page.data.date);

  // Ảnh OG sinh động từ `src/app/og/posts/[slug]/route.tsx`.
  // Trước đây route đó build ra 19 ảnh (~1.8 MB) nhưng KHÔNG được metadata
  // nào tham chiếu → social crawler chưa bao giờ nhìn thấy chúng.
  const og = getPageImage(page);

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      // `trailingSlash: true` trong next.config → canonical phải khớp URL thật
      canonical: siteUrl(`/posts/${params.slug}`),
    },
    openGraph: {
      type: 'article',
      tags: page.data.tags,
      publishedTime: date.toISOString(),
      // `authors[author]` có thể undefined nếu frontmatter khai báo key lạ
      // (thân bài đã có fallback `|| authors['gioi']`, metadata thì chưa → crash lúc build)
      authors: page.data.authors.map(
        (author) => (authors[author] ?? authors.gioi).name,
      ),
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: siteFileUrl(og.url),
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [siteFileUrl(og.url)],
    },
  };
}
