'use client';

import { useUser } from '@/entities/session';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600">안녕하세요, {user?.name}님!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>다가오는 시험</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">예정된 시험 없음</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 공지사항</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">새로운 공지 없음</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>답변 대기 Q&A</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">0</p>
            <p className="text-sm text-gray-500">대기 중인 질문 없음</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>예약된 상담</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500">예정된 상담 없음</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
