'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerOwnerApi } from '../api/registerOwnerApi';
import { useSessionStore, OwnerRegisterRequest } from '@/entities/session';

export function useRegisterOwner() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);

  return useMutation({
    mutationFn: (request: OwnerRegisterRequest) => registerOwnerApi(request),
    onSuccess: (data) => {
      login(data.user, data.accessToken, data.refreshToken);
      router.push('/admin');
    },
  });
}
