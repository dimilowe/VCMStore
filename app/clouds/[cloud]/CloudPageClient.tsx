'use client';

import { CloudForRenderer } from "@/lib/cms/getCmsCloudBySlug";
import CloudDashboardEngine from "@/components/engines/CloudDashboardEngine";
import type { CMSObject, CloudDashboardEngineConfig } from "@/lib/types/cms";

interface CloudPageClientProps {
  cloud: CloudForRenderer;
}

export default function CloudPageClient({ cloud }: CloudPageClientProps) {
  const cmsObject: CMSObject & { engine_config: CloudDashboardEngineConfig } = {
    id: cloud.slug,
    slug: cloud.slug,
    type: 'cloud_dashboard',
    engine: cloud.engine,
    engine_config: cloud.engineConfig,
    data: {
      title: cloud.title,
      description: cloud.description,
      seo_title: cloud.seoTitle,
      seo_description: cloud.seoDescription,
    },
    word_count: 0,
    health: 'ok',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return <CloudDashboardEngine cms={cmsObject} />;
}
