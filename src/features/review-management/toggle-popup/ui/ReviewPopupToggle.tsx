'use client';

import { useReviewPopupSetting, useUpdateReviewPopupSetting } from '@/entities/review';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/Card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MessageSquare } from 'lucide-react';

export function ReviewPopupToggle() {
  const { data: setting, isLoading } = useReviewPopupSetting();
  const { mutate: updateSetting, isPending } = useUpdateReviewPopupSetting();

  const handleToggle = (checked: boolean) => {
    updateSetting({ isReviewPopupOn: checked });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-center items-center h-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          리뷰 팝업 설정
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="review-popup-toggle" className="text-base">
              홈페이지 리뷰 팝업
            </Label>
            <p className="text-sm text-muted-foreground">
              홈페이지에서 리뷰 팝업을 표시합니다.
            </p>
          </div>
          <Switch
            id="review-popup-toggle"
            checked={setting?.isReviewPopupOn ?? false}
            onCheckedChange={handleToggle}
            disabled={isPending}
          />
        </div>
      </CardContent>
    </Card>
  );
}
