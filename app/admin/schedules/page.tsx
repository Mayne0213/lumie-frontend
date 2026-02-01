'use client';

import { ScheduleList } from '@/features/schedule-management';

export default function AdminSchedulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">스케줄 관리</h1>
        <p className="text-gray-600">상담 스케줄을 생성하고 관리합니다.</p>
      </div>
      <ScheduleList isAdmin />
    </div>
  );
}
