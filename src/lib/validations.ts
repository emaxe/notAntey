import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  source: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  images: z.array(z.string().url()).optional(),
  published: z.boolean().optional(),
});

export const priceCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

export const priceItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  priceUnit: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  sortOrder: z.number().int().optional(),
});

export const featureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  mediaUrl: z.string().url().optional().or(z.literal('')),
  sortOrder: z.number().int().optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imageUrl: z.string().url('Valid image URL required'),
  category: z.string().optional(),
});
