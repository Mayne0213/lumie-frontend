'use client';

import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">회원가입</h2>
      <RegisterForm />
    </div>
  );
}
