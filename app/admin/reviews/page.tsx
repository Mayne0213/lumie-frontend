'use client';

import { ReviewList, ReviewPopupToggle } from '@/features/review-management';

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">리뷰 관리</h1>
      <ReviewPopupToggle />
      <ReviewList />
    </div>
  );
}
