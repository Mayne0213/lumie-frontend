'use client';

import { Exam } from '../model/schema';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';
import { FileText, Calendar, Clock, Award } from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  onClick?: () => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  DRAFT: { label: '작성 중', color: 'bg-gray-100 text-gray-700' },
  PUBLISHED: { label: '진행 중', color: 'bg-green-100 text-green-700' },
  CLOSED: { label: '종료', color: 'bg-red-100 text-red-700' },
};

export function ExamCard({ exam, onClick }: ExamCardProps) {
  const status = statusLabels[exam.status] ?? statusLabels.DRAFT;

  return (
    <Card
      className={onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            {exam.title}
          </CardTitle>
          <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {exam.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{exam.description}</p>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {exam.startDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(exam.startDate).toLocaleDateString('ko-KR')}</span>
            </div>
          )}
          {exam.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{exam.duration}분</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>총점: {exam.totalScore}점</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
