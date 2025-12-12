'use client';

import type { UserTier } from '@/lib/pricing/types';

export type HeavyMode = 'none' | 'single' | 'multi';

export type ToolFeature = 'heavyTool' | 'ai' | null;

export type ToolLockState = {
  locked: boolean;
  feature: ToolFeature;
  requiredTier: UserTier | null;
};

export type ToolAccessMeta = {
  heavyMode?: HeavyMode;
  hasAi?: boolean;
};

export function getToolLockState(
  userTier: UserTier,
  meta: ToolAccessMeta
): ToolLockState {
  const heavyMode: HeavyMode = meta.heavyMode ?? 'none';
  const hasAi = !!meta.hasAi;

  if (hasAi && userTier !== 'pro') {
    return {
      locked: true,
      feature: 'ai',
      requiredTier: 'pro',
    };
  }

  if (heavyMode === 'single') {
    if (userTier === 'free') {
      return {
        locked: true,
        feature: 'heavyTool',
        requiredTier: 'starter',
      };
    }
  }

  if (heavyMode === 'multi') {
    if (userTier === 'free' || userTier === 'starter') {
      return {
        locked: true,
        feature: 'heavyTool',
        requiredTier: 'basic',
      };
    }
  }

  return {
    locked: false,
    feature: null,
    requiredTier: null,
  };
}
