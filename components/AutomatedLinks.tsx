"use client";

import Link from "next/link";
import { ArrowRight, FileText, Wrench } from "lucide-react";
import { toolsRegistry, Tool } from "@/data/toolsRegistry";
import { getClusterByToolSlug, getRelatedToolsFromCluster, getRelatedArticlesFromCluster } from "@/data/clusterRegistry";

interface AutomatedLinksProps {
  currentToolSlug: string;
  showRevenueCTA?: boolean;
}

function getToolBySlug(slug: string): Tool | undefined {
  return toolsRegistry.find(t => t.slug === slug);
}

export function AutomatedToolLinks({ currentToolSlug, showRevenueCTA = true }: AutomatedLinksProps) {
  const currentTool = getToolBySlug(currentToolSlug);
  if (!currentTool) return null;

  const recommendedToolSlugs = currentTool.recommendedTools?.length 
    ? currentTool.recommendedTools 
    : getRelatedToolsFromCluster(currentToolSlug, 3);
  
  const recommendedArticleSlugs = currentTool.recommendedArticles?.length
    ? currentTool.recommendedArticles
    : getRelatedArticlesFromCluster(currentToolSlug, 2);

  const relatedTools = recommendedToolSlugs
    .map(slug => getToolBySlug(slug))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 3);

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
            {relatedTools.map(tool => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {tool.name}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {tool.description}
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
  if (!currentTool) return null;

  const cluster = getClusterByToolSlug(currentToolSlug);
  
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
      <span className="text-gray-900 font-medium">{currentTool.name}</span>
    </nav>
  );
}

interface SchemaInjectorProps {
  currentToolSlug: string;
}

export function generateToolSchema(currentToolSlug: string) {
  const currentTool = getToolBySlug(currentToolSlug);
  if (!currentTool) return null;

  const cluster = getClusterByToolSlug(currentToolSlug);

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": currentTool.name,
    "description": currentTool.description,
    "url": `https://vcmsuite.com/tools/${currentTool.slug}`,
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
    ...(currentTool.primaryKeyword && {
      "keywords": [
        currentTool.primaryKeyword,
        ...(currentTool.secondaryKeywords || [])
      ].join(", ")
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
