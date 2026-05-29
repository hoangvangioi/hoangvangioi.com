import { type ComponentProps, type ReactNode } from 'react';
import Link from 'fumadocs-core/link';
import { ChevronRightIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

type LinkButtonProps = {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
} & ComponentProps<typeof Link>;

export function LinkButton({
  variant = 'secondary',
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
        buttonVariants({ variant: 'default' }),
        'inline-flex items-center gap-2',
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
