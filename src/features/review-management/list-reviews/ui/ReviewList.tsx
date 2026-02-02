'use client';

import { useState } from 'react';
import { useReviews, useDeleteReview } from '@/entities/review';
import { Card, CardContent } from '@/src/shared/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Star, MessageSquareText } from 'lucide-react';

export function ReviewList() {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data, isLoading, error } = useReviews();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      setDeletingId(id);
      deleteReview(id, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  const reviews = data?.content ?? [];

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
        <p className="text-red-600">리뷰를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">학생 리뷰</h2>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            총 {data?.totalElements ?? 0}개
          </Badge>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MessageSquareText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">등록된 리뷰가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-gray-700">{review.reviewerName}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{review.reviewTitle}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {review.reviewContent}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(review.id, e)}
                    disabled={isDeleting && deletingId === review.id}
                    className="p-2 hover:bg-red-50 rounded ml-4"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
