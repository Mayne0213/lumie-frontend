import { z } from 'zod';

export const resourceSchema = z.object({
  id: z.number(),
  authorId: z.number(),
  announcementTitle: z.string(),
  announcementContent: z.string(),
  isItAssetAnnouncement: z.boolean().nullable().optional(),
  isItImportantAnnouncement: z.boolean().nullable().optional(),
  academyIds: z.array(z.number()).nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Resource = z.infer<typeof resourceSchema>;

export const createResourceSchema = z.object({
  authorId: z.number(),
  announcementTitle: z.string().min(2, '제목은 최소 2자 이상이어야 합니다.').max(200, '제목은 200자를 초과할 수 없습니다.'),
  announcementContent: z.string().min(1, '내용을 입력해주세요.'),
  isItImportantAnnouncement: z.boolean().optional(),
  isItAssetAnnouncement: z.literal(true),
  academyIds: z.array(z.number()).optional(),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;

export const updateResourceSchema = z.object({
  announcementTitle: z.string().min(2, '제목은 최소 2자 이상이어야 합니다.').max(200, '제목은 200자를 초과할 수 없습니다.').optional(),
  announcementContent: z.string().min(1, '내용을 입력해주세요.').optional(),
  isItImportantAnnouncement: z.boolean().optional(),
  academyIds: z.array(z.number()).optional(),
});

export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
