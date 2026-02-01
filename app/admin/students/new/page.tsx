'use client';

import { RegisterStudentForm } from '@/features/student-management';

export default function NewStudentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">학생 등록</h1>
        <p className="text-gray-600">새로운 학생을 등록합니다.</p>
      </div>
      <RegisterStudentForm />
    </div>
  );
}
