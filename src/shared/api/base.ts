// Base API client with error handling and authentication

import { ApiError } from '@/src/shared/types/api';
import { storage } from '@/src/shared/lib/storage';
import { ENV } from '@/src/shared/config/env';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw {
      status: response.status,
      message: error.message || `HTTP ${response.status}`,
      code: error.code,
    } as ApiError;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

function getHeaders(
  options: RequestOptions,
  tenantSlug: string = ENV.DEFAULT_TENANT_SLUG
): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Tenant-Slug': tenantSlug,
    ...options.headers,
  };

  if (!options.skipAuth) {
    const token = storage.getAccessToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function apiRequest<T>(
  url: string,
  options: RequestOptions = {},
  tenantSlug?: string
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: getHeaders(options, tenantSlug),
  });

  return handleResponse<T>(response);
}

export function createServiceClient(baseUrl: string) {
  return {
    get<T>(path: string, options?: RequestOptions, tenantSlug?: string): Promise<T> {
      return apiRequest<T>(`${baseUrl}${path}`, { ...options, method: 'GET' }, tenantSlug);
    },

    post<T>(
      path: string,
      body?: unknown,
      options?: RequestOptions,
      tenantSlug?: string
    ): Promise<T> {
      return apiRequest<T>(
        `${baseUrl}${path}`,
        { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined },
        tenantSlug
      );
    },

    put<T>(
      path: string,
      body?: unknown,
      options?: RequestOptions,
      tenantSlug?: string
    ): Promise<T> {
      return apiRequest<T>(
        `${baseUrl}${path}`,
        { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined },
        tenantSlug
      );
    },

    patch<T>(
      path: string,
      body?: unknown,
      options?: RequestOptions,
      tenantSlug?: string
    ): Promise<T> {
      return apiRequest<T>(
        `${baseUrl}${path}`,
        { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined },
        tenantSlug
      );
    },

    delete<T>(path: string, options?: RequestOptions, tenantSlug?: string): Promise<T> {
      return apiRequest<T>(`${baseUrl}${path}`, { ...options, method: 'DELETE' }, tenantSlug);
    },
  };
}

// Pre-configured service clients
export const authClient = createServiceClient(ENV.AUTH_SERVICE_URL);
export const academyClient = createServiceClient(ENV.ACADEMY_SERVICE_URL);
export const examClient = createServiceClient(ENV.EXAM_SERVICE_URL);
export const contentClient = createServiceClient(ENV.CONTENT_SERVICE_URL);
