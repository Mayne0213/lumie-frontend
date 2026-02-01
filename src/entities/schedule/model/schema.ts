import { z } from 'zod';

export const scheduleStatusSchema = z.enum(['AVAILABLE', 'BOOKED', 'CANCELLED', 'COMPLETED']);
export type ScheduleStatus = z.infer<typeof scheduleStatusSchema>;

export const scheduleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  academyId: z.number(),
  teacherId: z.number(),
  teacherName: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: scheduleStatusSchema,
  bookedBy: z.number().optional(),
  bookedByName: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Schedule = z.infer<typeof scheduleSchema>;

export const createScheduleSchema = z.object({
  title: z.string().min(2, '제목은 최소 2자 이상이어야 합니다.'),
  description: z.string().optional(),
  academyId: z.number({ error: '학원을 선택해주세요.' }),
  startTime: z.string().min(1, '시작 시간을 선택해주세요.'),
  endTime: z.string().min(1, '종료 시간을 선택해주세요.'),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;

export const reservationSchema = z.object({
  id: z.number(),
  scheduleId: z.number(),
  studentId: z.number(),
  studentName: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
  createdAt: z.string(),
});

export type Reservation = z.infer<typeof reservationSchema>;
