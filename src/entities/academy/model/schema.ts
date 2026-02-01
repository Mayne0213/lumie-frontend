import { z } from 'zod';

export const academySchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(100),
  address: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Academy = z.infer<typeof academySchema>;

export const createAcademySchema = z.object({
  name: z.string().min(2, '학원명은 최소 2자 이상이어야 합니다.').max(100, '학원명은 100자를 초과할 수 없습니다.'),
  address: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
});

export type CreateAcademyInput = z.infer<typeof createAcademySchema>;

export const updateAcademySchema = createAcademySchema.partial();
export type UpdateAcademyInput = z.infer<typeof updateAcademySchema>;
