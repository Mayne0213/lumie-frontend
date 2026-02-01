'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CreateExamInput, createExamSchema, useCreateExam } from '@/entities/exam';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { ApiError } from '@/src/shared/types/api';

export function CreateExamForm() {
  const router = useRouter();
  const { data: academiesData } = useAcademies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateExamInput>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      title: '',
      description: '',
      totalScore: 100,
    },
  });

  const { mutate: createExam, isPending, error } = useCreateExam();

  const onSubmit = (data: CreateExamInput) => {
    createExam(data, {
      onSuccess: () => {
        router.push('/admin/exams');
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
        label="시험명 *"
        type="text"
        placeholder="시험명을 입력하세요"
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
          placeholder="시험에 대한 설명을 입력하세요"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="시작일"
          type="datetime-local"
          error={errors.startDate?.message}
          {...register('startDate')}
        />

        <Input
          label="종료일"
          type="datetime-local"
          error={errors.endDate?.message}
          {...register('endDate')}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="제한 시간 (분)"
          type="number"
          placeholder="60"
          error={errors.duration?.message}
          {...register('duration', { valueAsNumber: true })}
        />

        <Input
          label="총점 *"
          type="number"
          placeholder="100"
          error={errors.totalScore?.message}
          {...register('totalScore', { valueAsNumber: true })}
        />

        <Input
          label="합격 점수"
          type="number"
          placeholder="60"
          error={errors.passingScore?.message}
          {...register('passingScore', { valueAsNumber: true })}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={isPending}>
          시험 생성
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/exams')}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
