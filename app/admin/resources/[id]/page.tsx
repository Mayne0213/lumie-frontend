'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useResource,
  useUpdateResource,
  useDeleteResource,
  UpdateResourceInput,
  updateResourceSchema,
} from '@/entities/resource';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { Card, CardContent } from '@/src/shared/ui/Card';
import { Trash2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ResourceDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const resourceId = parseInt(id, 10);
  const router = useRouter();

  const { data: resource, isLoading, error } = useResource(resourceId);
  const { mutate: updateResource, isPending: isUpdating } = useUpdateResource(resourceId);
  const { mutate: deleteResource, isPending: isDeleting } = useDeleteResource();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UpdateResourceInput>({
    resolver: zodResolver(updateResourceSchema),
  });

  useEffect(() => {
    if (resource) {
      reset({
        announcementTitle: resource.announcementTitle,
        announcementContent: resource.announcementContent,
        isItImportantAnnouncement: resource.isItImportantAnnouncement ?? false,
      });
    }
  }, [resource, reset]);

  const onSubmit = (data: UpdateResourceInput) => {
    updateResource(data, {
      onSuccess: () => {
        alert('자료가 수정되었습니다.');
      },
    });
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteResource(resourceId, {
        onSuccess: () => router.push('/admin/resources'),
      });
    }
  };

  const isImportant = watch('isItImportantAnnouncement');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">자료를 불러오는 중 오류가 발생했습니다.</p>
        <Button className="mt-4" onClick={() => router.push('/admin/resources')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자료 수정</h1>
          <p className="text-gray-600">자료를 수정합니다.</p>
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
              error={errors.announcementTitle?.message}
              {...register('announcementTitle')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용 *
              </label>
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={8}
                {...register('announcementContent')}
              />
              {errors.announcementContent && (
                <p className="mt-1 text-sm text-red-600">{errors.announcementContent.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isItImportantAnnouncement"
                checked={isImportant}
                onChange={(e) => setValue('isItImportantAnnouncement', e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="isItImportantAnnouncement" className="text-sm text-gray-700">
                중요 자료 (상단 고정)
              </label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" loading={isUpdating}>
                저장
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/resources')}
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
