'use client';

import { QnaList } from '@/features/qna-management';

export default function StudentQnaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Q&A</h1>
        <p className="text-gray-600">질문을 등록하고 답변을 확인합니다.</p>
      </div>
      <QnaList />
    </div>
  );
}
