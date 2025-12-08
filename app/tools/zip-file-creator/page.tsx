import { Metadata } from 'next';
import { getZipPresetBySlug } from '@/engines/zip/config';
import ZipEngine from '@/components/engines/ZipEngine';
import { ToolForRenderer } from '@/lib/cms/getCmsToolBySlug';

const preset = getZipPresetBySlug('zip-file-creator');

export const metadata: Metadata = {
  title: preset?.seo.title || 'ZIP File Creator - VCM Suite',
  description: preset?.seo.metaDescription || 'Create ZIP archives instantly in your browser',
};

export default function ZipFileCreatorPage() {
  const tool: ToolForRenderer = {
    slug: 'zip-file-creator',
    name: preset?.title || 'ZIP File Creator',
    description: preset?.description || 'Create ZIP archives instantly in your browser',
    engine: 'zip',
    preset: 'zip-file-creator',
    isIndexed: true,
  };

  return <ZipEngine tool={tool} />;
}
