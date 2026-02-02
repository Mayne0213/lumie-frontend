'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudents, useDeleteStudent } from '@/entities/student';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Plus, Upload, Search, MoreHorizontal, Trash2, Edit, ArrowUpDown } from 'lucide-react';
import { EditStudentModal } from '../../edit-student/ui/EditStudentModal';

function StudentListSkeleton() {
  return (
    <div className="w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="text-base">
            <TableHead className="w-[18%] text-center">이름</TableHead>
            <TableHead className="w-[18%] text-center">학원</TableHead>
            <TableHead className="w-[18%] text-center">전화번호</TableHead>
            <TableHead className="w-[18%] text-center">학교</TableHead>
            <TableHead className="w-[18%] text-center">생년</TableHead>
            <TableHead className="w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index} className="text-base">
              <TableCell className="text-center"><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-5 w-20 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-5 w-24 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-5 w-20 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-5 w-24 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-5 w-8 mx-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const PAGE_SIZE = 20;

export function StudentList() {
  const router = useRouter();
  const [selectedAcademy, setSelectedAcademy] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'birthYear'>('name');
  const [currentPage, setCurrentPage] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: academiesData } = useAcademies();
  const { data, isLoading, error } = useStudents({
    academyId: selectedAcademy !== 'all' ? Number(selectedAcademy) : undefined,
    search: searchTerm || undefined,
    isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
    page: currentPage,
    size: PAGE_SIZE,
    sort: sortKey === 'name' ? 'name,asc' : 'studentBirthYear,desc',
  });
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setDeletingId(id);
      deleteStudent(id, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  const academies = academiesData?.content ?? [];
  const students = data?.content ?? [];
  const totalStudents = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">학생 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">학생 목록</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            총 {totalStudents}명
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSortKey(sortKey === 'name' ? 'birthYear' : 'name');
              setCurrentPage(0);
            }}
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortKey === 'name' ? '이름순' : '출생연도순'}
          </Button>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedAcademy} onValueChange={(value) => {
            setSelectedAcademy(value);
            setCurrentPage(0);
          }}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="학원 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 학원</SelectItem>
              {academies.map((academy) => (
                <SelectItem key={academy.id} value={String(academy.id)}>
                  {academy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={activeFilter} onValueChange={(value) => {
            setActiveFilter(value);
            setCurrentPage(0);
          }}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="active">활성</SelectItem>
              <SelectItem value="inactive">비활성</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="학생 이름으로 검색..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={() => router.push('/admin/students/import')}>
            <Upload className="w-4 h-4 mr-2" />
            대량 등록
          </Button>
          <Button onClick={() => router.push('/admin/students/new')}>
            <Plus className="w-4 h-4 mr-2" />
            학생 추가
          </Button>
        </div>
      </div>

      {/* 테이블 */}
      {isLoading ? (
        <StudentListSkeleton />
      ) : students.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">검색된 학생이 없습니다.</p>
          <Button className="mt-4" onClick={() => router.push('/admin/students/new')}>
            첫 학생 등록하기
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow className="text-base">
                <TableHead className="w-[18%] text-center">이름</TableHead>
                <TableHead className="w-[18%] text-center">학원</TableHead>
                <TableHead className="w-[18%] text-center">전화번호</TableHead>
                <TableHead className="w-[18%] text-center">학교</TableHead>
                <TableHead className="w-[18%] text-center">생년</TableHead>
                <TableHead className="w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const currentYear = new Date().getFullYear();
                const age = student.studentBirthYear ? currentYear - student.studentBirthYear + 1 : null;
                return (
                  <TableRow
                    key={student.id}
                    className="cursor-pointer hover:bg-muted/50 text-base"
                    onClick={() => setEditingId(student.id)}
                  >
                    <TableCell className="text-center font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">{student.academyName || '-'}</TableCell>
                    <TableCell className="text-center">{student.phone || '-'}</TableCell>
                    <TableCell className="text-center">{student.studentHighschool || '-'}</TableCell>
                    <TableCell className="text-center">
                      {student.studentBirthYear ? `${student.studentBirthYear}년(${age}세)` : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(student.id);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(student.id);
                            }}
                            disabled={isDeleting && deletingId === student.id}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className={currentPage === 0 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {(() => {
              const pages: (number | 'ellipsis')[] = [];
              const showPages = 5;

              if (totalPages <= showPages + 2) {
                // Show all pages if total is small
                for (let i = 0; i < totalPages; i++) pages.push(i);
              } else {
                // Always show first page
                pages.push(0);

                // Calculate range around current page
                let start = Math.max(1, currentPage - 1);
                let end = Math.min(totalPages - 2, currentPage + 1);

                // Adjust if at the beginning
                if (currentPage < 3) {
                  end = Math.min(totalPages - 2, 3);
                }

                // Adjust if at the end
                if (currentPage > totalPages - 4) {
                  start = Math.max(1, totalPages - 4);
                }

                // Add ellipsis before middle section
                if (start > 1) pages.push('ellipsis');

                // Add middle pages
                for (let i = start; i <= end; i++) pages.push(i);

                // Add ellipsis after middle section
                if (end < totalPages - 2) pages.push('ellipsis');

                // Always show last page
                pages.push(totalPages - 1);
              }

              return pages.map((page, index) =>
                page === 'ellipsis' ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              );
            })()}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                className={currentPage === totalPages - 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Edit Modal */}
      <EditStudentModal
        studentId={editingId}
        open={!!editingId}
        onOpenChange={(open) => !open && setEditingId(null)}
      />
    </div>
  );
}
