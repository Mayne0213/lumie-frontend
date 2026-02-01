import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { academyClient } from '@/src/shared/api/base';
import { Academy, CreateAcademyInput, UpdateAcademyInput } from '../model/schema';
import { PaginatedResponse, PaginationParams } from '@/src/shared/types/api';

const QUERY_KEYS = {
  all: ['academies'] as const,
  list: (params?: PaginationParams) => [...QUERY_KEYS.all, 'list', params] as const,
  detail: (id: number) => [...QUERY_KEYS.all, 'detail', id] as const,
};

export function useAcademies(params?: PaginationParams) {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.page !== undefined) searchParams.set('page', String(params.page));
      if (params?.size !== undefined) searchParams.set('size', String(params.size));
      if (params?.sort) searchParams.set('sort', params.sort);
      const query = searchParams.toString();
      return academyClient.get<PaginatedResponse<Academy>>(
        `/api/v1/academies${query ? `?${query}` : ''}`
      );
    },
  });
}

export function useAcademy(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => academyClient.get<Academy>(`/api/v1/academies/${id}`),
    enabled: id > 0,
  });
}

export function useCreateAcademy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAcademyInput) =>
      academyClient.post<Academy>('/api/v1/academies', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useUpdateAcademy(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAcademyInput) =>
      academyClient.patch<Academy>(`/api/v1/academies/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useDeleteAcademy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => academyClient.delete<void>(`/api/v1/academies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
