import { authClient } from '@/src/shared/api/base';
import { LoginRequest, LoginResponse } from '@/entities/session';

export async function loginApi(
  request: LoginRequest,
  tenantSlug?: string
): Promise<LoginResponse> {
  return authClient.post<LoginResponse>(
    '/api/v1/auth/login',
    request,
    { skipAuth: true },
    tenantSlug
  );
}
