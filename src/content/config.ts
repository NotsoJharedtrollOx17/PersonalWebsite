/**
 * Defines how to handle the Astro 'frontmatter' of markdown pages,
 * ensuring strict data type compliance during load.
 */
import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

export const collections = {
  blog: defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    })
  }),
  pages: defineCollection({
    loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
      title: z.string(),
      cvFileUrl: z.string().optional()
    })
  })
};