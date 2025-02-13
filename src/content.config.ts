import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const quotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/quotes" }),
  schema: z.object({
    content: z.string(),
    author: z.string(),
  }),
});

export const collections = { quotes };
