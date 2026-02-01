'use client';

import { QnaList } from '@/features/qna-management';

export default function AdminQnaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Q&A 관리</h1>
        <p className="text-gray-600">학생들의 질문을 확인하고 답변합니다.</p>
      </div>
      <QnaList isAdmin />
    </div>
  );
}
