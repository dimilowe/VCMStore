'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserTier } from '@/lib/pricing/types';
import { setAuthRequiredHandler, setUpgradeRequiredHandler } from '@/lib/api/client';

interface UpgradeContextValue {
  showAuthModal: boolean;
  showUpgradeModal: boolean;
  upgradeFeature: 'ai' | 'heavyTools' | 'workflows' | 'exports' | 'memory' | undefined;
  upgradeTier: 'starter' | 'basic' | 'pro';
  currentTier: UserTier;
  triggerAuthModal: () => void;
  triggerUpgradeModal: (feature: string, requiredTier: string) => void;
  closeAuthModal: () => void;
  closeUpgradeModal: () => void;
  setCurrentTier: (tier: UserTier) => void;
  onAuthSuccess: (userId: string) => void;
}

const UpgradeContext = createContext<UpgradeContextValue | null>(null);

export function useUpgradeContext() {
  const context = useContext(UpgradeContext);
  if (!context) {
    throw new Error('useUpgradeContext must be used within UpgradeProvider');
  }
  return context;
}

interface UpgradeProviderProps {
  children: React.ReactNode;
  initialTier?: UserTier;
}

export function UpgradeProvider({ children, initialTier = 'free' }: UpgradeProviderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<'ai' | 'heavyTools' | 'workflows' | 'exports' | 'memory' | undefined>(undefined);
  const [upgradeTier, setUpgradeTier] = useState<'starter' | 'basic' | 'pro'>('starter');
  const [currentTier, setCurrentTier] = useState<UserTier>(initialTier);

  const triggerAuthModal = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  const triggerUpgradeModal = useCallback((feature: string, requiredTier: string) => {
    const featureMap: Record<string, 'ai' | 'heavyTools' | 'workflows' | 'exports' | 'memory'> = {
      ai: 'ai',
      export: 'exports',
      exports: 'exports',
      heavyTools: 'heavyTools',
      workflows: 'workflows',
      memory: 'memory',
    };
    
    const tierMap: Record<string, 'starter' | 'basic' | 'pro'> = {
      starter: 'starter',
      basic: 'basic',
      pro: 'pro',
    };

    setUpgradeFeature(featureMap[feature] || 'exports');
    setUpgradeTier(tierMap[requiredTier] || 'starter');
    setShowUpgradeModal(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const closeUpgradeModal = useCallback(() => {
    setShowUpgradeModal(false);
  }, []);

  const onAuthSuccess = useCallback((userId: string) => {
    setShowAuthModal(false);
    window.location.reload();
  }, []);

  useEffect(() => {
    setAuthRequiredHandler(triggerAuthModal);
    setUpgradeRequiredHandler(triggerUpgradeModal);
  }, [triggerAuthModal, triggerUpgradeModal]);

  return (
    <UpgradeContext.Provider
      value={{
        showAuthModal,
        showUpgradeModal,
        upgradeFeature,
        upgradeTier,
        currentTier,
        triggerAuthModal,
        triggerUpgradeModal,
        closeAuthModal,
        closeUpgradeModal,
        setCurrentTier,
        onAuthSuccess,
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
}
