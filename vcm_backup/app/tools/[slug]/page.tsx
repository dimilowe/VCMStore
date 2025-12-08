import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/toolsRepo';
import { isEngineSupported } from '@/lib/engineRegistry';
import ToolPageClient from './ToolPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug, { includeDrafts: false });

  if (!tool) {
    return { title: 'Tool Not Found | VCM Suite' };
  }

  return {
    title: `${tool.name} | Free Creator Tool | VCM Suite`,
    description: tool.description || `Use ${tool.name} for free. Part of VCM Suite creator tools.`,
    keywords: tool.secondaryKeywords?.join(', ') || tool.primaryKeyword || undefined,
    openGraph: {
      title: tool.name,
      description: tool.description || `Free ${tool.name} tool for creators.`,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug, { includeDrafts: true });

  if (!tool) {
    return notFound();
  }

  const hasEngine = isEngineSupported(tool.engine);

  return <ToolPageClient tool={tool} hasEngine={hasEngine} />;
}
