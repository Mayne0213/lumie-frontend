'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CreateScheduleInput, createScheduleSchema, useCreateSchedule } from '@/entities/schedule';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { ApiError } from '@/src/shared/types/api';

export function CreateScheduleForm() {
  const router = useRouter();
  const { data: academiesData } = useAcademies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateScheduleInput>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: {
      title: '',
      description: '',
      startTime: '',
      endTime: '',
    },
  });

  const { mutate: createSchedule, isPending, error } = useCreateSchedule();

  const onSubmit = (data: CreateScheduleInput) => {
    createSchedule(data, {
      onSuccess: () => {
        router.push('/admin/schedules');
      },
    });
  };

  const apiError = error as ApiError | null;
  const academies = academiesData?.content ?? [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      {apiError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{apiError.message}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          학원 *
        </label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setValue('academyId', Number(e.target.value))}
        >
          <option value="">학원을 선택하세요</option>
          {academies.map((academy) => (
            <option key={academy.id} value={academy.id}>
              {academy.name}
            </option>
          ))}
        </select>
        {errors.academyId && (
          <p className="mt-1 text-sm text-red-600">{errors.academyId.message}</p>
        )}
      </div>

      <Input
        label="상담명 *"
        type="text"
        placeholder="예: 진로 상담, 학습 상담"
        error={errors.title?.message}
        {...register('title')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          설명
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="상담에 대한 설명을 입력하세요"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="시작 시간 *"
          type="datetime-local"
          error={errors.startTime?.message}
          {...register('startTime')}
        />

        <Input
          label="종료 시간 *"
          type="datetime-local"
          error={errors.endTime?.message}
          {...register('endTime')}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={isPending}>
          스케줄 생성
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/schedules')}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
