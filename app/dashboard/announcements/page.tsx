'use client';

import { AnnouncementList } from '@/features/announcement-management';

export default function StudentAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
        <p className="text-gray-600">학원 공지사항을 확인합니다.</p>
      </div>
      <AnnouncementList />
    </div>
  );
}
