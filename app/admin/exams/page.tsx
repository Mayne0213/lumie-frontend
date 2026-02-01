'use client';

import { ExamList } from '@/features/exam-management';

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">시험 관리</h1>
        <p className="text-gray-600">등록된 시험을 관리합니다.</p>
      </div>
      <ExamList />
    </div>
  );
}
