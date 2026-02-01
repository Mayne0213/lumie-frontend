'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAcademy, useUpdateAcademy, useDeleteAcademy, UpdateAcademyInput, updateAcademySchema } from '@/entities/academy';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';
import { useEffect } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AcademyDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const academyId = parseInt(id, 10);
  const router = useRouter();

  const { data: academy, isLoading, error } = useAcademy(academyId);
  const { mutate: updateAcademy, isPending: isUpdating } = useUpdateAcademy(academyId);
  const { mutate: deleteAcademy, isPending: isDeleting } = useDeleteAcademy();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateAcademyInput>({
    resolver: zodResolver(updateAcademySchema),
  });

  useEffect(() => {
    if (academy) {
      reset({
        name: academy.name,
        address: academy.address ?? '',
        phone: academy.phone ?? '',
        description: academy.description ?? '',
      });
    }
  }, [academy, reset]);

  const onSubmit = (data: UpdateAcademyInput) => {
    updateAcademy(data, {
      onSuccess: () => {
        alert('학원 정보가 수정되었습니다.');
      },
    });
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteAcademy(academyId, {
        onSuccess: () => {
          router.push('/admin/academies');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !academy) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">학원 정보를 불러오는 중 오류가 발생했습니다.</p>
        <Button className="mt-4" onClick={() => router.push('/admin/academies')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">학원 상세</h1>
          <p className="text-gray-600">학원 정보를 확인하고 수정합니다.</p>
        </div>
        <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
          학원 삭제
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>학원 정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <Input
              label="학원명 *"
              type="text"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="주소"
              type="text"
              error={errors.address?.message}
              {...register('address')}
            />

            <Input
              label="연락처"
              type="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                {...register('description')}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" loading={isUpdating}>
                저장
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/academies')}
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
