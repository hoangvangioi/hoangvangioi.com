import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { site } from '@/lib/shared';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/posts/[slug]'>,
) {
  const { slug } = await params;

  const page = source.getPage([slug]);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage
      title={page.data.title}
      description={page.data.description}
      site={site.site_name}
    />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments[0],
  }));
}
