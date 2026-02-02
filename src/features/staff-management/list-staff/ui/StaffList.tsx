'use client';

import { useState } from 'react';
import { useStaffList, useDeleteStaff, StaffCard } from '@/entities/staff';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { CreateStaffForm } from '../../create-staff/ui/CreateStaffForm';

function StaffCardSkeleton() {
  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-3">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

export function StaffList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data, isLoading, error } = useStaffList();
  const { mutate: deleteStaff, isPending: isDeleting } = useDeleteStaff();

  const handleDelete = (id: number) => {
    setDeletingId(id);
    deleteStaff(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  const staffList = data?.content ?? [];
  const totalStaff = data?.totalElements ?? 0;

  // 클라이언트 사이드 검색 필터링
  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.adminPosition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">직원 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">직원 관리</h1>
          <Badge variant="secondary" className="text-base px-3 py-1">
            총 {totalStaff}명
          </Badge>
        </div>

        <div className="flex gap-2">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="이름 또는 직책으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                직원 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>직원 계정 생성</DialogTitle>
              </DialogHeader>
              <CreateStaffForm onSuccess={() => setIsCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 카드 그리드 */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <StaffCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground mb-2">
            {searchTerm ? '검색된 직원이 없습니다.' : '등록된 직원이 없습니다.'}
          </p>
          {!searchTerm && (
            <p className="text-sm text-muted-foreground">새 직원을 추가해보세요.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredStaff.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onDelete={handleDelete}
              isDeleting={isDeleting && deletingId === staff.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
