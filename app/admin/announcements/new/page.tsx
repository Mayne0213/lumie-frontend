'use client';

import { CreateAnnouncementForm } from '@/features/announcement-management';

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">공지사항 작성</h1>
        <p className="text-gray-600">새로운 공지사항을 작성합니다.</p>
      </div>
      <CreateAnnouncementForm />
    </div>
  );
}
