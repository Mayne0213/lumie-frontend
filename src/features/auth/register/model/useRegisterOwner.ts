'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerOwnerApi } from '../api/registerOwnerApi';
import { useSessionStore, OwnerRegisterRequest } from '@/entities/session';
import { useAuthModal } from '@/src/shared/providers/AuthModalProvider';

export function useRegisterOwner() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const { closeModal } = useAuthModal();

  return useMutation({
    mutationFn: (request: OwnerRegisterRequest) => registerOwnerApi(request),
    onSuccess: (data) => {
      login(data.user, data.accessToken, data.refreshToken);
      closeModal();
      router.push('/admin');
    },
  });
}
