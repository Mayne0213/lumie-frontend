import { z } from 'zod';

export const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  academyId: z.number(),
  grade: z.string().optional(),
  parentPhone: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Student = z.infer<typeof studentSchema>;

export const createStudentSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.').max(100, '이름은 100자를 초과할 수 없습니다.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  phone: z.string().optional(),
  academyId: z.number({ error: '학원을 선택해주세요.' }),
  grade: z.string().optional(),
  parentPhone: z.string().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = createStudentSchema.partial().omit({ academyId: true });
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

export const bulkImportStudentSchema = z.object({
  academyId: z.number({ error: '학원을 선택해주세요.' }),
  students: z.array(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      grade: z.string().optional(),
      parentPhone: z.string().optional(),
    })
  ).min(1, '최소 1명의 학생 정보가 필요합니다.'),
});

export type BulkImportStudentInput = z.infer<typeof bulkImportStudentSchema>;
