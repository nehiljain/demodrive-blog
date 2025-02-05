import Link from "next/link"
import { blog } from "@/lib/source"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export default function HomePage() {
  const posts = blog.getPages()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-14 pb-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Demodrive AI Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
          Insights on Content Analysis, Tools and AI in Documentation and Technical Content Creation
        </p>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-4">
        <div
          className={`grid gap-8 place-items-center ${
            posts.length === 1
              ? "max-w-md mx-auto"
              : posts.length === 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          }`}
        >
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.url}
              href={post.url}
              className="block w-full max-w-md group transition-transform hover:-translate-y-1"
            >
              <Card className="h-full">
                {post.data.cover_image && (
                  <div className="aspect-video relative overflow-hidden rounded-t-xl">
                    <Image
                      src={post.data.cover_image}
                      alt={post.data.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="group-hover:text-primary">{post.data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.data.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8">
                      {post.data.author_image ? (
                        <Image
                          src={post.data.author_image}
                          alt={post.data.author}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            {post.data.author.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{post.data.author}</span>
                      {post.data.author_title && (
                        <span className="text-gray-600 text-xs">{post.data.author_title}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {post.data.date &&
                      new Date(post.data.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
