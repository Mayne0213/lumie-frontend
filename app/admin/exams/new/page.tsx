'use client';

import { CreateExamForm } from '@/features/exam-management';

export default function NewExamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">시험 생성</h1>
        <p className="text-gray-600">새로운 시험을 생성합니다.</p>
      </div>
      <CreateExamForm />
    </div>
  );
}
