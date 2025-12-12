'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/state/uiStore';
import { AuthModal } from '@/components/auth-modal';
import UpgradeModal from '@/components/modals/UpgradeModal';
import type { UserTier } from '@/lib/pricing/types';

interface AppProviderProps {
  children: React.ReactNode;
  currentTier?: UserTier;
}

export function AppProvider({ children, currentTier = 'free' }: AppProviderProps) {
  const {
    isAuthModalOpen,
    isUpgradeModalOpen,
    upgradeFeature,
    upgradeRequiredTier,
    closeAuthModal,
    closeUpgradeModal,
    setUserTier,
  } = useUIStore();

  useEffect(() => {
    setUserTier(currentTier);
  }, [currentTier, setUserTier]);

  const handleAuthSuccess = (userId: string) => {
    closeAuthModal();
    window.location.reload();
  };

  const mappedFeature = upgradeFeature === 'export' ? 'exports' : upgradeFeature;

  return (
    <>
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={handleAuthSuccess}
      />
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={closeUpgradeModal}
        currentTier={currentTier}
        requiredFeature={mappedFeature as 'ai' | 'heavyTools' | 'workflows' | 'exports' | 'memory' | undefined}
        targetTier={upgradeRequiredTier || 'starter'}
      />
    </>
  );
}
