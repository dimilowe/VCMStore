import { ComponentType } from 'react';
import { ToolForRenderer } from './cms/getCmsToolBySlug';

export interface EngineComponentProps {
  tool: ToolForRenderer;
}

export const ENGINE_COMPONENTS: Record<string, () => Promise<{ default: ComponentType<EngineComponentProps> }>> = {
  'calculator': () => import('@/components/engines/CalculatorEngine'),
  'youtube-metrics-calculator': () => import('@/components/engines/CalculatorEngine'),
  'platform-resizer': () => import('@/components/engines/PlatformResizerEngine'),
  'zip': () => import('@/components/engines/ZipEngine'),
};

export function getEngineLoader(engine: string | null): (() => Promise<{ default: ComponentType<EngineComponentProps> }>) | null {
  if (!engine) return null;
  return ENGINE_COMPONENTS[engine] || null;
}

export function isEngineSupported(engine: string | null): boolean {
  if (!engine) return false;
  return engine in ENGINE_COMPONENTS;
}
