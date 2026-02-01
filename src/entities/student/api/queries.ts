import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { academyClient } from '@/src/shared/api/base';
import { Student, CreateStudentInput, UpdateStudentInput, BulkImportStudentInput } from '../model/schema';
import { PaginatedResponse, PaginationParams } from '@/src/shared/types/api';

interface StudentQueryParams extends PaginationParams {
  academyId?: number;
  search?: string;
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
      if (params?.academyId) searchParams.set('academyId', String(params.academyId));
      if (params?.search) searchParams.set('search', params.search);
      const query = searchParams.toString();
      return academyClient.get<PaginatedResponse<Student>>(
        `/api/v1/students${query ? `?${query}` : ''}`
      );
    },
  });
}

export function useStudent(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => academyClient.get<Student>(`/api/v1/students/${id}`),
    enabled: id > 0,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudentInput) =>
      academyClient.post<Student>('/api/v1/students', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
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
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => academyClient.delete<void>(`/api/v1/students/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
