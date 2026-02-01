'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExams, useDeleteExam, ExamCard } from '@/entities/exam';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

export function ExamList() {
  const router = useRouter();
  const [selectedAcademy, setSelectedAcademy] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const { data: academiesData } = useAcademies();
  const { data, isLoading, error } = useExams({
    academyId: selectedAcademy,
    status: selectedStatus,
  });
  const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      setDeletingId(id);
      deleteExam(id, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  const academies = academiesData?.content ?? [];
  const exams = data?.content ?? [];

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
        <p className="text-red-600">시험 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            시험 목록 ({data?.totalElements ?? 0}개)
          </h2>
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
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus ?? ''}
            onChange={(e) => setSelectedStatus(e.target.value || undefined)}
          >
            <option value="">전체 상태</option>
            <option value="DRAFT">작성 중</option>
            <option value="PUBLISHED">진행 중</option>
            <option value="CLOSED">종료</option>
          </select>
        </div>
        <Button onClick={() => router.push('/admin/exams/new')}>
          <Plus className="w-4 h-4 mr-2" />
          시험 추가
        </Button>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">등록된 시험이 없습니다.</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/admin/exams/new')}
          >
            첫 시험 등록하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <div key={exam.id} className="relative group">
              <ExamCard
                exam={exam}
                onClick={() => router.push(`/admin/exams/${exam.id}`)}
              />
              <button
                onClick={(e) => handleDelete(exam.id, e)}
                disabled={isDeleting && deletingId === exam.id}
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
