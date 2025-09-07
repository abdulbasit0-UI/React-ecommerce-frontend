import { z } from 'zod';

export const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  logo: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});