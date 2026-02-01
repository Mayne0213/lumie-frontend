'use client';

import { Student } from '../model/schema';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/Card';
import { User, Mail, Phone, GraduationCap } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onClick?: () => void;
}

export function StudentCard({ student, onClick }: StudentCardProps) {
  return (
    <Card
      className={onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          {student.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{student.email}</span>
        </div>
        {student.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{student.phone}</span>
          </div>
        )}
        {student.grade && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GraduationCap className="w-4 h-4" />
            <span>{student.grade}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
