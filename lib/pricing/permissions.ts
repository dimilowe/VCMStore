import { resolveUserTier } from './getUserTier';
import { getEntitlementsForTier } from './cloudEntitlements';

type UserLike = { subscription_tier?: string | null } | null | undefined;

export function canUseAI(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  return getEntitlementsForTier(tier).ai;
}

export function canUseHeavyTools(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  const heavy = getEntitlementsForTier(tier).heavyTools;
  return heavy !== false;
}

export function canUseMultiStepHeavyTools(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  const heavy = getEntitlementsForTier(tier).heavyTools;
  return heavy === 'multi-step' || heavy === 'full';
}

export function getWorkflowLimit(user: UserLike): number | 'unlimited' {
  const tier = resolveUserTier(user);
  return getEntitlementsForTier(tier).workflowLimit;
}

export function canUseWorkflows(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  const w = getEntitlementsForTier(tier).workflows;
  return w !== false;
}

export function canExportFullRes(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  return getEntitlementsForTier(tier).exports === 'fullres';
}

export function shouldWatermarkExports(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  return getEntitlementsForTier(tier).exports === 'watermarked';
}

export function hasAnyMemory(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  const mem = getEntitlementsForTier(tier).memory;
  return mem !== false;
}

export function hasFullMemory(user: UserLike): boolean {
  const tier = resolveUserTier(user);
  return getEntitlementsForTier(tier).memory === 'full';
}

export function getUserTier(user: UserLike) {
  return resolveUserTier(user);
}
