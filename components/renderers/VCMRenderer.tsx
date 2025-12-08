'use client';

import { CMSObject } from '@/lib/types/cms';
import { ProductRenderer } from './ProductRenderer';

interface VCMRendererProps {
  cmsObject: CMSObject;
}

export function VCMRenderer({ cmsObject }: VCMRendererProps) {
  switch (cmsObject.type) {
    case 'product':
      return <ProductRenderer cmsObject={cmsObject} />;
    case 'tool':
      return <div>Tool renderer coming soon</div>;
    case 'article':
      return <div>Article renderer coming soon</div>;
    case 'mbb':
      return <div>MBB renderer coming soon</div>;
    case 'cluster':
      return <div>Cluster renderer coming soon</div>;
    default:
      return <div>Unknown content type</div>;
  }
}
