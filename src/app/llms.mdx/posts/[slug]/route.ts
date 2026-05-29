import { getLLMText, getPageMarkdownUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/llms.mdx/posts/[slug]'>,
) {
  const { slug } = await params;

  // source.getPage nhận vào một mảng các sub-slug. Vì là [slug] đơn, ta chỉ cần bỏ nó vào mảng [slug]
  const page = source.getPage([slug]);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown' },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageMarkdownUrl(page).segments[0],
  }));
}
