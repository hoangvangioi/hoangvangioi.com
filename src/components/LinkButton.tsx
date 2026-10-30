import { type ComponentProps, type ReactNode } from 'react';
import Link from 'fumadocs-core/link';
import { ChevronRightIcon } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn';

type LinkButtonProps = {
  icon?: ReactNode;
  /**
   * @deprecated Prop này chưa từng được dùng để đổi style (code cũ luôn render
   * biến thể `default`). Giữ lại để không phá call site hiện có; muốn đổi style
   * thì truyền `className`.
   */
  variant?: 'primary' | 'secondary';
} & ComponentProps<typeof Link>;

export function LinkButton({
  icon,
  children,
  className,
  ...props
}: LinkButtonProps) {
  const hasIcon = icon != null;

  return (
    <Link
      {...props}
      className={cn(
        // Dùng chung `buttonVariants` của fumadocs-ui — `header.tsx` cũng dùng
        // bản này. Trước đây repo tự định nghĩa một cva trùng lặp ở
        // `src/components/ui/button.tsx` (2 nguồn sự thật, dễ lệch style).
        // `variant: 'primary'` của fumadocs tương đương `default` của bản cũ.
        buttonVariants({ variant: 'primary' }),
        // Bù lại khác biệt hình học: base của fumadocs chỉ có `p-2`,
        // bản cũ có `h-10 px-4 py-2` + shadow trong.
        'inline-flex h-10 items-center gap-2 shadow-inner shadow-fd-background/20',
        hasIcon ? 'px-6' : 'pl-7 pr-5',
        className,
      )}
    >
      {icon}

      <span className="inline-flex items-center gap-2">{children}</span>

      {!hasIcon && <ChevronRightIcon className="h-4 w-4 opacity-80" />}
    </Link>
  );
}
