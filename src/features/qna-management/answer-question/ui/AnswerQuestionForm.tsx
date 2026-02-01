'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnswerQnaInput, answerQnaSchema, useAnswerQna } from '@/entities/qna';
import { Button } from '@/src/shared/ui/Button';
import { ApiError } from '@/src/shared/types/api';

interface AnswerQuestionFormProps {
  qnaId: number;
  onSuccess?: () => void;
}

export function AnswerQuestionForm({ qnaId, onSuccess }: AnswerQuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnswerQnaInput>({
    resolver: zodResolver(answerQnaSchema),
    defaultValues: {
      answer: '',
    },
  });

  const { mutate: answerQna, isPending, error } = useAnswerQna(qnaId);

  const onSubmit = (data: AnswerQnaInput) => {
    answerQna(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  const apiError = error as ApiError | null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{apiError.message}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          답변
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="답변을 입력하세요"
          {...register('answer')}
        />
        {errors.answer && (
          <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
        )}
      </div>

      <Button type="submit" loading={isPending}>
        답변 등록
      </Button>
    </form>
  );
}
