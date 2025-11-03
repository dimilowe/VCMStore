'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SessionManager({ sessionId }: { sessionId?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            router.refresh();
          }
        })
        .catch((error) => {
          console.error('Session creation failed:', error);
        });
    }
  }, [sessionId, router]);

  return null;
}
