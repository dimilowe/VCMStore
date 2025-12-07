import { ComponentType } from 'react';
import { ToolRecord } from './toolsRepo';

export interface EngineComponentProps {
  tool: ToolRecord;
}

export const ENGINE_COMPONENTS: Record<string, () => Promise<{ default: ComponentType<EngineComponentProps> }>> = {
  'calculator': () => import('@/components/engines/CalculatorEngine'),
  'youtube-metrics-calculator': () => import('@/components/engines/CalculatorEngine'),
  'platform-resizer': () => import('@/components/engines/PlatformResizerEngine'),
};

export function getEngineLoader(engine: string | null): (() => Promise<{ default: ComponentType<EngineComponentProps> }>) | null {
  if (!engine) return null;
  return ENGINE_COMPONENTS[engine] || null;
}

export function isEngineSupported(engine: string | null): boolean {
  if (!engine) return false;
  return engine in ENGINE_COMPONENTS;
}
