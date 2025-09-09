import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});