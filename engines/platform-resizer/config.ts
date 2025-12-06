import { PlatformImagePreset, platformImagePresets } from "@/data/platformImagePresets";

export interface PlatformResizerEngineConfig {
  engineId: "platform-resizer";
  sharedComponent: string;
  apiRoute: string;
  presets: PlatformImagePreset[];
}

export const platformResizerConfig: PlatformResizerEngineConfig = {
  engineId: "platform-resizer",
  sharedComponent: "components/PlatformImageToolClient.tsx",
  apiRoute: "/api/platform-image/resize",
  presets: platformImagePresets
};

export function getPresetBySlug(slug: string): PlatformImagePreset | undefined {
  return platformImagePresets.find(preset => preset.slug === slug);
}

export function getAllPresets(): PlatformImagePreset[] {
  return platformImagePresets;
}

export function getPresetsByName(nameContains: string): PlatformImagePreset[] {
  return platformImagePresets.filter(
    preset => preset.name.toLowerCase().includes(nameContains.toLowerCase())
  );
}

export function getPresetCount(): number {
  return platformImagePresets.length;
}
