'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStudent, useUpdateStudent, useDeleteStudent, UpdateStudentInput, updateStudentSchema } from '@/entities/student';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/shared/ui/Button';
import { Input } from '@/src/shared/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StudentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const studentId = parseInt(id, 10);
  const router = useRouter();

  const { data: student, isLoading, error } = useStudent(studentId);
  const { mutate: updateStudent, isPending: isUpdating } = useUpdateStudent(studentId);
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateStudentInput>({
    resolver: zodResolver(updateStudentSchema),
  });

  useEffect(() => {
    if (student) {
      reset({
        name: student.name,
        phone: student.phone ?? '',
        studentHighschool: student.studentHighschool ?? '',
        studentBirthYear: student.studentBirthYear ?? undefined,
        studentMemo: student.studentMemo ?? '',
      });
    }
  }, [student, reset]);

  const onSubmit = (data: UpdateStudentInput) => {
    updateStudent(data, {
      onSuccess: () => {
        alert('학생 정보가 수정되었습니다.');
      },
    });
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteStudent(studentId, {
        onSuccess: () => {
          router.push('/admin/students');
        },
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

  if (error || !student) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">학생 정보를 불러오는 중 오류가 발생했습니다.</p>
        <Button className="mt-4" onClick={() => router.push('/admin/students')}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">학생 상세</h1>
          <p className="text-gray-600">학생 정보를 확인하고 수정합니다.</p>
        </div>
        <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
          학생 삭제
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>학생 정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">학원: <span className="font-medium">{student.academyName}</span></p>
            </div>

            <Input
              label="이름 *"
              type="text"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="연락처"
              type="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="학교"
              type="text"
              error={errors.studentHighschool?.message}
              {...register('studentHighschool')}
            />

            <Input
              label="출생연도"
              type="number"
              error={errors.studentBirthYear?.message}
              {...register('studentBirthYear', { valueAsNumber: true })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                {...register('studentMemo')}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" loading={isUpdating}>
                저장
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/students')}
              >
                목록으로
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
