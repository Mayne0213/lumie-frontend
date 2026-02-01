import { z } from 'zod';

export const announcementSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  academyId: z.number(),
  authorId: z.number(),
  authorName: z.string(),
  isPinned: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Announcement = z.infer<typeof announcementSchema>;

export const createAnnouncementSchema = z.object({
  title: z.string().min(2, '제목은 최소 2자 이상이어야 합니다.').max(200, '제목은 200자를 초과할 수 없습니다.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  academyId: z.number({ error: '학원을 선택해주세요.' }),
  isPinned: z.boolean().optional(),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;

export const updateAnnouncementSchema = createAnnouncementSchema.partial().omit({ academyId: true });
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
