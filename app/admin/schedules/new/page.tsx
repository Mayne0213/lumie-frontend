'use client';

import { CreateScheduleForm } from '@/features/schedule-management';

export default function NewSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">스케줄 생성</h1>
        <p className="text-gray-600">새로운 상담 스케줄을 생성합니다.</p>
      </div>
      <CreateScheduleForm />
    </div>
  );
}
