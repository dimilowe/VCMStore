"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ClusterHealthScore {
  total: number;
  breakdown: {
    pillarScore: number;
    toolsScore: number;
    articlesScore: number;
    interlinkScore: number;
  };
  issues: string[];
  status: "ready" | "needs-work" | "incomplete";
}

interface ArticleStatus {
  slug: string;
  title?: string;
  exists: boolean;
  isDraft: boolean;
  isPublished: boolean;
  isIndexed: boolean;
  contentLength: number;
}

interface ClusterOverview {
  id: string;
  pillarSlug: string;
  pillarTitle: string;
  pillarDescription: string;
  engineId: string;
  primaryKeyword: string;
  toolCount: number;
  indexedToolCount: number;
  articleCount: number;
  publishedArticleCount: number;
  healthScore: ClusterHealthScore;
  toolSlugs: string[];
  articleSlugs: string[];
  articleStatuses: ArticleStatus[];
}

interface ToolInfo {
  slug: string;
  name: string;
  isIndexed: boolean;
  inDirectory: boolean;
}

export default function ClusterDetailPage() {
  const params = useParams();
  const clusterSlug = params.clusterSlug as string;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [cluster, setCluster] = useState<ClusterOverview | null>(null);
  const [tools, setTools] = useState<ToolInfo[]>([]);
  const [showToolFilter, setShowToolFilter] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated && clusterSlug) {
      loadClusterData();
    }
  }, [isAuthenticated, clusterSlug]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check", { credentials: "include" });
      const data = await res.json();
      setIsAuthenticated(data.isAdmin);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      if (res.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const loadClusterData = async () => {
    try {
      const clusterRes = await fetch(
        `/api/admin/clusters?id=${clusterSlug}`,
        { credentials: "include" }
      );
      if (clusterRes.ok) {
        const clusterData = await clusterRes.json();
        setCluster(clusterData);

        const toolsRes = await fetch("/api/admin/tools", { credentials: "include" });
        if (toolsRes.ok) {
          const { tools: allTools } = await toolsRes.json();
          const clusterTools = allTools.filter((t: ToolInfo) =>
            clusterData.toolSlugs.includes(t.slug)
          );
          setTools(clusterTools);
        }
      }
    } catch (error) {
      console.error("Failed to load cluster data:", error);
    }
  };

  const handleCreateDrafts = async () => {
    if (!cluster) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/admin/clusters/generate-articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clusterId: cluster.id }),
        credentials: "include",
      });
      if (res.ok) {
        await loadClusterData();
      }
    } catch (error) {
      console.error("Failed to create drafts:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleArticle = async (slug: string, action: "publish" | "unpublish" | "index" | "unindex") => {
    setTogglingSlug(slug);
    try {
      const res = await fetch("/api/admin/articles/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
        credentials: "include",
      });
      if (res.ok) {
        await loadClusterData();
      }
    } catch (error) {
      console.error("Failed to toggle article:", error);
    } finally {
      setTogglingSlug(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
            Ready to Index
          </span>
        );
      case "needs-work":
        return (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
            Needs Work
          </span>
        );
      case "incomplete":
        return (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
            Incomplete
          </span>
        );
      default:
        return null;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredTools = tools.filter((tool) => {
    if (showToolFilter === "all") return true;
    if (showToolFilter === "indexed") return tool.isIndexed;
    if (showToolFilter === "not-indexed") return !tool.isIndexed;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-80">
          <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border rounded px-3 py-2 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (!cluster) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Cluster not found</p>
          <Link href="/admin/clusters" className="text-orange-500 hover:underline">
            Back to Clusters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/admin" className="hover:text-orange-500">
            Admin
          </Link>
          <span>/</span>
          <Link href="/admin/clusters" className="hover:text-orange-500">
            Clusters
          </Link>
          <span>/</span>
          <span className="text-gray-900">{cluster.id}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{cluster.pillarTitle}</h1>
                {getStatusBadge(cluster.healthScore.status)}
              </div>
              <p className="text-gray-600 mb-2">{cluster.pillarDescription}</p>
              <p className="text-sm text-gray-500">
                Primary Keyword: <em className="font-medium">{cluster.primaryKeyword}</em>
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getHealthColor(cluster.healthScore.total)}`}>
                {cluster.healthScore.total}
              </div>
              <div className="text-sm text-gray-500">Health Score</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold">{cluster.healthScore.breakdown.pillarScore}/25</div>
              <div className="text-xs text-gray-500">Pillar</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold">{cluster.healthScore.breakdown.toolsScore}/25</div>
              <div className="text-xs text-gray-500">Tools</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold">{cluster.healthScore.breakdown.articlesScore}/25</div>
              <div className="text-xs text-gray-500">Articles</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold">{cluster.healthScore.breakdown.interlinkScore}/25</div>
              <div className="text-xs text-gray-500">Interlinks</div>
            </div>
          </div>

          {cluster.healthScore.issues.length > 0 && (
            <div className="p-3 bg-red-50 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">Issues to Address:</h3>
              <ul className="list-disc list-inside text-sm text-red-700">
                {cluster.healthScore.issues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Cluster Map</h2>
          <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <div className="text-orange-600 font-bold mb-2">
              {cluster.pillarTitle}
            </div>
            <div className="ml-4 border-l-2 border-gray-300 pl-4">
              <div className="mb-3">
                <div className="text-gray-700 font-medium mb-1">Tools ({cluster.toolCount})</div>
                {cluster.toolSlugs.map((slug, idx) => {
                  const tool = tools.find((t) => t.slug === slug);
                  const isLast = idx === cluster.toolSlugs.length - 1;
                  return (
                    <div key={slug} className="flex items-center gap-2 text-gray-600 ml-2">
                      <span className="text-gray-400">{isLast ? "└──" : "├──"}</span>
                      <span>{slug}</span>
                      {tool?.isIndexed ? (
                        <span className="text-green-500 text-xs">●</span>
                      ) : (
                        <span className="text-gray-300 text-xs">○</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="text-gray-700 font-medium mb-1">
                  Articles ({cluster.articleStatuses?.filter(a => a.exists).length || 0}/{cluster.articleCount} drafts · {cluster.publishedArticleCount} published)
                </div>
                {cluster.articleStatuses?.length === 0 ? (
                  <div className="ml-2 text-red-500 text-sm">└── (none - add supporting articles!)</div>
                ) : (
                  cluster.articleStatuses?.map((article, idx) => {
                    const isLast = idx === (cluster.articleStatuses?.length || 0) - 1;
                    return (
                      <div key={article.slug} className="flex items-center gap-2 text-gray-600 ml-2">
                        <span className="text-gray-400">{isLast ? "└──" : "├──"}</span>
                        <span>{article.slug}</span>
                        {!article.exists ? (
                          <span className="text-red-400 text-xs">✕</span>
                        ) : article.isPublished ? (
                          <span className="text-green-500 text-xs">●</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">◐</span>
                        )}
                        {article.isIndexed && (
                          <span className="text-blue-500 text-xs">★</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tools ({cluster.toolCount})</h2>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={showToolFilter}
                onChange={(e) => setShowToolFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="indexed">Indexed Only</option>
                <option value="not-indexed">Not Indexed</option>
              </select>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTools.map((tool) => (
                <div
                  key={tool.slug}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <div className="font-medium text-sm">{tool.name || tool.slug}</div>
                    <div className="text-xs text-gray-500">{tool.slug}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.isIndexed ? (
                      <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                        Indexed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                        Draft
                      </span>
                    )}
                    {tool.inDirectory && (
                      <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                        In Dir
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {filteredTools.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No tools match filter
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Supporting Articles
                </h2>
                <p className="text-sm text-gray-500">
                  {cluster.articleStatuses?.filter(a => a.exists).length || 0}/{cluster.articleCount} drafts · {cluster.publishedArticleCount}/{cluster.articleCount} published
                </p>
              </div>
              {cluster.articleStatuses?.some(a => !a.exists) && (
                <button
                  onClick={handleCreateDrafts}
                  disabled={isGenerating}
                  className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                >
                  {isGenerating ? "Generating with AI..." : "Generate Articles with AI"}
                </button>
              )}
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {cluster.articleStatuses?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No supporting articles planned</p>
                  <p className="text-sm">Add article slugs to the cluster registry</p>
                </div>
              ) : (
                cluster.articleStatuses?.map((article) => (
                  <div
                    key={article.slug}
                    className="p-3 bg-gray-50 rounded border"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {article.title || article.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </div>
                        <div className="text-xs text-gray-500">{article.slug}</div>
                        {article.exists && (
                          <div className="text-xs text-gray-400 mt-1">
                            {article.contentLength > 0 ? `${Math.round(article.contentLength / 5)} words` : "Empty draft"}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1">
                          {!article.exists ? (
                            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                              Missing
                            </span>
                          ) : article.isPublished ? (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                              Draft
                            </span>
                          )}
                          {article.isIndexed && (
                            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                              Indexed
                            </span>
                          )}
                        </div>
                        {article.exists && (
                          <div className="flex items-center gap-2 text-xs">
                            <Link
                              href={`/admin/blog/edit/${article.slug}`}
                              className="text-orange-600 hover:underline"
                            >
                              Edit
                            </Link>
                            {article.isPublished && (
                              <Link
                                href={`/newsletter/${article.slug}`}
                                target="_blank"
                                className="text-gray-600 hover:underline"
                              >
                                View
                              </Link>
                            )}
                            <button
                              onClick={() => handleToggleArticle(
                                article.slug,
                                article.isPublished ? "unpublish" : "publish"
                              )}
                              disabled={togglingSlug === article.slug}
                              className={`px-2 py-0.5 rounded text-white ${
                                article.isPublished
                                  ? "bg-gray-500 hover:bg-gray-600"
                                  : "bg-green-500 hover:bg-green-600"
                              } disabled:opacity-50`}
                            >
                              {article.isPublished ? "Unpublish" : "Publish"}
                            </button>
                            {article.isPublished && (
                              <button
                                onClick={() => handleToggleArticle(
                                  article.slug,
                                  article.isIndexed ? "unindex" : "index"
                                )}
                                disabled={togglingSlug === article.slug}
                                className={`px-2 py-0.5 rounded text-white ${
                                  article.isIndexed
                                    ? "bg-gray-500 hover:bg-gray-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                                } disabled:opacity-50`}
                              >
                                {article.isIndexed ? "Unindex" : "Index"}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/tools/clusters/${cluster.pillarSlug}`}
              target="_blank"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Preview Pillar Page
            </Link>
            <Link
              href="/admin/tools"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Manage Tools
            </Link>
            <Link
              href="/admin/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Add Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
