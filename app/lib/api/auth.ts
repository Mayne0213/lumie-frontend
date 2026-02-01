// Auth API Client
// Backend API: auth-svc

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: 'DEVELOPER' | 'ADMIN' | 'STUDENT';
  tenantSlug: string;
  tenantId: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
  user: UserResponse;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-svc.lumie-dev.svc.cluster.local:8080';

// Default tenant for development
const DEFAULT_TENANT_SLUG = 'demo';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw {
      status: response.status,
      message: error.message || `HTTP ${response.status}`,
      code: error.code,
    } as ApiError;
  }
  return response.json();
}

export async function register(
  request: RegisterRequest,
  tenantSlug: string = DEFAULT_TENANT_SLUG
): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Slug': tenantSlug,
    },
    body: JSON.stringify(request),
  });

  return handleResponse<LoginResponse>(response);
}

export async function login(
  request: LoginRequest,
  tenantSlug: string = DEFAULT_TENANT_SLUG
): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Slug': tenantSlug,
    },
    body: JSON.stringify(request),
  });

  return handleResponse<LoginResponse>(response);
}

export async function refreshToken(
  refreshToken: string,
  tenantSlug: string = DEFAULT_TENANT_SLUG
): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Slug': tenantSlug,
    },
    body: JSON.stringify({ refreshToken }),
  });

  return handleResponse<LoginResponse>(response);
}

export async function logout(
  accessToken: string,
  tenantSlug: string = DEFAULT_TENANT_SLUG
): Promise<void> {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Tenant-Slug': tenantSlug,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Logout failed' }));
    throw {
      status: response.status,
      message: error.message,
    } as ApiError;
  }
}

// Password validation regex (matches backend validation)
// At least: 1 uppercase, 1 lowercase, 1 digit, 1 special character (@$!%*?&)
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: '비밀번호는 최소 8자 이상이어야 합니다.' };
  }
  if (password.length > 128) {
    return { valid: false, message: '비밀번호는 128자를 초과할 수 없습니다.' };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return {
      valid: false,
      message: '비밀번호는 대문자, 소문자, 숫자, 특수문자(@$!%*?&)를 각각 하나 이상 포함해야 합니다.'
    };
  }
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; message?: string } {
  if (!email) {
    return { valid: false, message: '이메일을 입력해주세요.' };
  }
  if (email.length > 255) {
    return { valid: false, message: '이메일은 255자를 초과할 수 없습니다.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: '올바른 이메일 형식이 아닙니다.' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; message?: string } {
  if (!name) {
    return { valid: false, message: '이름을 입력해주세요.' };
  }
  if (name.length < 2) {
    return { valid: false, message: '이름은 최소 2자 이상이어야 합니다.' };
  }
  if (name.length > 100) {
    return { valid: false, message: '이름은 100자를 초과할 수 없습니다.' };
  }
  return { valid: true };
}
