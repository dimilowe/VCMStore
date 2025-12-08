import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCmsToolBySlug } from '@/lib/cms/getCmsToolBySlug';
import { isEngineSupported } from '@/lib/engineRegistry';
import ToolPageClient from './ToolPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getCmsToolBySlug(slug, { includeDrafts: false });

  if (!tool) {
    return { title: 'Tool Not Found | VCM Suite' };
  }

  const seoTitle = tool.seo?.metaTitle || `${tool.name} | Free Creator Tool | VCM Suite`;
  const seoDescription = tool.seo?.metaDescription || tool.description || `Use ${tool.name} for free. Part of VCM Suite creator tools.`;
  const seoKeywords = tool.seo?.keywords?.join(', ');

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: tool.name,
      description: seoDescription,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getCmsToolBySlug(slug, { includeDrafts: true });

  if (!tool) {
    return notFound();
  }

  const hasEngine = isEngineSupported(tool.engine);

  return <ToolPageClient tool={tool} hasEngine={hasEngine} />;
}
