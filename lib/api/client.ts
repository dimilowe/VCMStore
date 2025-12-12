'use client';

export type APIErrorType = 'AUTH_REQUIRED' | 'UPGRADE_REQUIRED' | 'GENERIC';

export interface APIError {
  type: APIErrorType;
  message: string;
  feature?: string;
  requiredTier?: string;
  status: number;
}

export interface APIResponse<T> {
  ok: true;
  data: T;
}

export interface APIErrorResponse {
  ok: false;
  error: APIError;
}

export type APIResult<T> = APIResponse<T> | APIErrorResponse;

let authRequiredHandler: (() => void) | null = null;
let upgradeRequiredHandler: ((feature: string, requiredTier: string) => void) | null = null;

export function setAuthRequiredHandler(handler: () => void) {
  authRequiredHandler = handler;
}

export function setUpgradeRequiredHandler(handler: (feature: string, requiredTier: string) => void) {
  upgradeRequiredHandler = handler;
}

export async function apiClient<T>(
  url: string,
  options?: RequestInit & { skipErrorHandling?: boolean }
): Promise<APIResult<T>> {
  const { skipErrorHandling, ...fetchOptions } = options || {};

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        return { ok: true, data };
      }
      return { ok: true, data: response as unknown as T };
    }

    const errorData = await response.json().catch(() => ({}));

    if (response.status === 401 && errorData.error === 'AUTH_REQUIRED') {
      if (!skipErrorHandling && authRequiredHandler) {
        authRequiredHandler();
      }
      return {
        ok: false,
        error: {
          type: 'AUTH_REQUIRED',
          message: errorData.message || 'Please log in to continue.',
          status: 401,
        },
      };
    }

    if (response.status === 403 && errorData.error === 'UPGRADE_REQUIRED') {
      const feature = errorData.feature || 'feature';
      const requiredTier = errorData.requiredTier || 'starter';
      
      if (!skipErrorHandling && upgradeRequiredHandler) {
        upgradeRequiredHandler(feature, requiredTier);
      }
      return {
        ok: false,
        error: {
          type: 'UPGRADE_REQUIRED',
          message: errorData.message || 'Upgrade required to access this feature.',
          feature,
          requiredTier,
          status: 403,
        },
      };
    }

    return {
      ok: false,
      error: {
        type: 'GENERIC',
        message: errorData.error || errorData.message || 'Something went wrong',
        status: response.status,
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: {
        type: 'GENERIC',
        message: err instanceof Error ? err.message : 'Network error',
        status: 0,
      },
    };
  }
}

export async function apiPost<T>(url: string, body: unknown, options?: RequestInit): Promise<APIResult<T>> {
  return apiClient<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
}

export async function apiGet<T>(url: string, options?: RequestInit): Promise<APIResult<T>> {
  return apiClient<T>(url, {
    method: 'GET',
    ...options,
  });
}
