'use client';

import { UpgradeProvider, useUpgradeContext } from '@/context/UpgradeContext';
import { AuthModal } from '@/components/auth-modal';
import UpgradeModal from '@/components/modals/UpgradeModal';
import type { UserTier } from '@/lib/pricing/types';

function ModalManager() {
  const {
    showAuthModal,
    showUpgradeModal,
    upgradeFeature,
    upgradeTier,
    currentTier,
    closeAuthModal,
    closeUpgradeModal,
    onAuthSuccess,
  } = useUpgradeContext();

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        onSuccess={onAuthSuccess}
      />
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={closeUpgradeModal}
        currentTier={currentTier}
        requiredFeature={upgradeFeature}
        targetTier={upgradeTier}
      />
    </>
  );
}

interface AppProviderProps {
  children: React.ReactNode;
  initialTier?: UserTier;
}

export function AppProvider({ children, initialTier = 'free' }: AppProviderProps) {
  return (
    <UpgradeProvider initialTier={initialTier}>
      {children}
      <ModalManager />
    </UpgradeProvider>
  );
}
