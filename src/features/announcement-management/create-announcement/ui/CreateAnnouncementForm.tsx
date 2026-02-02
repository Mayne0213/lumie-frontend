'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CreateAnnouncementInput, createAnnouncementSchema, useCreateAnnouncement } from '@/entities/announcement';
import { useAcademies } from '@/entities/academy';
import { useUser } from '@/entities/session';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { ApiError } from '@/src/shared/types/api';

export function CreateAnnouncementForm() {
  const router = useRouter();
  const user = useUser();
  const { data: academiesData } = useAcademies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateAnnouncementInput>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      authorId: user?.id,
      announcementTitle: '',
      announcementContent: '',
      isItImportantAnnouncement: false,
      academyIds: [],
    },
  });

  const { mutate: createAnnouncement, isPending, error } = useCreateAnnouncement();

  const onSubmit = (data: CreateAnnouncementInput) => {
    createAnnouncement(
      { ...data, authorId: user?.id ?? 0 },
      {
        onSuccess: () => {
          router.push('/admin/announcements');
        },
      }
    );
  };

  const apiError = error as ApiError | null;
  const academies = academiesData?.content ?? [];
  const isImportant = watch('isItImportantAnnouncement');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      {apiError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{apiError.message}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          학원
        </label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const value = e.target.value;
            setValue('academyIds', value ? [Number(value)] : []);
          }}
        >
          <option value="">전체 학원</option>
          {academies.map((academy) => (
            <option key={academy.id} value={academy.id}>
              {academy.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="제목 *"
        type="text"
        placeholder="공지 제목을 입력하세요"
        error={errors.announcementTitle?.message}
        {...register('announcementTitle')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          내용 *
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={8}
          placeholder="공지 내용을 입력하세요"
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
          중요 공지 (상단 고정)
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={isPending}>
          공지 작성
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/announcements')}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
