import { canUseHeavyTools, canUseMultiStepHeavyTools } from './permissions';
import type { HeavyMode } from '@/engines';

type UserLike = { subscription_tier?: string | null } | null | undefined;

type HeavyToolAccessAllowed = {
  allowed: true;
};

type HeavyToolAccessDenied = {
  allowed: false;
  status: 401 | 403;
  code: 'AUTH_REQUIRED' | 'UPGRADE_REQUIRED';
  message: string;
  feature?: 'heavyTool';
  requiredTier?: 'starter' | 'basic';
};

export type HeavyToolAccessResult = HeavyToolAccessAllowed | HeavyToolAccessDenied;

export function checkHeavyToolAccess(user: UserLike, heavyMode: HeavyMode | undefined): HeavyToolAccessResult {
  const mode = heavyMode ?? 'none';
  
  if (mode === 'none') {
    return { allowed: true };
  }

  if (!user) {
    return {
      allowed: false,
      status: 401,
      code: 'AUTH_REQUIRED',
      message: 'Log in to use this advanced tool.',
    };
  }

  if (mode === 'single') {
    if (!canUseHeavyTools(user)) {
      return {
        allowed: false,
        status: 403,
        code: 'UPGRADE_REQUIRED',
        feature: 'heavyTool',
        requiredTier: 'starter',
        message: 'Upgrade to Starter to use heavy tools.',
      };
    }
  }

  if (mode === 'multi') {
    if (!canUseMultiStepHeavyTools(user)) {
      return {
        allowed: false,
        status: 403,
        code: 'UPGRADE_REQUIRED',
        feature: 'heavyTool',
        requiredTier: 'basic',
        message: 'Upgrade to Basic to use multi-step heavy tools.',
      };
    }
  }

  return { allowed: true };
}

export function heavyToolAccessToResponse(access: HeavyToolAccessDenied): Response {
  const body: Record<string, unknown> = {
    error: access.code,
    message: access.message,
  };
  
  if (access.feature) {
    body.feature = access.feature;
  }
  if (access.requiredTier) {
    body.requiredTier = access.requiredTier;
  }
  
  return new Response(JSON.stringify(body), {
    status: access.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
