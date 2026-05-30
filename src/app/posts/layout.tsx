import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default function Layout({ children }: LayoutProps<'/posts'>) {
  const tree = source.getPageTree();

  return (
    <main
      className="mx-auto w-full max-w-full"
      itemType="http://schema.org/Article"
      itemScope
    >
      <DocsLayout
        tree={tree}
        sidebar={{ enabled: false }}
        nav={{ enabled: false }}
        containerProps={{
          className: '[--fd-banner-height:3.5rem]',
        }}
      >
        {children}
      </DocsLayout>
    </main>
  );
}
