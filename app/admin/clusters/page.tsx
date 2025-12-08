"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";

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
}

export default function AdminClustersPage() {
  const [clusters, setClusters] = useState<ClusterOverview[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterEngine, setFilterEngine] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClusters();
  }, []);

  const loadClusters = async () => {
    try {
      const res = await fetch("/api/admin/clusters", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setClusters(data);
      }
    } catch (error) {
      console.error("Failed to load clusters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uniqueEngines = [...new Set(clusters.map((c) => c.engineId))];

  const filteredClusters = clusters.filter((cluster) => {
    const matchesSearch =
      searchQuery === "" ||
      cluster.pillarTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || cluster.healthScore.status === filterStatus;
    const matchesEngine = filterEngine === "all" || cluster.engineId === filterEngine;
    return matchesSearch && matchesStatus && matchesEngine;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Ready
          </span>
        );
      case "needs-work":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Needs Work
          </span>
        );
      case "incomplete":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
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

  const getEngineColor = (engine: string) => {
    switch (engine) {
      case "platform-resizer":
        return "bg-cyan-100 text-cyan-800";
      case "calculator":
        return "bg-amber-100 text-amber-800";
      case "ai-analysis":
        return "bg-purple-100 text-purple-800";
      case "image-compress":
        return "bg-teal-100 text-teal-800";
      case "standalone":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cluster Control Panel</h1>
          <p className="text-gray-600">Manage topical authority clusters for SEO dominance</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4 border-b">
            <div className="flex flex-wrap gap-4 items-center">
              <input
                type="text"
                placeholder="Search clusters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-3 py-2 w-64"
              />
              <select
                className="border rounded px-3 py-2 bg-white text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="ready">Ready</option>
                <option value="needs-work">Needs Work</option>
                <option value="incomplete">Incomplete</option>
              </select>
              <select
                className="border rounded px-3 py-2 bg-white text-sm"
                value={filterEngine}
                onChange={(e) => setFilterEngine(e.target.value)}
              >
                <option value="all">All Engines</option>
                {uniqueEngines.map((engine) => (
                  <option key={engine} value={engine}>
                    {engine}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500 ml-auto">
                {filteredClusters.length} of {clusters.length} clusters
              </span>
            </div>
          </div>

          <div className="grid gap-4 p-4">
            {filteredClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        href={`/admin/clusters/${cluster.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-orange-500"
                      >
                        {cluster.pillarTitle}
                      </Link>
                      {getStatusBadge(cluster.healthScore.status)}
                    </div>
                    <p className="text-sm text-gray-500">{cluster.pillarDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getHealthColor(cluster.healthScore.total)}`}>
                      {cluster.healthScore.total}
                    </div>
                    <div className="text-xs text-gray-500">Health Score</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm mb-3">
                  <span className={`px-2 py-1 rounded ${getEngineColor(cluster.engineId)}`}>
                    {cluster.engineId}
                  </span>
                  <span className="text-gray-600">
                    <strong>{cluster.toolCount}</strong> tools ({cluster.indexedToolCount} indexed)
                  </span>
                  <span className="text-gray-600">
                    <strong>{cluster.articleCount}</strong> articles
                  </span>
                  <span className="text-gray-500">
                    Keyword: <em>{cluster.primaryKeyword}</em>
                  </span>
                </div>

                {cluster.healthScore.issues.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cluster.healthScore.issues.map((issue, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t flex gap-2">
                  <Link
                    href={`/admin/clusters/${cluster.id}`}
                    className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/tools/clusters/${cluster.pillarSlug}`}
                    target="_blank"
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Preview Pillar Page
                  </Link>
                </div>
              </div>
            ))}

            {filteredClusters.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No clusters found matching your filters.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="font-semibold mb-3">Cluster Health Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {clusters.filter((c) => c.healthScore.status === "ready").length}
              </div>
              <div className="text-sm text-gray-600">Ready</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {clusters.filter((c) => c.healthScore.status === "needs-work").length}
              </div>
              <div className="text-sm text-gray-600">Needs Work</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {clusters.filter((c) => c.healthScore.status === "incomplete").length}
              </div>
              <div className="text-sm text-gray-600">Incomplete</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
