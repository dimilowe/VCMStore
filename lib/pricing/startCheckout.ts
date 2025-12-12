import { getOfferByTier, getBundleOffer } from './offersRegistry';
import type { CloudBundleType } from './types';

export async function startTierCheckout(tier: 'starter' | 'basic' | 'pro'): Promise<string> {
  const offer = getOfferByTier(tier);
  
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId: offer.id }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }
  
  const { url } = await response.json();
  return url;
}

export async function startBundleCheckout(bundle: Exclude<CloudBundleType, 'none'>): Promise<string> {
  const offer = getBundleOffer(bundle);
  
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId: offer.id }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }
  
  const { url } = await response.json();
  return url;
}
