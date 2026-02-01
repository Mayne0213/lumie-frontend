import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentClient } from '@/src/shared/api/base';
import { Announcement, CreateAnnouncementInput, UpdateAnnouncementInput } from '../model/schema';
import { PaginatedResponse, PaginationParams } from '@/src/shared/types/api';

interface AnnouncementQueryParams extends PaginationParams {
  academyId?: number;
}

const QUERY_KEYS = {
  all: ['announcements'] as const,
  list: (params?: AnnouncementQueryParams) => [...QUERY_KEYS.all, 'list', params] as const,
  detail: (id: number) => [...QUERY_KEYS.all, 'detail', id] as const,
};

export function useAnnouncements(params?: AnnouncementQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (params?.page !== undefined) searchParams.set('page', String(params.page));
      if (params?.size !== undefined) searchParams.set('size', String(params.size));
      if (params?.sort) searchParams.set('sort', params.sort);
      if (params?.academyId) searchParams.set('academyId', String(params.academyId));
      const query = searchParams.toString();
      return contentClient.get<PaginatedResponse<Announcement>>(
        `/api/v1/announcements${query ? `?${query}` : ''}`
      );
    },
  });
}

export function useAnnouncement(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => contentClient.get<Announcement>(`/api/v1/announcements/${id}`),
    enabled: id > 0,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnnouncementInput) =>
      contentClient.post<Announcement>('/api/v1/announcements', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useUpdateAnnouncement(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAnnouncementInput) =>
      contentClient.patch<Announcement>(`/api/v1/announcements/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contentClient.delete<void>(`/api/v1/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
  });
}
