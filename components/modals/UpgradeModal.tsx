'use client';

import { useState } from 'react';
import { X, Lock, Sparkles, Zap, Brain, Download, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OFFERS_REGISTRY } from '@/lib/pricing/offersRegistry';
import type { UserTier } from '@/lib/pricing/types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: UserTier;
  requiredFeature?: 'ai' | 'heavyTools' | 'workflows' | 'exports' | 'memory';
  targetTier?: 'starter' | 'basic' | 'pro';
}

const TIER_BENEFITS: Record<'starter' | 'basic' | 'pro', { icon: React.ReactNode; items: string[] }> = {
  starter: {
    icon: <Zap className="w-6 h-6 text-white" />,
    items: [
      'Full-resolution exports (no watermark)',
      'Limited memory for recent work',
      'Single-step heavy tools',
      'Up to 3 workflows per day',
    ],
  },
  basic: {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    items: [
      'Everything in Starter',
      'Full memory for all your work',
      'Multi-step heavy tools',
      'Unlimited workflows',
    ],
  },
  pro: {
    icon: <Brain className="w-6 h-6 text-white" />,
    items: [
      'Everything in Basic',
      'AI-powered tools',
      'Advanced batch processing',
      'Priority support',
    ],
  },
};

const FEATURE_TO_TIER: Record<string, 'starter' | 'basic' | 'pro'> = {
  exports: 'starter',
  heavyTools: 'starter',
  memory: 'starter',
  workflows: 'starter',
  ai: 'pro',
};

const FEATURE_LABELS: Record<string, string> = {
  ai: 'AI Tools',
  heavyTools: 'Heavy Processing Tools',
  workflows: 'Workflow Builder',
  exports: 'Full Resolution Exports',
  memory: 'Memory & History',
};

export default function UpgradeModal({
  isOpen,
  onClose,
  currentTier,
  requiredFeature,
  targetTier,
}: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const recommendedTier = targetTier || (requiredFeature ? FEATURE_TO_TIER[requiredFeature] : 'starter');
  const offer = OFFERS_REGISTRY[recommendedTier];
  const benefits = TIER_BENEFITS[recommendedTier];

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: offer.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGradient = () => {
    switch (recommendedTier) {
      case 'starter':
        return 'from-blue-500 to-cyan-600';
      case 'basic':
        return 'from-purple-500 to-indigo-600';
      case 'pro':
        return 'from-orange-500 to-amber-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient()} flex items-center justify-center`}>
              {benefits.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Upgrade to {offer.label}</h2>
              {requiredFeature && (
                <p className="text-sm text-zinc-500">
                  Unlock {FEATURE_LABELS[requiredFeature]}
                </p>
              )}
            </div>
          </div>

          <p className="text-zinc-600 mb-4">
            {requiredFeature 
              ? `${FEATURE_LABELS[requiredFeature]} requires ${offer.label} or higher.`
              : `Take your creator toolkit to the next level.`
            }
          </p>

          <div className="bg-zinc-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium mb-3">{offer.label} includes:</p>
            <ul className="space-y-3">
              {benefits.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    recommendedTier === 'starter' ? 'text-blue-500' :
                    recommendedTier === 'basic' ? 'text-purple-500' :
                    'text-orange-500'
                  }`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mb-4">
            <span className="text-3xl font-bold">${offer.monthly}</span>
            <span className="text-zinc-500">/month</span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${getGradient()} hover:opacity-90`}
            >
              {isLoading ? 'Processing...' : `Upgrade to ${offer.label}`}
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full"
            >
              Maybe later
            </Button>
          </div>

          {currentTier !== 'free' && (
            <p className="text-xs text-zinc-400 text-center mt-4">
              Your current plan: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
