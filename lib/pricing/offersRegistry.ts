import type { CloudBundleType } from './types';

export const OFFERS_REGISTRY = {
  starter: {
    id: 'price_vcm_starter_monthly',
    label: 'Starter',
    monthly: 9.99,
  },
  basic: {
    id: 'price_vcm_basic_monthly',
    label: 'Basic',
    monthly: 29,
  },
  pro: {
    id: 'price_vcm_pro_monthly',
    label: 'Pro',
    monthly: 59,
  },
  bundles: {
    twoClouds: {
      id: 'price_vcm_pro_two_clouds',
      label: 'Pro – 2 Clouds',
      monthly: 99,
    },
    threeClouds: {
      id: 'price_vcm_pro_three_clouds',
      label: 'Pro – 3 Clouds',
      monthly: 120,
    },
    allClouds: {
      id: 'price_vcm_pro_all_clouds',
      label: 'Pro – All Clouds',
      monthly: 199,
    },
  },
} as const;

export type OfferKey = keyof typeof OFFERS_REGISTRY;

export function getOfferByTier(tier: 'starter' | 'basic' | 'pro') {
  return OFFERS_REGISTRY[tier];
}

export function getBundleOffer(bundle: Exclude<CloudBundleType, 'none'>) {
  return OFFERS_REGISTRY.bundles[bundle];
}
