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
import { getTagHref, source } from '@/lib/source';
import { gitConfig, authors, SITE_URL } from '@/lib/shared';
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
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>

      <div className="flex flex-col gap-6 pb-8 border-b border-border">
        <div className="flex items-center gap-3">
          {page.data.authors.map((authorKey, i) => {
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
          <time className="text-muted-foreground">
            {date.toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
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
            fetchPriority="high"
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
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
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

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: `${SITE_URL}/posts/${params.slug}`,
    },
    openGraph: {
      type: 'article',
      tags: page.data.tags,
      authors: page.data.authors.map((author) => authors[author].name),
      title: page.data.title,
      description: page.data.description,
      images: page.data.image ? [{ url: page.data.image }] : '/cover.webp',
    },
  };
}
