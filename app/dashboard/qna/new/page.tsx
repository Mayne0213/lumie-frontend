'use client';

import { CreateQuestionForm } from '@/features/qna-management';

export default function NewQuestionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">질문하기</h1>
        <p className="text-gray-600">궁금한 점을 질문합니다.</p>
      </div>
      <CreateQuestionForm />
    </div>
  );
}
