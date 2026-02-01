'use client';

import { CreateAcademyForm } from '@/features/academy-management';

export default function NewAcademyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">학원 등록</h1>
        <p className="text-gray-600">새로운 학원을 등록합니다.</p>
      </div>
      <CreateAcademyForm />
    </div>
  );
}
