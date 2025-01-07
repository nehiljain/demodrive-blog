// source.config.ts
import { defineCollections, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string().date().or(z.date()),
    cover_image: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});
export {
  blogPosts
};
