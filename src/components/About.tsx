import Link from 'next/link';
import {
  SiC,
  SiCplusplus,
  SiArchlinux,
  SiGit,
  SiGnubash,
  SiLinux,
  SiPython,
  SiNeovim,
  SiCmake,
  SiDjango,
  SiFlutter,
  SiStmicroelectronics,
} from '@icons-pack/react-simple-icons';
import { ZapIcon, LinkIcon } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/shared';

export function About() {
  return (
    <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2">
      <Stacks />
      <Connect />
    </div>
  );
}

const Connect = () => {
  return (
    <div className="rounded-xl border p-4 lg:p-6">
      <div className="mb-4 flex items-center gap-2">
        <LinkIcon className="size-4" />
        <h2 className="text-sm font-medium">Connect</h2>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border/100 overflow-hidden rounded-xl">
        {SOCIAL_LINKS.map(({ href, title, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
          >
            <Icon className="size-6" />
            <span className="text-sm">{title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Stacks = () => {
  return (
    <div className="flex h-60 flex-col gap-2 overflow-hidden rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <ZapIcon className="size-[18px]" />
        <h2 className="text-sm font-light">Stacks</h2>
      </div>
      <div
        aria-hidden="true"
        className="group flex flex-row gap-5 overflow-hidden py-4 [mask-image:linear-gradient(to_right,_transparent_0%,_rgba(0,_0,_0,_1.0)_10%,_rgba(0,_0,_0,_1.0)_90%,_transparent_100%)]"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 animate-marquee-left flex-row justify-around gap-5 group-hover:[animation-play-state:paused]"
          >
            <SiC className="size-10" />
            <SiCplusplus className="size-10" />
            <SiPython className="size-10" />
            <SiDjango className="size-10" />
            <SiCmake className="size-10" />
            <SiFlutter className="size-10" />
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="group flex flex-row gap-5 overflow-hidden py-4 [mask-image:linear-gradient(to_right,_transparent_0%,_rgba(0,_0,_0,_1.0)_10%,_rgba(0,_0,_0,_1.0)_90%,_transparent_100%)]"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 animate-marquee-left-reverse flex-row justify-around gap-5 group-hover:[animation-play-state:paused]"
          >
            <SiGit className="size-10" />
            <SiLinux className="size-10" />
            <SiNeovim className="size-10" />
            <SiGnubash className="size-10" />
            <SiArchlinux className="size-10" />
            <SiStmicroelectronics className="size-10" />
          </div>
        ))}
      </div>
    </div>
  );
};
