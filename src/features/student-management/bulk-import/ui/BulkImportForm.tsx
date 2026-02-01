'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBulkImportStudents } from '@/entities/student';
import { useAcademies } from '@/entities/academy';
import { Button } from '@/src/shared/ui/Button';
import { ApiError } from '@/src/shared/types/api';
import { Upload, FileText, X } from 'lucide-react';

interface ParsedStudent {
  name: string;
  email: string;
  phone?: string;
  grade?: string;
  parentPhone?: string;
}

export function BulkImportForm() {
  const router = useRouter();
  const { data: academiesData } = useAcademies();
  const { mutate: bulkImport, isPending, error } = useBulkImportStudents();

  const [selectedAcademy, setSelectedAcademy] = useState<number | null>(null);
  const [parsedStudents, setParsedStudents] = useState<ParsedStudent[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter((line) => line.trim());
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

        const nameIdx = headers.findIndex((h) => h.includes('이름') || h.includes('name'));
        const emailIdx = headers.findIndex((h) => h.includes('이메일') || h.includes('email'));
        const phoneIdx = headers.findIndex((h) => h.includes('연락처') || h.includes('phone'));
        const gradeIdx = headers.findIndex((h) => h.includes('학년') || h.includes('grade'));
        const parentPhoneIdx = headers.findIndex((h) => h.includes('학부모') || h.includes('parent'));

        if (nameIdx === -1 || emailIdx === -1) {
          setParseError('CSV 파일에 이름과 이메일 열이 필요합니다.');
          return;
        }

        const students: ParsedStudent[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map((v) => v.trim());
          if (values[nameIdx] && values[emailIdx]) {
            students.push({
              name: values[nameIdx],
              email: values[emailIdx],
              phone: phoneIdx >= 0 ? values[phoneIdx] : undefined,
              grade: gradeIdx >= 0 ? values[gradeIdx] : undefined,
              parentPhone: parentPhoneIdx >= 0 ? values[parentPhoneIdx] : undefined,
            });
          }
        }

        setParsedStudents(students);
        setParseError(null);
      } catch {
        setParseError('파일을 파싱하는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleRemoveStudent = (index: number) => {
    setParsedStudents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedAcademy || parsedStudents.length === 0) return;

    bulkImport(
      { academyId: selectedAcademy, students: parsedStudents },
      {
        onSuccess: (result) => {
          alert(`${result.imported}명 등록 완료, ${result.failed}명 실패`);
          router.push('/admin/students');
        },
      }
    );
  };

  const apiError = error as ApiError | null;
  const academies = academiesData?.content ?? [];

  return (
    <div className="space-y-6 max-w-4xl">
      {(apiError || parseError) && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{apiError?.message || parseError}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          학원 선택 *
        </label>
        <select
          className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedAcademy ?? ''}
          onChange={(e) => setSelectedAcademy(Number(e.target.value))}
        >
          <option value="">학원을 선택하세요</option>
          {academies.map((academy) => (
            <option key={academy.id} value={academy.id}>
              {academy.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CSV 파일 업로드
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            CSV 파일을 업로드하세요 (이름, 이메일 필수)
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="inline-flex items-center justify-center font-medium rounded-lg transition-colors px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2" />
            파일 선택
          </label>
        </div>
      </div>

      {parsedStudents.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            파싱된 학생 목록 ({parsedStudents.length}명)
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">이름</th>
                  <th className="px-4 py-2 text-left">이메일</th>
                  <th className="px-4 py-2 text-left">연락처</th>
                  <th className="px-4 py-2 text-left">학년</th>
                  <th className="px-4 py-2 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {parsedStudents.map((student, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.phone || '-'}</td>
                    <td className="px-4 py-2">{student.grade || '-'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveStudent(index)}
                        className="p-1 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!selectedAcademy || parsedStudents.length === 0}
          loading={isPending}
        >
          {parsedStudents.length}명 등록하기
        </Button>
        <Button variant="outline" onClick={() => router.push('/admin/students')}>
          취소
        </Button>
      </div>
    </div>
  );
}
