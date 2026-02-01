import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { examClient } from '@/src/shared/api/base';
import {
  Exam,
  CreateExamInput,
  UpdateExamInput,
  ExamResult,
  SubmitExamResultInput,
} from '../model/schema';
import { PaginatedResponse, PaginationParams } from '@/src/shared/types/api';

interface ExamQueryParams extends PaginationParams {
  academyId?: number;
  status?: string;
}

const QUERY_KEYS = {
  all: ['exams'] as const,
  list: (params?: ExamQueryParams) => [...QUERY_KEYS.all, 'list', params] as const,
  detail: (id: number) => [...QUERY_KEYS.all, 'detail', id] as const,
  results: (examId: number) => [...QUERY_KEYS.all, 'results', examId] as const,
  studentResults: () => ['student-exam-results'] as const,
};

export function useExams(params?: ExamQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.page !== undefined) searchParams.set('page', String(params.page));
      if (params?.size !== undefined) searchParams.set('size', String(params.size));
      if (params?.sort) searchParams.set('sort', params.sort);
      if (params?.academyId) searchParams.set('academyId', String(params.academyId));
      if (params?.status) searchParams.set('status', params.status);
      const query = searchParams.toString();
      return examClient.get<PaginatedResponse<Exam>>(
        `/api/v1/exams${query ? `?${query}` : ''}`
      );
    },
  });
}

export function useExam(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => examClient.get<Exam>(`/api/v1/exams/${id}`),
    enabled: id > 0,
  });
}

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExamInput) =>
      examClient.post<Exam>('/api/v1/exams', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useUpdateExam(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateExamInput) =>
      examClient.patch<Exam>(`/api/v1/exams/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function usePublishExam(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => examClient.post<Exam>(`/api/v1/exams/${id}/publish`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useCloseExam(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => examClient.post<Exam>(`/api/v1/exams/${id}/close`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => examClient.delete<void>(`/api/v1/exams/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

// Exam Results
export function useExamResults(examId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.results(examId),
    queryFn: () =>
      examClient.get<PaginatedResponse<ExamResult>>(`/api/v1/exams/${examId}/results`),
    enabled: examId > 0,
  });
}

export function useSubmitExamResult(examId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitExamResultInput) =>
      examClient.post<ExamResult>(`/api/v1/exams/${examId}/results`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.results(examId) });
    },
  });
}

// Student's own results
export function useMyExamResults() {
  return useQuery({
    queryKey: QUERY_KEYS.studentResults(),
    queryFn: () =>
      examClient.get<PaginatedResponse<ExamResult>>('/api/v1/exams/my-results'),
  });
}
