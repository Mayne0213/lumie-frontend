'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authClient } from '@/src/shared/api/base';
import { useSessionStore } from '@/entities/session';
import { storage } from '@/src/shared/lib/storage';
import { ENV } from '@/src/shared/config/env';

async function logoutApi(tenantSlug?: string): Promise<void> {
  return authClient.post<void>('/api/v1/auth/logout', undefined, undefined, tenantSlug);
}

export function useLogout() {
  const router = useRouter();
  const logout = useSessionStore((state) => state.logout);

  return useMutation({
    mutationFn: () => logoutApi(ENV.DEFAULT_TENANT_SLUG),
    onSettled: () => {
      // Always clear local state even if API call fails
      logout();
      router.push('/login');
    },
  });
}
