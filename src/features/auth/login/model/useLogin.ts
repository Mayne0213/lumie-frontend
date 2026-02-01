'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginApi } from '../api/loginApi';
import { useSessionStore, LoginRequest } from '@/entities/session';
import { ENV } from '@/src/shared/config/env';

export function useLogin() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);

  return useMutation({
    mutationFn: (request: LoginRequest) => loginApi(request, ENV.DEFAULT_TENANT_SLUG),
    onSuccess: (data) => {
      login(data.user, data.accessToken, data.refreshToken);

      // Redirect based on role
      if (data.user.role === 'STUDENT') {
        router.push('/dashboard');
      } else {
        router.push('/admin');
      }
    },
  });
}
