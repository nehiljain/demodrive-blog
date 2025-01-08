import Link from 'next/link';
import { blog } from '@/lib/source';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';

export default function HomePage() {
  const posts = blog.getPages();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to My Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Insights on Content Analysis, Tools and AI in Documentation and Technical Content Creation
        </p>
        <p className="text-muted-foreground">
          Want to write a guest article? Email us at founders@demodrive.tech
        </p>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className={`grid gap-8 place-items-center ${
          posts.length === 1 ? 'max-w-md mx-auto' :
          posts.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
          'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
        }`}>
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
                  <CardTitle className="group-hover:text-primary">
                    {post.data.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {post.data.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(post.data.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium">{post.data.author}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
