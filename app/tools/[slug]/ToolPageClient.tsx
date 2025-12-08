'use client';

import { useEffect, useState, ComponentType } from 'react';
import { ToolForRenderer } from '@/lib/cms/getCmsToolBySlug';
import { getEngineLoader, EngineComponentProps } from '@/lib/engineRegistry';
import ToolComingSoon from '@/components/engines/ToolComingSoon';

interface ToolPageClientProps {
  tool: ToolForRenderer;
  hasEngine: boolean;
}

export default function ToolPageClient({ tool, hasEngine }: ToolPageClientProps) {
  const [EngineComponent, setEngineComponent] = useState<ComponentType<EngineComponentProps> | null>(null);
  const [loading, setLoading] = useState(hasEngine);

  useEffect(() => {
    if (!hasEngine || !tool.engine) {
      setLoading(false);
      return;
    }

    const loader = getEngineLoader(tool.engine);
    if (!loader) {
      setLoading(false);
      return;
    }

    loader()
      .then((mod) => {
        setEngineComponent(() => mod.default);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [hasEngine, tool.engine]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-orange-200 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>
      </div>
    );
  }

  if (!EngineComponent) {
    return <ToolComingSoon tool={tool} />;
  }

  return <EngineComponent tool={tool} />;
}
