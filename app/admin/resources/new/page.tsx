'use client';

import { CreateResourceForm } from '@/features/resource-management';

export default function NewResourcePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">자료 등록</h1>
        <p className="text-gray-600">새로운 자료를 등록합니다.</p>
      </div>
      <CreateResourceForm />
    </div>
  );
}
