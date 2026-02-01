'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnnouncements, useDeleteAnnouncement } from '@/entities/announcement';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Card, CardContent } from '@/src/shared/ui/Card';
import { Plus, Trash2, Pin, Bell } from 'lucide-react';

interface AnnouncementListProps {
  isAdmin?: boolean;
}

export function AnnouncementList({ isAdmin = false }: AnnouncementListProps) {
  const router = useRouter();
  const [selectedAcademy, setSelectedAcademy] = useState<number | undefined>();
  const { data: academiesData } = useAcademies();
  const { data, isLoading, error } = useAnnouncements({ academyId: selectedAcademy });
  const { mutate: deleteAnnouncement, isPending: isDeleting } = useDeleteAnnouncement();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      setDeletingId(id);
      deleteAnnouncement(id, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  const basePath = isAdmin ? '/admin/announcements' : '/dashboard/announcements';
  const academies = academiesData?.content ?? [];
  const announcements = data?.content ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">공지사항을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            공지사항 ({data?.totalElements ?? 0}개)
          </h2>
          {isAdmin && (
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedAcademy ?? ''}
              onChange={(e) => setSelectedAcademy(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">전체 학원</option>
              {academies.map((academy) => (
                <option key={academy.id} value={academy.id}>
                  {academy.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {isAdmin && (
          <Button onClick={() => router.push(`${basePath}/new`)}>
            <Plus className="w-4 h-4 mr-2" />
            공지 작성
          </Button>
        )}
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Bell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`${basePath}/${announcement.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-blue-600" />
                      )}
                      <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {announcement.authorName} · {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={(e) => handleDelete(announcement.id, e)}
                      disabled={isDeleting && deletingId === announcement.id}
                      className="p-2 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
