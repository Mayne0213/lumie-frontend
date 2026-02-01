'use client';

import { ScheduleList } from '@/features/schedule-management';

export default function StudentSchedulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">상담 예약</h1>
        <p className="text-gray-600">상담을 예약하고 내 예약을 확인합니다.</p>
      </div>
      <ScheduleList />
    </div>
  );
}
