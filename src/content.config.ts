import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
  title: z.string().max(60),
  description: z.string().min(130).max(160),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(200),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Rédaction Cuisine Air Fryer'),
    category: z.enum(['recette', 'comparatif', 'test', 'guide', 'actualite', 'accessoire']),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    seo: seoSchema,
    relatedArticles: z.array(z.string()).default([]),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(200),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Rédaction Cuisine Air Fryer'),
    difficulty: z.enum(['debutant', 'intermediaire', 'avance']),
    tags: z.array(z.string()).default([]),
    seo: seoSchema,
    prerequisites: z.array(z.string()).default([]),
    estimatedTime: z.string().optional(),
  }),
});

export const collections = { blog, guides };
