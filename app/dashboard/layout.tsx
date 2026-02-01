'use client';

import { ReactNode } from 'react';
import { Header } from '@/widgets/header';
import { StudentSidebar } from '@/widgets/student-sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <StudentSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
