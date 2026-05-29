import Link from 'next/link';
import { ExternalLinkIcon, Star } from 'lucide-react';
import type { FooterItem } from '@/lib/shared';
import { gitConfig } from '@/lib/shared';
import { LogoSVG } from '@/components/LogoSVG';

export default function Footer({ items }: { items: FooterItem[] }) {
  return (
    <footer className="mt-auto w-full border-t p-8 pb-12">
      <div className="mx-auto flex flex-col max-w-[1400px] justify-between gap-6 sm:flex-row sm:items-center">
        <Info />
        <Item item={items} />
      </div>
    </footer>
  );
}

function Info() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <LogoSVG className="size-[38px] rounded-xl" aria-hidden="true" />
        <p className="text-xl font-bold">Hoàng Văn Giỏi</p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        &copy; Copyright <time dateTime="2022">2022</time>. All rights reserved.
      </p>
    </div>
  );
}

function Item({ item }: { item: FooterItem[] }) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6">
      {item.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="flex flex-row items-center text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
          {...(i.newWindow && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {i.label}
          {i.newWindow && (
            <ExternalLinkIcon className="ml-1.5 inline h-3 w-3" />
          )}
        </Link>
      ))}
      <a
        href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
        rel="noreferrer noopener"
        target="_blank"
        className="flex flex-row items-center text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
      >
        <Star className="mr-2 size-4" aria-hidden="true" />
        Give us a star
      </a>
    </div>
  );
}
