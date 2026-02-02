'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
  UpdateAnnouncementInput,
  updateAnnouncementSchema,
} from '@/entities/announcement';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';

interface EditAnnouncementModalProps {
  announcementId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAnnouncementModal({ announcementId, open, onOpenChange }: EditAnnouncementModalProps) {
  const { data: announcement, isLoading } = useAnnouncement(announcementId ?? 0, {
    enabled: !!announcementId && open,
  });
  const { mutate: updateAnnouncement, isPending: isUpdating } = useUpdateAnnouncement(announcementId ?? 0);
  const { mutate: deleteAnnouncement, isPending: isDeleting } = useDeleteAnnouncement();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UpdateAnnouncementInput>({
    resolver: zodResolver(updateAnnouncementSchema),
  });

  const isImportant = watch('isItImportantAnnouncement');

  useEffect(() => {
    if (announcement) {
      reset({
        announcementTitle: announcement.announcementTitle,
        announcementContent: announcement.announcementContent,
        isItImportantAnnouncement: announcement.isItImportantAnnouncement ?? false,
      });
    }
  }, [announcement, reset]);

  const onSubmit = (data: UpdateAnnouncementInput) => {
    updateAnnouncement(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteAnnouncement(announcementId!, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>공지사항 수정</DialogTitle>
          <DialogDescription>공지사항을 수정합니다.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="announcementTitle">제목 *</Label>
              <Input
                id="announcementTitle"
                placeholder="제목을 입력하세요"
                {...register('announcementTitle')}
              />
              {errors.announcementTitle && (
                <p className="text-sm text-red-600">{errors.announcementTitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcementContent">내용 *</Label>
              <Textarea
                id="announcementContent"
                placeholder="내용을 입력하세요"
                rows={8}
                {...register('announcementContent')}
              />
              {errors.announcementContent && (
                <p className="text-sm text-red-600">{errors.announcementContent.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="isItImportantAnnouncement"
                checked={isImportant}
                onCheckedChange={(checked) => setValue('isItImportantAnnouncement', !!checked)}
              />
              <Label htmlFor="isItImportantAnnouncement" className="cursor-pointer">
                중요 공지 (상단 고정)
              </Label>
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
