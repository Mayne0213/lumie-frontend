'use client';

import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">로그인</h2>
      <LoginForm />
    </div>
  );
}
