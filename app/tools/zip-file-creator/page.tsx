import { Metadata } from 'next';
import { getZipPresetBySlug } from '@/engines/zip/config';
import ZipEngine from '@/components/engines/ZipEngine';
import { ToolRecord } from '@/lib/toolsRepo';

const preset = getZipPresetBySlug('zip-file-creator');

export const metadata: Metadata = {
  title: preset?.seo.title || 'ZIP File Creator - VCM Suite',
  description: preset?.seo.metaDescription || 'Create ZIP archives instantly in your browser',
};

export default function ZipFileCreatorPage() {
  const tool: ToolRecord = {
    id: 0,
    slug: 'zip-file-creator',
    name: preset?.title || 'ZIP File Creator',
    description: preset?.description || null,
    engine: 'zip',
    cluster: 'utility',
    segment: 'file-tools',
    status: 'live',
    linkStatus: 'active',
    isIndexed: true,
    inDirectory: true,
    featured: false,
    blueprintId: null,
    dimensions: null,
    linkRules: null,
    category: 'Utilities',
    tags: ['zip', 'archive', 'compress', 'files'],
    icon: 'FileArchive',
    iconBg: 'from-orange-500 to-orange-600',
    priority: 50,
    isNew: true,
    isTrending: false,
    isMbb: false,
    inputType: 'files',
    outputType: 'zip',
    primaryKeyword: 'zip file creator',
    secondaryKeywords: ['create zip online', 'zip files free', 'make zip file'],
    searchIntent: 'transactional',
    pillarSlug: null,
    recommendedTools: null,
    recommendedArticles: null,
    relatedTools: null,
    relatedArticles: null,
    source: 'preset',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return <ZipEngine tool={tool} />;
}
