'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerApi } from '../api/registerApi';
import { useSessionStore, RegisterRequest } from '@/entities/session';

export function useRegister() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);

  return useMutation({
    // Use tenantSlug from the request body
    mutationFn: (request: RegisterRequest) => registerApi(request, request.tenantSlug),
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
