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
        email: student.email,
        phone: student.phone ?? '',
        grade: student.grade ?? '',
        parentPhone: student.parentPhone ?? '',
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
            <Input
              label="이름 *"
              type="text"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="이메일 *"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="연락처"
              type="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="학년"
              type="text"
              error={errors.grade?.message}
              {...register('grade')}
            />

            <Input
              label="학부모 연락처"
              type="tel"
              error={errors.parentPhone?.message}
              {...register('parentPhone')}
            />

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
