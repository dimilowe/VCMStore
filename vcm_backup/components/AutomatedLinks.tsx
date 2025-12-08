"use client";

import Link from "next/link";
import { ArrowRight, FileText, Wrench } from "lucide-react";
import { toolsRegistry, Tool } from "@/data/toolsRegistry";
import { getClusterByToolSlug, getRelatedToolsFromCluster, getRelatedArticlesFromCluster, getClusterById } from "@/data/clusterRegistry";
import { getToolSkinBySlug, getSkinsByCluster, ToolSkin } from "@/data/engineKeywordMatrix";

interface AutomatedLinksProps {
  currentToolSlug: string;
  showRevenueCTA?: boolean;
}

function getToolBySlug(slug: string): Tool | undefined {
  return toolsRegistry.find(t => t.slug === slug);
}

function getSkinRelatedTools(skin: ToolSkin, limit: number = 3): ToolSkin[] {
  if (!skin.clusterSlug) return [];
  return getSkinsByCluster(skin.clusterSlug)
    .filter(s => s.slug !== skin.slug && s.isIndexed)
    .slice(0, limit);
}

function getSkinRelatedArticles(skin: ToolSkin, limit: number = 2): string[] {
  if (!skin.clusterSlug) return [];
  const cluster = getClusterById(skin.clusterSlug);
  return cluster?.articleSlugs.slice(0, limit) || [];
}

export function AutomatedToolLinks({ currentToolSlug, showRevenueCTA = true }: AutomatedLinksProps) {
  const currentTool = getToolBySlug(currentToolSlug);
  const currentSkin = getToolSkinBySlug(currentToolSlug);
  
  if (!currentTool && !currentSkin) return null;

  let relatedTools: { slug: string; name: string; description: string }[] = [];
  let recommendedArticleSlugs: string[] = [];

  if (currentTool) {
    const recommendedToolSlugs = currentTool.recommendedTools?.length 
      ? currentTool.recommendedTools 
      : getRelatedToolsFromCluster(currentToolSlug, 3);
    
    recommendedArticleSlugs = currentTool.recommendedArticles?.length
      ? currentTool.recommendedArticles
      : getRelatedArticlesFromCluster(currentToolSlug, 2);

    relatedTools = recommendedToolSlugs
      .map(slug => {
        const tool = getToolBySlug(slug);
        if (tool) return { slug: tool.slug, name: tool.name, description: tool.description };
        const skin = getToolSkinBySlug(slug);
        if (skin) return { slug: skin.slug, name: skin.name, description: skin.introCopy };
        return null;
      })
      .filter((t): t is { slug: string; name: string; description: string } => t !== null)
      .slice(0, 3);
  } else if (currentSkin) {
    const skinRelated = getSkinRelatedTools(currentSkin, 3);
    relatedTools = skinRelated.map(s => ({ slug: s.slug, name: s.name, description: s.introCopy }));
    recommendedArticleSlugs = getSkinRelatedArticles(currentSkin, 2);
  }

  if (relatedTools.length === 0 && recommendedArticleSlugs.length === 0) return null;

  return (
    <div className="mt-12 space-y-8">
      {relatedTools.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-orange-500" />
            Related Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTools.map(t => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {t.name}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {t.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recommendedArticleSlugs.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            Learn More
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedArticleSlugs.map(slug => (
              <Link
                key={slug}
                href={`/mbb/${slug}`}
                className="group flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-white transition-all"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors capitalize">
                    {slug.replace(/-/g, ' ')}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {showRevenueCTA && (
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Want More Creator Tools?</h3>
              <p className="text-orange-100 mt-1">
                Join VCM OS - the complete creator ecosystem
              </p>
            </div>
            <Link
              href="https://vcmos.io"
              target="_blank"
              className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors flex items-center gap-2"
            >
              Open VCM OS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

interface BreadcrumbsProps {
  currentToolSlug: string;
}

export function AutomatedBreadcrumbs({ currentToolSlug }: BreadcrumbsProps) {
  const currentTool = getToolBySlug(currentToolSlug);
  const currentSkin = getToolSkinBySlug(currentToolSlug);
  
  if (!currentTool && !currentSkin) return null;

  const toolName = currentTool?.name || currentSkin?.name || currentToolSlug;
  const clusterSlug = currentTool?.clusterSlug || currentSkin?.clusterSlug;
  const cluster = clusterSlug ? getClusterById(clusterSlug) : getClusterByToolSlug(currentToolSlug);
  
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link href="/" className="hover:text-orange-600 transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/tools" className="hover:text-orange-600 transition-colors">
        Tools
      </Link>
      {cluster && (
        <>
          <span>/</span>
          <Link 
            href={`/tools?cluster=${cluster.id}`} 
            className="hover:text-orange-600 transition-colors"
          >
            {cluster.pillarTitle.split(' ').slice(0, 3).join(' ')}
          </Link>
        </>
      )}
      <span>/</span>
      <span className="text-gray-900 font-medium">{toolName}</span>
    </nav>
  );
}

interface SchemaInjectorProps {
  currentToolSlug: string;
}

export function generateToolSchema(currentToolSlug: string) {
  const currentTool = getToolBySlug(currentToolSlug);
  const currentSkin = getToolSkinBySlug(currentToolSlug);
  
  if (!currentTool && !currentSkin) return null;

  const name = currentTool?.name || currentSkin?.name || currentToolSlug;
  const description = currentTool?.description || currentSkin?.introCopy || "";
  const clusterSlug = currentTool?.clusterSlug || currentSkin?.clusterSlug;
  const cluster = clusterSlug ? getClusterById(clusterSlug) : getClusterByToolSlug(currentToolSlug);
  const primaryKeyword = currentTool?.primaryKeyword || currentSkin?.primaryKeyword;
  const secondaryKeywords = currentTool?.secondaryKeywords || currentSkin?.secondaryKeywords || [];

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": `https://vcmsuite.com/tools/${currentToolSlug}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    ...(cluster && {
      "isPartOf": {
        "@type": "WebPage",
        "name": cluster.pillarTitle,
        "url": `https://vcmsuite.com/tools?cluster=${cluster.id}`
      }
    }),
    ...(primaryKeyword && {
      "keywords": [primaryKeyword, ...secondaryKeywords].join(", ")
    })
  };
}

export function ToolSchemaScript({ currentToolSlug }: SchemaInjectorProps) {
  const schema = generateToolSchema(currentToolSlug);
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
