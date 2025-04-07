import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  perex: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description is too long'),
  content: z.string().min(1, 'Content is required'),
  imageId: z.any().optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
