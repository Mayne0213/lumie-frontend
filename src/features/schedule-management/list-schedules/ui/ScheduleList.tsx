'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSchedules, useDeleteSchedule, useBookSchedule, useMyReservations, useCancelReservation } from '@/entities/schedule';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { Card, CardContent } from '@/src/shared/ui/Card';
import { Plus, Trash2, Calendar, Clock, User, Check, X } from 'lucide-react';

interface ScheduleListProps {
  isAdmin?: boolean;
}

const statusConfig = {
  AVAILABLE: { label: '예약 가능', color: 'bg-green-100 text-green-700' },
  BOOKED: { label: '예약됨', color: 'bg-blue-100 text-blue-700' },
  CANCELLED: { label: '취소됨', color: 'bg-gray-100 text-gray-700' },
  COMPLETED: { label: '완료', color: 'bg-gray-100 text-gray-700' },
};

export function ScheduleList({ isAdmin = false }: ScheduleListProps) {
  const router = useRouter();
  const [selectedAcademy, setSelectedAcademy] = useState<number | undefined>();
  const { data: academiesData } = useAcademies();
  const { data: schedulesData, isLoading: schedulesLoading } = useSchedules({
    academyId: selectedAcademy,
    status: isAdmin ? undefined : 'AVAILABLE',
  });
  const { data: reservationsData, isLoading: reservationsLoading } = useMyReservations();
  const { mutate: deleteSchedule, isPending: isDeleting } = useDeleteSchedule();
  const { mutate: bookSchedule, isPending: isBooking } = useBookSchedule();
  const { mutate: cancelReservation, isPending: isCancelling } = useCancelReservation();

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      setDeletingId(id);
      deleteSchedule(id, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  const handleBook = (scheduleId: number) => {
    setBookingId(scheduleId);
    bookSchedule(scheduleId, {
      onSettled: () => setBookingId(null),
    });
  };

  const handleCancel = (reservationId: number) => {
    if (confirm('예약을 취소하시겠습니까?')) {
      cancelReservation(reservationId);
    }
  };

  const basePath = isAdmin ? '/admin/schedules' : '/dashboard/schedules';
  const academies = academiesData?.content ?? [];
  const schedules = schedulesData?.content ?? [];
  const reservations = reservationsData?.content ?? [];

  const isLoading = schedulesLoading || (!isAdmin && reservationsLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Available Schedules */}
      <section>
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {isAdmin ? '스케줄 목록' : '예약 가능한 상담'} ({schedulesData?.totalElements ?? 0}개)
            </h2>
            {isAdmin && (
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedAcademy ?? ''}
                onChange={(e) => setSelectedAcademy(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">전체 학원</option>
                {academies.map((academy) => (
                  <option key={academy.id} value={academy.id}>
                    {academy.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {isAdmin && (
            <Button onClick={() => router.push(`${basePath}/new`)}>
              <Plus className="w-4 h-4 mr-2" />
              스케줄 추가
            </Button>
          )}
        </div>

        {schedules.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              {isAdmin ? '등록된 스케줄이 없습니다.' : '예약 가능한 상담이 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedules.map((schedule) => {
              const status = statusConfig[schedule.status];
              const startTime = new Date(schedule.startTime);
              const endTime = new Date(schedule.endTime);

              return (
                <Card key={schedule.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{schedule.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{startTime.toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                          {' - '}
                          {endTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{schedule.teacherName}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {!isAdmin && schedule.status === 'AVAILABLE' && (
                        <Button
                          size="sm"
                          onClick={() => handleBook(schedule.id)}
                          loading={isBooking && bookingId === schedule.id}
                        >
                          예약하기
                        </Button>
                      )}
                      {isAdmin && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={(e) => handleDelete(schedule.id, e)}
                          loading={isDeleting && deletingId === schedule.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* My Reservations (Student only) */}
      {!isAdmin && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            내 예약 ({reservations.length}개)
          </h2>

          {reservations.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">예약된 상담이 없습니다.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">상담</th>
                    <th className="px-4 py-3 text-left">상태</th>
                    <th className="px-4 py-3 text-left">예약일</th>
                    <th className="px-4 py-3 w-24"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td className="px-4 py-3">상담 #{reservation.scheduleId}</td>
                      <td className="px-4 py-3">
                        {reservation.status === 'CONFIRMED' ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <Check className="w-4 h-4" />
                            확정
                          </span>
                        ) : reservation.status === 'CANCELLED' ? (
                          <span className="flex items-center gap-1 text-red-600">
                            <X className="w-4 h-4" />
                            취소됨
                          </span>
                        ) : (
                          <span className="text-yellow-600">대기 중</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(reservation.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-4 py-3">
                        {reservation.status !== 'CANCELLED' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCancel(reservation.id)}
                            loading={isCancelling}
                          >
                            취소
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
