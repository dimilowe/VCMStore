import { create } from 'zustand';

type UpgradeFeature = 'export' | 'exports' | 'heavyTools' | 'ai' | 'workflows' | 'memory' | null;
type Tier = 'starter' | 'basic' | 'pro' | null;

interface UIState {
  isAuthModalOpen: boolean;
  isUpgradeModalOpen: boolean;
  upgradeFeature: UpgradeFeature;
  upgradeRequiredTier: Tier;

  openAuthModal: () => void;
  closeAuthModal: () => void;

  openUpgradeModal: (feature: UpgradeFeature, tier: Tier) => void;
  closeUpgradeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAuthModalOpen: false,
  isUpgradeModalOpen: false,
  upgradeFeature: null,
  upgradeRequiredTier: null,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  openUpgradeModal: (feature, tier) =>
    set({
      isUpgradeModalOpen: true,
      upgradeFeature: feature,
      upgradeRequiredTier: tier,
    }),

  closeUpgradeModal: () =>
    set({
      isUpgradeModalOpen: false,
      upgradeFeature: null,
      upgradeRequiredTier: null,
    }),
}));
