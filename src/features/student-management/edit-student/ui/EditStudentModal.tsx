'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useStudent,
  useUpdateStudent,
  useDeleteStudent,
  UpdateStudentInput,
  updateStudentSchema,
} from '@/entities/student';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';

interface EditStudentModalProps {
  studentId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditStudentModal({ studentId, open, onOpenChange }: EditStudentModalProps) {
  const { data: student, isLoading } = useStudent(studentId ?? 0, {
    enabled: !!studentId && open,
  });
  const { mutate: updateStudent, isPending: isUpdating } = useUpdateStudent(studentId ?? 0);
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
        onOpenChange(false);
      },
    });
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteStudent(studentId!, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>학생 정보 수정</DialogTitle>
          <DialogDescription>학생 정보를 수정합니다.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {student?.academyName && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  학원: <span className="font-medium text-foreground">{student.academyName}</span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="연락처를 입력하세요"
                {...register('phone')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentHighschool">학교</Label>
              <Input
                id="studentHighschool"
                placeholder="학교를 입력하세요"
                {...register('studentHighschool')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentBirthYear">출생연도</Label>
              <Input
                id="studentBirthYear"
                type="number"
                placeholder="출생연도를 입력하세요"
                {...register('studentBirthYear', { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentMemo">메모</Label>
              <Textarea
                id="studentMemo"
                placeholder="메모를 입력하세요"
                rows={3}
                {...register('studentMemo')}
              />
            </div>

            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  취소
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? '저장 중...' : '저장'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
