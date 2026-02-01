'use client';

import { BulkImportForm } from '@/features/student-management';

export default function ImportStudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">학생 대량 등록</h1>
        <p className="text-gray-600">CSV 파일을 통해 여러 학생을 한 번에 등록합니다.</p>
      </div>
      <BulkImportForm />
    </div>
  );
}
