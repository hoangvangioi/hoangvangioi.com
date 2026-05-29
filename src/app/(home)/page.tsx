import type { Metadata } from 'next';
import { BlogItem } from '@/components/BlogItem';
import { LinkButton } from '@/components/LinkButton';
import { EyeIcon } from 'lucide-react';
import { gitConfig, SITE_URL } from '@/lib/shared';
import { source } from '@/lib/source';
import { About } from '@/components/About';
import { SiGithub } from '@icons-pack/react-simple-icons';

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}`,
  },
};

export default function HomePage() {
  const pages = source
    .getPages()
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="mb-5">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Hành trang công nghệ
          <div className="mt-4 text-2xl font-normal md:text-3xl">
            Nơi lưu giữ và chia sẻ những điều thú vị
          </div>
        </h1>
        <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
          <LinkButton
            href="/tags"
            icon={<EyeIcon className="h-4 w-4" />}
            variant="primary"
          >
            Xem tất cả các thẻ
          </LinkButton>
          <LinkButton
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            icon={<SiGithub className="h-4 w-4" />}
            target="_blank"
          >
            Tham gia với chúng tôi
          </LinkButton>
        </div>
      </div>

      <About />

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <h2 className="text-4xl font-bold max-sm:text-center sm:ml-5">
          Tất cả bài viết
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page, i) => (
          <BlogItem key={page.data.title} page={page} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
