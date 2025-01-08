import { toRuntime } from "fumadocs-mdx"
import * as blogPosts_0 from "../content/blog/hello-world.mdx?collection=blogPosts&hash=20fa8794bb30d6cd5b56de49cf6df245724e4f272dceea5521769036abd481b1"
import * as blogPosts_1 from "../content/blog/post-2.mdx?collection=blogPosts&hash=20fa8794bb30d6cd5b56de49cf6df245724e4f272dceea5521769036abd481b1"
import * as blogPosts_2 from "../content/blog/post-3.mdx?collection=blogPosts&hash=20fa8794bb30d6cd5b56de49cf6df245724e4f272dceea5521769036abd481b1"
export const blogPosts = [
  toRuntime("doc", blogPosts_0, {
    path: "hello-world.mdx",
    absolutePath: "/Users/nehiljain/code/demodrive-blog/content/blog/hello-world.mdx",
  }),
  toRuntime("doc", blogPosts_1, {
    path: "post-2.mdx",
    absolutePath: "/Users/nehiljain/code/demodrive-blog/content/blog/post-2.mdx",
  }),
  toRuntime("doc", blogPosts_2, {
    path: "post-3.mdx",
    absolutePath: "/Users/nehiljain/code/demodrive-blog/content/blog/post-3.mdx",
  }),
]
