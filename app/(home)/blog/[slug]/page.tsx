import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
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
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <div className="space-y-4 mb-8">
        {/* Reading time and date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={page.data.date}>
            {new Date(page.data.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>{page.data.readingTime || '3 min read'}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight">{page.data.title}</h1>
        
        {/* Description */}
        <p className="text-xl text-muted-foreground leading-relaxed">
          {page.data.description}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-3 pt-4">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={page.data.author_image || '/default-avatar.png'} 
              alt={page.data.author} 
            />
            <AvatarFallback>
              {page.data.author?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{page.data.author}</div>
            <div className="text-sm text-muted-foreground">
              {page.data.author_title || 'Author'}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {page.data.cover_image && (
        <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-lg">
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
      <article className="prose prose-invert max-w-none">
        <InlineTOC items={page.data.toc} />
        <Mdx components={{
          ...defaultMdxComponents,
          YouTubeVideo: (props) => <YouTubeVideo {...props} />
        }} />
      </article>
    </div>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}