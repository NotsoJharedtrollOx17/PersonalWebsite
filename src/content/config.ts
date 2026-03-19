/**
 * Defines how to handle the Astro 'frontmatter' of markdown pages,
 * ensuring strict data type compliance during load.
 */
import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    cvFileLink: z.string().url().optional()
  })
});

export const collections = {
  pages
};