'use client';

import { AnnouncementList } from '@/features/announcement-management';

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
        <p className="text-gray-600">공지사항을 작성하고 관리합니다.</p>
      </div>
      <AnnouncementList isAdmin />
    </div>
  );
}
