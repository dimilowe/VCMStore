'use client';

import { useState } from 'react';
import { X, Lock, Bell, Search, Shirt, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShoppingCloudUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceToolSlug?: string;
  sourceCTAId?: string;
}

export default function ShoppingCloudUpgradeModal({
  isOpen,
  onClose,
  sourceToolSlug,
  sourceCTAId,
}: ShoppingCloudUpgradeModalProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleJoinWaitlist = async () => {
    setIsJoining(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist/shopping-cloud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceToolSlug,
          sourceCTAId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.requiresAuth) {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          return;
        }
        throw new Error(data.error || 'Failed to join waitlist');
      }

      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'shopping_cloud_waitlist_joined',
            properties: {
              sourceToolSlug,
              sourceCTAId,
            },
          }),
        });
      } catch {}

      setHasJoined(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsJoining(false);
    }
  };

  const handleClose = () => {
    setHasJoined(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full shadow-xl">
        <div className="relative p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>

          {hasJoined ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">You&apos;re on the list!</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We&apos;ll email you when Shopping Cloud Pro is live.
              </p>
              <Button onClick={handleClose} className="w-full">
                Got it
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Unlock Shopping Cloud Pro</h2>
                  <p className="text-sm text-zinc-500">Premium shopping tools</p>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                This feature is part of Shopping Cloud Pro.
              </p>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium mb-3">Shopping Cloud Pro gives you:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <Bell className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Automatic price-drop alerts for saved items</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Search className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Cheaper alternatives and dupes across top retailers</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Shirt className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>A virtual closet and AI outfit ideas using your saved pieces</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 text-center">
                We&apos;re rolling out Shopping Cloud soon. Want early access?
              </p>

              {error && (
                <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleJoinWaitlist}
                  disabled={isJoining}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
                >
                  {isJoining ? 'Joining...' : 'Join Waitlist'}
                </Button>
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
