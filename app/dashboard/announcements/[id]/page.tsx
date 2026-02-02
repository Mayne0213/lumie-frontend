'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAnnouncement } from '@/entities/announcement';
import { Button } from '@/src/shared/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';
import { ArrowLeft, Pin } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StudentAnnouncementDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const announcementId = parseInt(id, 10);
  const router = useRouter();

  const { data: announcement, isLoading, error } = useAnnouncement(announcementId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">공지사항을 불러오는 중 오류가 발생했습니다.</p>
        <Button className="mt-4" onClick={() => router.push('/dashboard/announcements')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push('/dashboard/announcements')}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        목록으로
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {announcement.isItImportantAnnouncement && <Pin className="w-5 h-5 text-blue-600" />}
            <CardTitle>{announcement.announcementTitle}</CardTitle>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
          </p>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{announcement.announcementContent}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
