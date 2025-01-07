// source.config.ts
import { defineCollections, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    author: z.string(),
    author_title: z.string().optional(),
    author_image: z.string().optional(),
    cover_image: z.string().optional(),
    readingTime: z.string().optional(),
    showToc: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional()
  })
});
export {
  blogPosts
};
