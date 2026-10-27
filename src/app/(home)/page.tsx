import type { Metadata } from 'next';
import { BlogItem } from '@/components/BlogItem';
import { LinkButton } from '@/components/LinkButton';
import { EyeIcon } from 'lucide-react';
import { gitConfig } from '@/lib/shared';
import { source } from '@/lib/source';
import { About } from '@/components/About';
import { SiGithub } from '@icons-pack/react-simple-icons';

export const metadata: Metadata = {
  alternates: {
    canonical: `/`,
  },
};

export default function HomePage() {
  const pages = [...source.getPages()].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="mb-2">
        <h1 className="mb-3 text-center text-3xl font-extrabold tracking-tight md:text-5xl">
          Hành trang công nghệ
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
          Nơi lưu giữ, hệ thống hóa và chia sẻ kiến thức về lập trình C/C++,
          Embedded Linux, vi điều khiển và kỹ thuật phần mềm.
        </p>
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
            Mã nguồn trên GitHub
          </LinkButton>
        </div>
      </div>

      <section className="rounded-xl border bg-card/60 p-6 text-card-foreground backdrop-blur-xs md:p-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          Giới thiệu &amp; Định hướng chuyên môn
        </h2>

        <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
          <p>
            Chào mừng bạn đến với{' '}
            <strong className="text-foreground">hoangvangioi.com</strong>. Tôi
            là <strong className="text-foreground">Hoàng Văn Giỏi</strong>, kỹ
            sư phần mềm và hệ thống nhúng tại Hà Nội. Đây là nơi tôi ghi lại
            kiến thức, kinh nghiệm thực hành và quá trình tìm hiểu về lập trình
            C/C++ cùng phát triển firmware cho các hệ thống nhúng trên nền tảng
            Linux.
          </p>

          <p>Nội dung của blog tập trung vào hai hướng chính:</p>

          <ul className="grid grid-cols-1 gap-3 pt-1 text-sm leading-relaxed sm:text-base md:grid-cols-2">
            <li className="rounded-lg border bg-background/50 p-4">
              <strong className="text-foreground">
                Lập trình C &amp; C++ chuyên sâu:
              </strong>{' '}
              Tập trung vào bản chất ngôn ngữ và tư duy lập trình hệ thống: quản
              lý bộ nhớ (Stack, Heap, malloc/free), con trỏ nâng cao, toán tử
              Bitwise, Struct/Union, thư viện chuẩn, Macro/tiền xử lý và quy
              trình gỡ lỗi bằng GDB.
            </li>

            <li className="rounded-lg border bg-background/50 p-4">
              <strong className="text-foreground">
                Hệ thống nhúng, Firmware &amp; Embedded Linux:
              </strong>{' '}
              Bao gồm lập trình vi điều khiển STM32, phát triển firmware, mô
              phỏng Raspberry Pi 4 bằng QEMU ARM, quản trị Arch Linux và sử dụng
              các công cụ như Bash, Git, CMake, Neovim hay Android ADB trong quá
              trình phát triển và gỡ lỗi.
            </li>
          </ul>
        </div>
      </section>

      <About />

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <h2 className="text-2xl font-bold tracking-tight max-sm:text-center sm:ml-2 md:text-3xl">
          Tất cả bài viết
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page, i) => (
          <BlogItem key={page.url} page={page} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
