import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wrench, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { CLUSTER_REGISTRY, getClusterById } from "@/data/clusterRegistry";
import { toolsRegistry, CATEGORY_INFO } from "@/data/toolsRegistry";
import { getToolSkinBySlug } from "@/data/engineKeywordMatrix";

interface PageProps {
  params: Promise<{ clusterSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { clusterSlug } = await params;
  const cluster = getClusterById(clusterSlug);
  
  if (!cluster) {
    return { title: "Cluster Not Found" };
  }

  return {
    title: `${cluster.pillarTitle} | VCM Suite`,
    description: cluster.pillarDescription,
    keywords: [cluster.primaryKeyword, ...cluster.relatedKeywords].join(", "),
    openGraph: {
      title: cluster.pillarTitle,
      description: cluster.pillarDescription,
      type: "website",
    },
    robots: "index, follow",
  };
}

export function generateStaticParams() {
  return Object.keys(CLUSTER_REGISTRY).map((clusterSlug) => ({
    clusterSlug,
  }));
}

function getToolData(slug: string) {
  const registryTool = toolsRegistry.find(t => t.slug === slug);
  if (registryTool) {
    return {
      slug: registryTool.slug,
      name: registryTool.name,
      description: registryTool.description,
      category: registryTool.category,
    };
  }
  
  const skin = getToolSkinBySlug(slug);
  if (skin) {
    return {
      slug: skin.slug,
      name: skin.name,
      description: skin.introCopy,
      category: "calculators" as const,
    };
  }
  
  return null;
}

export default async function ClusterPillarPage({ params }: PageProps) {
  const { clusterSlug } = await params;
  const cluster = getClusterById(clusterSlug);

  if (!cluster) {
    notFound();
  }

  const tools = cluster.toolSlugs
    .map(slug => getToolData(slug))
    .filter((t): t is NonNullable<ReturnType<typeof getToolData>> => t !== null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": cluster.pillarTitle,
    "description": cluster.pillarDescription,
    "mainEntity": {
      "@type": "ItemList",
      "name": cluster.pillarTitle,
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://vcmsuite.com/tools/${tool.slug}`,
          "applicationCategory": "WebApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/tools" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tools Explorer
            </Link>
            
            <div className="mb-2 text-sm text-orange-600 font-medium uppercase tracking-wide">
              Tool Collection
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {cluster.pillarTitle}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl">
              {cluster.pillarDescription}
            </p>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Tools in This Collection ({tools.length})
              </h2>
            </div>
            
            <div className="grid gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>

          {cluster.articleSlugs.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  Related Articles ({cluster.articleSlugs.length})
                </h2>
              </div>
              
              <div className="grid gap-3">
                {cluster.articleSlugs.map((articleSlug) => (
                  <Link
                    key={articleSlug}
                    href={`/blog/${articleSlug}`}
                    className="group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                      {articleSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Build Your Creator Business
              </h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Join VCM OS to access premium creator tools, resources, and a community of ambitious creators.
              </p>
              <Link
                href="https://vcmos.io"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors"
              >
                Open VCM OS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link 
              href="/tools" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse All Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
