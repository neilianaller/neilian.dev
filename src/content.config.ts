import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  category: z.string(),
  image: z.string(),
  gallery: z.array(z.string()).optional().default([]),
  link: z.string().default('https://example.com/TODO'),
  storySlug: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  year: z.number().default(2026),
});

const storySchema = z.object({
  title: z.string(),
  project: z.string(),
  tagline: z.string(),
  date: z.coerce.date(),
  icon: z.string().default('/placeholders/icon.png'),
  ctaLabel: z.string().default('Check out project'),
  ctaLink: z.string().default('https://example.com/TODO'),
  draft: z.boolean().default(false),
});

const web = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/web' }),
  schema: projectSchema,
});

const mobile = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/mobile' }),
  schema: projectSchema,
});

const design = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/design' }),
  schema: projectSchema,
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: storySchema,
});

export const collections = { web, mobile, design, stories };
