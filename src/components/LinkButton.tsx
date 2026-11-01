import { type ComponentProps, type ReactNode } from 'react';
import Link from 'fumadocs-core/link';
import { ChevronRightIcon } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn';

type LinkButtonProps = {
  icon?: ReactNode;
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
        buttonVariants({ variant: 'primary' }),
        // Geometry the fumadocs base does not carry (it only has p-2).
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
