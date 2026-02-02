import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Page Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center px-8">
          <span className="text-2xl font-bold text-gray-900">Lumie</span>
          <nav className="ml-12 flex gap-8">
            <span className="text-gray-600">대시보드</span>
            <span className="text-gray-600">학생 관리</span>
            <span className="text-gray-600">수업 관리</span>
            <span className="text-gray-600">설정</span>
          </nav>
        </header>

        {/* Main Content Area */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Stat Cards */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-300 rounded" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-300 rounded" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Table Placeholder */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
            <div className="space-y-4">
              <div className="h-12 bg-gray-100 rounded" />
              <div className="h-12 bg-gray-50 rounded" />
              <div className="h-12 bg-gray-100 rounded" />
              <div className="h-12 bg-gray-50 rounded" />
              <div className="h-12 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Blur Overlay + Modal */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 animate-in fade-in zoom-in-95 duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
