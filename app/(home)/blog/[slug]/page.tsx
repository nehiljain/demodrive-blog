import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
// import { YouTubeVideo } from '@/components/react/YouTubeVideo';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  console.log('Slug:', params.slug);
  console.log('Page data:', page);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="container py-4 px-4">
        {page.data.cover_image && (
          <div className="relative mb-8 h-[720px] w-full overflow-hidden rounded-lg">
            <Image
              src={page.data.cover_image}
              alt={`Cover image for ${page.data.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 text-fd-muted-foreground">{page.data.description}</p>
      </div>
      <article className="container flex flex-col px-4">
        <div className="prose prose-invert min-w-0 max-w-none">
          <InlineTOC items={page.data.toc} />
          <Mdx components={{
            ...defaultMdxComponents,
            YouTubeVideo: (props) => <YouTubeVideo {...props} />
          }} />
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
            <p className="font-medium">
              {new Date(page.data.date).toDateString()}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}