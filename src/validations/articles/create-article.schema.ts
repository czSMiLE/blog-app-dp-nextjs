import { z } from 'zod';

import { articleSchema } from './article.schema';

export const createArticleSchema = articleSchema.extend({
  imageId: z.any().refine((file) => file && file.length > 0, {
    message: 'Image is required',
  }),
});

export type CreateArticleFormData = z.infer<typeof createArticleSchema>;
