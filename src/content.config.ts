import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().optional(),
  noindex: z.boolean().default(false),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(100),
    excerpt: z.string().max(200),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    published: z.boolean().default(false),
    author: z.string().default('Cuisine Air Fryer'),
    category: z.enum(['recette', 'comparatif', 'test', 'guide', 'actualite', 'accessoire']),
    tags: z.array(z.string()).min(1).max(5).default([]),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().min(10).optional(),
    seo: seoSchema.optional(),
    relatedArticles: z.array(z.string()).max(3).default([]),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(100),
    excerpt: z.string().max(200),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    published: z.boolean().default(false),
    author: z.string().default('Cuisine Air Fryer'),
    difficulty: z.enum(['debutant', 'intermediaire', 'avance']),
    tags: z.array(z.string()).min(1).max(5).default([]),
    seo: seoSchema.optional(),
    prerequisites: z.array(z.string()).default([]),
    estimatedTime: z.string().optional(),
    relatedGuides: z.array(z.string()).max(2).default([]),
  }),
});

const recettes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(100),
    excerpt: z.string().max(200),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    published: z.boolean().default(false),
    author: z.string().default('Cuisine Air Fryer'),
    appareil: z.enum(['air-fryer', 'cookeo', 'thermomix', 'ninja', 'multicuiseur']),
    tags: z.array(z.string()).min(1).max(5).default([]),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().min(10).optional(),
    prepTime: z.string(),
    cookTime: z.string(),
    totalTime: z.string(),
    servings: z.number().min(1),
    calories: z.number().optional(),
    ingredients: z.array(z.string()).min(2),
    difficulty: z.enum(['facile', 'moyen', 'difficile']),
    seo: seoSchema.optional(),
    relatedRecettes: z.array(z.string()).max(3).default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    seo: seoSchema.optional(),
  }),
});

export const collections = { blog, guides, recettes, pages };
