import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { academyClient } from '@/src/shared/api/base';
import { Student, CreateStudentInput, UpdateStudentInput, BulkImportStudentInput } from '../model/schema';
import { PaginatedResponse, PaginationParams } from '@/src/shared/types/api';

interface StudentQueryParams extends PaginationParams {
  academyId?: number;
  search?: string;
  isActive?: boolean;
}

const QUERY_KEYS = {
  all: ['students'] as const,
  list: (params?: StudentQueryParams) => [...QUERY_KEYS.all, 'list', params] as const,
  detail: (id: number) => [...QUERY_KEYS.all, 'detail', id] as const,
};

export function useStudents(params?: StudentQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.page !== undefined) searchParams.set('page', String(params.page));
      if (params?.size !== undefined) searchParams.set('size', String(params.size));
      if (params?.sort) searchParams.set('sort', params.sort);
      if (params?.academyId !== undefined) searchParams.set('academyId', String(params.academyId));
      if (params?.isActive !== undefined) searchParams.set('isActive', String(params.isActive));
      const query = searchParams.toString();
      return academyClient.get<PaginatedResponse<Student>>(
        `/api/v1/students${query ? `?${query}` : ''}`
      );
    },
  });
}

export function useStudent(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => academyClient.get<Student>(`/api/v1/students/${id}`),
    enabled: options?.enabled ?? id > 0,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudentInput) =>
      academyClient.post<Student>('/api/v1/students', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      toast.success('학생이 등록되었습니다.');
    },
  });
}

export function useUpdateStudent(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateStudentInput) =>
      academyClient.patch<Student>(`/api/v1/students/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      toast.success('학생 정보가 수정되었습니다.');
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => academyClient.delete<void>(`/api/v1/students/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      toast.success('학생이 삭제되었습니다.');
    },
  });
}

export function useBulkImportStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkImportStudentInput) =>
      academyClient.post<{ imported: number; failed: number }>(
        '/api/v1/students/bulk',
        data
      ),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      toast.success(`${result.imported}명이 등록되었습니다.`);
    },
  });
}
