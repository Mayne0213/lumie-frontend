'use client';

import { useRouter } from 'next/navigation';
import { useAcademies, useDeleteAcademy, AcademyCard } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function AcademyList() {
  const router = useRouter();
  const { data, isLoading, error } = useAcademies();
  const { mutate: deleteAcademy, isPending: isDeleting } = useDeleteAcademy();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      setDeletingId(id);
      deleteAcademy(id, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

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
        <p className="text-red-600">학원 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const academies = data?.content ?? [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          학원 목록 ({data?.totalElements ?? 0}개)
        </h2>
        <Button onClick={() => router.push('/admin/academies/new')}>
          <Plus className="w-4 h-4 mr-2" />
          학원 추가
        </Button>
      </div>

      {academies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">등록된 학원이 없습니다.</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/admin/academies/new')}
          >
            첫 학원 등록하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {academies.map((academy) => (
            <div key={academy.id} className="relative group">
              <AcademyCard
                academy={academy}
                onClick={() => router.push(`/admin/academies/${academy.id}`)}
              />
              <button
                onClick={(e) => handleDelete(academy.id, e)}
                disabled={isDeleting && deletingId === academy.id}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
