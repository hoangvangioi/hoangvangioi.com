import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Post as Page } from '@/lib/source';

export function BlogItem({
  page,
  priority = false,
}: {
  page: Page;
  priority?: boolean;
}) {
  if (!page) notFound();

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
            preload={priority}
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
        <p className="text-lg font-medium">{page.data.title}</p>

        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {page.data.description}
        </p>

        <p className="mt-auto pt-2 text-end text-sm text-muted-foreground">
          {page.data.date.toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
