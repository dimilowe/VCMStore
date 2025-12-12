'use client';

import { useUIStore } from '@/lib/state/uiStore';

export class APIError extends Error {
  status: number;
  code?: string;
  payload?: unknown;

  constructor(message: string, status: number, code?: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

export async function apiFetch<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const isJson =
    res.headers.get('Content-Type')?.includes('application/json') ?? false;

  let data: unknown = null;
  if (isJson) {
    try {
      data = await res.json();
    } catch {
      // ignore JSON parse failure
    }
  }

  if (res.ok) {
    return data as T;
  }

  const errorData = data as Record<string, unknown> | null;
  const code = errorData?.error as string | undefined;

  if (res.status === 401 && code === 'AUTH_REQUIRED') {
    if (typeof window !== 'undefined') {
      const { openAuthModal } = useUIStore.getState();
      openAuthModal();
    }

    throw new APIError(
      (errorData?.message as string) || 'Authentication required',
      res.status,
      code,
      data
    );
  }

  if (res.status === 403 && code === 'UPGRADE_REQUIRED') {
    const feature = (errorData?.feature ?? null) as
      | 'export'
      | 'exports'
      | 'heavyTools'
      | 'ai'
      | 'workflows'
      | null;
    const requiredTier = (errorData?.requiredTier ?? null) as
      | 'starter'
      | 'basic'
      | 'pro'
      | null;

    if (typeof window !== 'undefined') {
      const { openUpgradeModal } = useUIStore.getState();
      openUpgradeModal(feature, requiredTier);
    }

    throw new APIError(
      (errorData?.message as string) || 'Upgrade required',
      res.status,
      code,
      data
    );
  }

  throw new APIError(
    (errorData?.message as string) || (errorData?.error as string) || 'Request failed',
    res.status,
    code,
    data
  );
}

export async function apiPost<T = unknown>(
  url: string,
  body: unknown,
  options?: RequestInit
): Promise<T> {
  return apiFetch<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
}

export async function apiGet<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> {
  return apiFetch<T>(url, {
    method: 'GET',
    ...options,
  });
}
