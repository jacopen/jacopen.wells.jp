import { defineCollection, z } from 'astro:content';

// ブログのコレクションを定義
export const collections = {
  'blog': defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      author: z.string(),
      tags: z.array(z.string()).default([]),
    }),
  }),
};
