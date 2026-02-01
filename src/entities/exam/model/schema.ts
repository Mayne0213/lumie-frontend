import { z } from 'zod';

export const examStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']);
export type ExamStatus = z.infer<typeof examStatusSchema>;

export const examSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  academyId: z.number(),
  status: examStatusSchema,
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  duration: z.number().optional(), // minutes
  totalScore: z.number(),
  passingScore: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Exam = z.infer<typeof examSchema>;

export const createExamSchema = z.object({
  title: z.string().min(2, '시험명은 최소 2자 이상이어야 합니다.').max(200, '시험명은 200자를 초과할 수 없습니다.'),
  description: z.string().optional(),
  academyId: z.number({ error: '학원을 선택해주세요.' }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  duration: z.number().optional(),
  totalScore: z.number().min(1, '총점은 1점 이상이어야 합니다.'),
  passingScore: z.number().optional(),
});

export type CreateExamInput = z.infer<typeof createExamSchema>;

export const updateExamSchema = createExamSchema.partial().omit({ academyId: true });
export type UpdateExamInput = z.infer<typeof updateExamSchema>;

export const examResultSchema = z.object({
  id: z.number(),
  examId: z.number(),
  studentId: z.number(),
  studentName: z.string(),
  score: z.number(),
  isPassed: z.boolean(),
  submittedAt: z.string(),
  gradedAt: z.string().optional(),
});

export type ExamResult = z.infer<typeof examResultSchema>;

export const submitExamResultSchema = z.object({
  studentId: z.number({ error: '학생을 선택해주세요.' }),
  score: z.number().min(0, '점수는 0점 이상이어야 합니다.'),
});

export type SubmitExamResultInput = z.infer<typeof submitExamResultSchema>;
