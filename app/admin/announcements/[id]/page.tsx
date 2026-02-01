'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
  UpdateAnnouncementInput,
  updateAnnouncementSchema,
} from '@/entities/announcement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';
import { Trash2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AnnouncementDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const announcementId = parseInt(id, 10);
  const router = useRouter();

  const { data: announcement, isLoading, error } = useAnnouncement(announcementId);
  const { mutate: updateAnnouncement, isPending: isUpdating } = useUpdateAnnouncement(announcementId);
  const { mutate: deleteAnnouncement, isPending: isDeleting } = useDeleteAnnouncement();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UpdateAnnouncementInput>({
    resolver: zodResolver(updateAnnouncementSchema),
  });

  useEffect(() => {
    if (announcement) {
      reset({
        title: announcement.title,
        content: announcement.content,
        isPinned: announcement.isPinned,
      });
    }
  }, [announcement, reset]);

  const onSubmit = (data: UpdateAnnouncementInput) => {
    updateAnnouncement(data, {
      onSuccess: () => {
        alert('공지사항이 수정되었습니다.');
      },
    });
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteAnnouncement(announcementId, {
        onSuccess: () => router.push('/admin/announcements'),
      });
    }
  };

  const isPinned = watch('isPinned');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">공지사항을 불러오는 중 오류가 발생했습니다.</p>
        <Button className="mt-4" onClick={() => router.push('/admin/announcements')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 수정</h1>
          <p className="text-gray-600">공지사항을 수정합니다.</p>
        </div>
        <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
          <Trash2 className="w-4 h-4 mr-1" />
          삭제
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
            <Input
              label="제목 *"
              type="text"
              error={errors.title?.message}
              {...register('title')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용 *
              </label>
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={8}
                {...register('content')}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                checked={isPinned}
                onChange={(e) => setValue('isPinned', e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="isPinned" className="text-sm text-gray-700">
                상단 고정
              </label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" loading={isUpdating}>
                저장
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/announcements')}
              >
                목록으로
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
