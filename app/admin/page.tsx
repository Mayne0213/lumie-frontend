'use client';

import { useUser } from '@/entities/session';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';

export default function AdminDashboardPage() {
  const user = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-600">안녕하세요, {user?.name}님!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>총 학원</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">등록된 학원</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>총 학생</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">등록된 학생</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>진행 중인 시험</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">0</p>
            <p className="text-sm text-gray-500">활성 시험</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>미답변 Q&A</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">0</p>
            <p className="text-sm text-gray-500">답변 필요</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
