import Link from 'next/link';
import { blog } from '@/lib/source';

export default function HomePage() {
  const posts = blog.getPages();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to My Blog</h1>
        <p className="text-xl text-fd-muted-foreground max-w-2xl mx-auto mb-8">
          Exploring ideas, sharing stories, and documenting my journey through technology and life.
        </p>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.url}
              href={post.url}
              className="group block bg-fd-secondary rounded-lg overflow-hidden transition-transform hover:-translate-y-1"
            >
              {post.data.image && (
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.data.image}
                    alt={post.data.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  {post.data.title}
                </h3>
                <p className="text-fd-muted-foreground mb-4">
                  {post.data.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-fd-muted-foreground">
                    {new Date(post.data.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium">{post.data.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
