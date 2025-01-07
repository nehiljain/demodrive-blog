import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';

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

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Post Header */}
      <div className="mb-8">
        {/* Reading time and date */}
        <div className="text-gray-600 text-sm mb-4">
          {page.data.date && (
            <time dateTime={page.data.date}>
              {new Date(page.data.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          )}
          {page.data.readingTime && (
            <span className="ml-2">• {page.data.readingTime} min read</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{page.data.title}</h1>
        
        {/* Description */}
        {page.data.description && (
          <p className="text-gray-600 text-lg mb-6">{page.data.description}</p>
        )}

        {/* Author info */}
        {page.data.author && (
          <div className="flex items-center gap-3">
            {page.data.author_image && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={page.data.author_image}
                  alt={page.data.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="font-medium">{page.data.author}</div>
              {page.data.author_title && (
                <div className="text-gray-600 text-sm">{page.data.author_title}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {page.data.cover_image && (
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={page.data.cover_image}
            alt={`Cover image for ${page.data.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        {page.data.showToc && <InlineTOC items={page.data.toc} />}
        <Mdx components={defaultMdxComponents} />
      </article>
    </div>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}