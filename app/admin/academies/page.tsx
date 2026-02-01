'use client';

import { AcademyList } from '@/features/academy-management';

export default function AcademiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">학원 관리</h1>
        <p className="text-gray-600">등록된 학원을 관리합니다.</p>
      </div>
      <AcademyList />
    </div>
  );
}
