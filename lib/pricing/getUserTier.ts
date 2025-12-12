import type { UserTier } from './types';

type AnyUser = { subscription_tier?: string | null } | null | undefined;

export function resolveUserTier(user: AnyUser): UserTier {
  if (!user) return 'free';

  const rawTier = user.subscription_tier;

  switch (rawTier) {
    case 'starter':
    case 'basic':
    case 'pro':
      return rawTier;
    default:
      return 'free';
  }
}
