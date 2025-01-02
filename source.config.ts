// source.config.ts
import { defineCollections, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from 'zod';
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date())
  })
});
export {
  blogPosts
};
