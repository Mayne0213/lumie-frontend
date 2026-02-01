'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CreateQnaInput, createQnaSchema, useCreateQna } from '@/entities/qna';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { ApiError } from '@/src/shared/types/api';

export function CreateQuestionForm() {
  const router = useRouter();
  const { data: academiesData } = useAcademies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateQnaInput>({
    resolver: zodResolver(createQnaSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const { mutate: createQna, isPending, error } = useCreateQna();

  const onSubmit = (data: CreateQnaInput) => {
    createQna(data, {
      onSuccess: () => {
        router.push('/dashboard/qna');
      },
    });
  };

  const apiError = error as ApiError | null;
  const academies = academiesData?.content ?? [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
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
        label="제목 *"
        type="text"
        placeholder="질문 제목을 입력하세요"
        error={errors.title?.message}
        {...register('title')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          질문 내용 *
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={8}
          placeholder="질문 내용을 자세히 입력하세요"
          {...register('content')}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={isPending}>
          질문하기
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/qna')}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
