import { notFound } from "next/navigation"
import Image from "next/image"
import { InlineTOC } from "fumadocs-ui/components/inline-toc"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { blog } from "@/lib/source"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const page = blog.getPage([params.slug])

  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const page = blog.getPage([params.slug])

  if (!page) notFound()
  const Mdx = page.data.body

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Post Header */}
      <div className="mb-6 mt-10">
        {/* Reading time and date */}
        <div className="text-gray-600 text-sm mb-2">
          {page.data.date && (
            <time dateTime={page.data.date}>
              {new Date(page.data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
          {page.data.readingTime && (
            <span className="ml-2">• {page.data.readingTime} min read</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">{page.data.title}</h1>

        {/* Description */}
        {page.data.description && (
          <p className="text-gray-600 text-base mb-4">{page.data.description}</p>
        )}

        {/* Author info - Updated to match the image design */}
        {page.data.author && (
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              {page.data.author_image ? (
                <Image
                  src={page.data.author_image}
                  alt={page.data.author}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                // Fallback avatar if no image is provided
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{page.data.author.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{page.data.author}</span>
              {page.data.author_title && (
                <span className="text-gray-600 text-sm">{page.data.author_title}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {page.data.cover_image && (
        <div className="relative h-[350px] mb-6 rounded-lg overflow-hidden">
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
      <article className="prose prose-base max-w-none">
        {page.data.showToc && <InlineTOC items={page.data.toc} />}
        <Mdx components={defaultMdxComponents} />
      </article>
    </div>
  )
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }))
}
