"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { CMSImportModal } from "@/components/admin/cms-import-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  FileText,
  LayoutGrid,
  Layers,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Upload,
} from "lucide-react";
import Link from "next/link";

interface ToolSkin {
  slug: string;
  name: string;
  engineType: string;
  segment: string;
  clusterSlug: string;
  isIndexed: boolean;
  isFeatured: boolean;
  inDirectory: boolean;
  priority: string;
  h1: string;
  primaryKeyword: string;
  linkStatus: {
    status: "ready" | "warning" | "error";
    label: string;
    details: string[];
  };
}

interface ClusterSummary {
  id: string;
  pillarSlug: string;
  pillarTitle: string;
  engineId: string;
  toolCount: number;
  indexedCount: number;
  articleCount: number;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  is_indexed: boolean;
  is_published: boolean;
  cluster_slug: string | null;
  cluster_title: string | null;
  word_count: number;
  health: "thin" | "ok" | "strong";
  source: "cluster_articles" | "cms_objects";
}

interface MBB {
  id: string;
  slug: string;
  title: string;
  mbb_type: string | null;
  cluster_slug: string | null;
  cluster_title: string | null;
  is_indexed: boolean;
  word_count: number;
  health: "thin" | "ok" | "strong";
}

type TabType = "tools" | "articles" | "clusters" | "mbbs";

function ContentManagerInner() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabType) || "tools";
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [tools, setTools] = useState<ToolSkin[]>([]);
  const [clusters, setClusters] = useState<ClusterSummary[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [mbbs, setMbbs] = useState<MBB[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterEngine, setFilterEngine] = useState("all");
  const [filterIndexed, setFilterIndexed] = useState("all");
  const [filterCluster, setFilterCluster] = useState("all");
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [bulkCluster, setBulkCluster] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [toolsRes, clustersRes, articlesRes, mbbsRes] = await Promise.all([
        fetch("/api/admin/tools", { credentials: "include" }),
        fetch("/api/admin/tools/clusters", { credentials: "include" }),
        fetch("/api/admin/articles", { credentials: "include" }),
        fetch("/api/admin/mbbs", { credentials: "include" }),
      ]);
      
      if (toolsRes.ok) {
        const data = await toolsRes.json();
        setTools(data.tools || []);
      }
      if (clustersRes.ok) {
        const data = await clustersRes.json();
        setClusters(data.clusters || []);
      }
      if (articlesRes.ok) {
        const data = await articlesRes.json();
        setArticles(data.articles || []);
      }
      if (mbbsRes.ok) {
        const data = await mbbsRes.json();
        setMbbs(data.mbbs || []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleToolIndexed = async (slug: string, currentValue: boolean) => {
    try {
      const res = await fetch("/api/admin/tools/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, field: "isIndexed", value: !currentValue }),
        credentials: "include",
      });
      if (res.ok) {
        setTools((prev) =>
          prev.map((t) => (t.slug === slug ? { ...t, isIndexed: !currentValue } : t))
        );
      }
    } catch (error) {
      console.error("Failed to update tool:", error);
    }
  };

  const toggleArticleIndexed = async (article: Article) => {
    try {
      const res = await fetch("/api/admin/articles/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: article.id, 
          slug: article.slug,
          source: article.source,
          field: "is_indexed", 
          value: !article.is_indexed 
        }),
        credentials: "include",
      });
      if (res.ok) {
        setArticles((prev) =>
          prev.map((a) => (a.id === article.id ? { ...a, is_indexed: !article.is_indexed } : a))
        );
      }
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  const toggleMbbIndexed = async (mbb: MBB) => {
    try {
      const res = await fetch("/api/admin/mbbs/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          slug: mbb.slug,
          field: "is_indexed", 
          value: !mbb.is_indexed 
        }),
        credentials: "include",
      });
      if (res.ok) {
        setMbbs((prev) =>
          prev.map((m) => (m.id === mbb.id ? { ...m, is_indexed: !mbb.is_indexed } : m))
        );
      }
    } catch (error) {
      console.error("Failed to update MBB:", error);
    }
  };

  const updateToolCluster = async (slug: string, clusterSlug: string) => {
    try {
      const res = await fetch("/api/admin/tools/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, field: "clusterSlug", value: clusterSlug || null }),
        credentials: "include",
      });
      if (res.ok) {
        setTools((prev) =>
          prev.map((t) => (t.slug === slug ? { ...t, clusterSlug } : t))
        );
      }
    } catch (error) {
      console.error("Failed to update tool cluster:", error);
    }
  };

  const bulkAssignCluster = async () => {
    if (selectedTools.size === 0) return;
    const isRemove = bulkCluster === "__remove__";
    const clusterValue = isRemove ? "" : bulkCluster;
    if (!bulkCluster) return;
    
    const updates = Array.from(selectedTools).map((slug) =>
      fetch("/api/admin/tools/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, field: "clusterSlug", value: clusterValue || null }),
        credentials: "include",
      })
    );
    await Promise.all(updates);
    setTools((prev) =>
      prev.map((t) =>
        selectedTools.has(t.slug) ? { ...t, clusterSlug: clusterValue } : t
      )
    );
    setSelectedTools(new Set());
    setBulkCluster("");
  };

  const toggleToolSelection = (slug: string) => {
    setSelectedTools((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleAllOnPage = () => {
    const slugsOnPage = paginatedTools.map((t) => t.slug);
    const allSelected = slugsOnPage.every((s) => selectedTools.has(s));
    if (allSelected) {
      setSelectedTools((prev) => {
        const next = new Set(prev);
        slugsOnPage.forEach((s) => next.delete(s));
        return next;
      });
    } else {
      setSelectedTools((prev) => {
        const next = new Set(prev);
        slugsOnPage.forEach((s) => next.add(s));
        return next;
      });
    }
  };

  const engineTypes = [...new Set(tools.map((t) => t.engineType))];
  const clusterSlugs = [...new Set(clusters.map((c) => c.pillarSlug))];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEngine = filterEngine === "all" || tool.engineType === filterEngine;
    const matchesIndexed =
      filterIndexed === "all" ||
      (filterIndexed === "indexed" && tool.isIndexed) ||
      (filterIndexed === "not-indexed" && !tool.isIndexed);
    const matchesCluster =
      filterCluster === "all" ||
      (filterCluster === "unassigned" && !tool.clusterSlug) ||
      tool.clusterSlug === filterCluster;
    return matchesSearch && matchesEngine && matchesIndexed && matchesCluster;
  });

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getLinkStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <CMSImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportComplete={() => loadData()}
      />
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Wrench className="w-6 h-6 text-orange-500" />
              Content
            </h1>
            <p className="text-gray-500 mt-1">
              View, edit, and import content
            </p>
          </div>
          <Button
            onClick={() => setShowImportModal(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import JSON
          </Button>
        </div>

        <div className="flex gap-2 border-b">
          {[
            { id: "tools", label: `Tools (${tools.length})`, icon: Wrench },
            { id: "articles", label: `Articles (${articles.length})`, icon: FileText },
            { id: "clusters", label: `Clusters (${clusters.length})`, icon: LayoutGrid },
            { id: "mbbs", label: "MBBs", icon: Layers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "tools" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <select
                value={filterEngine}
                onChange={(e) => {
                  setFilterEngine(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Engines</option>
                {engineTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={filterIndexed}
                onChange={(e) => {
                  setFilterIndexed(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="indexed">Indexed</option>
                <option value="not-indexed">Not Indexed</option>
              </select>
              <select
                value={filterCluster}
                onChange={(e) => {
                  setFilterCluster(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Clusters</option>
                <option value="unassigned">Unassigned Only</option>
                {clusters.map((cluster) => (
                  <option key={cluster.pillarSlug} value={cluster.pillarSlug}>{cluster.pillarTitle}</option>
                ))}
              </select>
            </div>

            {selectedTools.size > 0 && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="text-sm font-medium text-orange-700">
                  {selectedTools.size} selected
                </span>
                <select
                  value={bulkCluster}
                  onChange={(e) => setBulkCluster(e.target.value)}
                  className="border rounded-md px-3 py-1.5 text-sm"
                >
                  <option value="">Select cluster...</option>
                  <option value="__remove__">— Remove from cluster —</option>
                  {clusters.map((cluster) => (
                    <option key={cluster.pillarSlug} value={cluster.pillarSlug}>{cluster.pillarTitle}</option>
                  ))}
                </select>
                <Button
                  onClick={bulkAssignCluster}
                  disabled={!bulkCluster}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Assign to Cluster
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTools(new Set())}
                >
                  Clear
                </Button>
              </div>
            )}

            <div className="text-sm text-gray-500">
              Showing {paginatedTools.length} of {filteredTools.length} tools
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Loading tools...</div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={paginatedTools.length > 0 && paginatedTools.every((t) => selectedTools.has(t.slug))}
                          onChange={toggleAllOnPage}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left px-4 py-3 font-medium">Tool</th>
                      <th className="text-left px-4 py-3 font-medium">Engine</th>
                      <th className="text-left px-4 py-3 font-medium">Cluster</th>
                      <th className="text-center px-4 py-3 font-medium">Links</th>
                      <th className="text-center px-4 py-3 font-medium">Indexed</th>
                      <th className="text-center px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedTools.map((tool) => (
                      <tr key={tool.slug} className={`hover:bg-gray-50 ${selectedTools.has(tool.slug) ? "bg-orange-50" : ""}`}>
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedTools.has(tool.slug)}
                            onChange={() => toggleToolSelection(tool.slug)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-gray-400">{tool.slug}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{tool.engineType}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={tool.clusterSlug || ""}
                            onChange={(e) => updateToolCluster(tool.slug, e.target.value)}
                            className="text-sm border rounded px-2 py-1 w-full max-w-[200px] bg-white"
                          >
                            <option value="">— None —</option>
                            {clusters.map((cluster) => (
                              <option key={cluster.pillarSlug} value={cluster.pillarSlug}>
                                {cluster.pillarTitle}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getLinkStatusIcon(tool.linkStatus.status)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleToolIndexed(tool.slug, tool.isIndexed)}
                            className="inline-flex"
                          >
                            {tool.isIndexed ? (
                              <Eye className="w-5 h-5 text-green-500" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-gray-300" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Link href={`/tools/${tool.slug}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "articles" && (
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              {articles.length} articles total
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Loading articles...</div>
            ) : articles.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No articles yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Import articles via JSON or generate as part of clusters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Article</th>
                      <th className="text-left px-4 py-3 font-medium">Cluster</th>
                      <th className="text-center px-4 py-3 font-medium">Words</th>
                      <th className="text-center px-4 py-3 font-medium">Health</th>
                      <th className="text-center px-4 py-3 font-medium">Indexed</th>
                      <th className="text-center px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{article.title}</div>
                          <div className="text-xs text-gray-400">{article.slug}</div>
                        </td>
                        <td className="px-4 py-3">
                          {article.cluster_title || article.cluster_slug ? (
                            <Badge variant="outline" className="max-w-[200px] truncate" title={article.cluster_title || article.cluster_slug || ""}>
                              {article.cluster_title || article.cluster_slug}
                            </Badge>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {article.word_count || 0}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            className={
                              article.health === "strong"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : article.health === "ok"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {article.health}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleArticleIndexed(article)}
                            className="inline-flex"
                          >
                            {article.is_indexed ? (
                              <Eye className="w-5 h-5 text-green-500" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-gray-300" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Link href={`/articles/${article.slug}`} target="_blank">
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "clusters" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {clusters.length} clusters total
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Loading clusters...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {clusters.map((cluster) => (
                  <Card key={cluster.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{cluster.pillarTitle}</CardTitle>
                        <Badge variant="outline">{cluster.engineId}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{cluster.toolCount} tools</span>
                        <span>{cluster.indexedCount} indexed</span>
                        <span>{cluster.articleCount} articles</span>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <Link href={`/admin/clusters/${cluster.pillarSlug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Manage Cluster
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "mbbs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{mbbs.length} MBBs total</p>
            </div>
            
            {mbbs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Layers className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No MBBs imported yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Import MBBs using the Import JSON button
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MBB</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cluster</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Words</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Health</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Indexed</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mbbs.map((mbb) => (
                      <tr key={mbb.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{mbb.title}</div>
                          <div className="text-xs text-gray-400">{mbb.slug}</div>
                        </td>
                        <td className="px-4 py-3">
                          {mbb.mbb_type ? (
                            <Badge variant="outline">{mbb.mbb_type}</Badge>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {mbb.cluster_title || mbb.cluster_slug ? (
                            <Badge variant="outline" className="max-w-[200px] truncate" title={mbb.cluster_title || mbb.cluster_slug || ""}>
                              {mbb.cluster_title || mbb.cluster_slug}
                            </Badge>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {mbb.word_count || 0}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            variant="outline"
                            className={
                              mbb.health === "strong"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : mbb.health === "ok"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {mbb.health}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleMbbIndexed(mbb)}
                            className="inline-flex"
                          >
                            {mbb.is_indexed ? (
                              <Eye className="w-5 h-5 text-green-500" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-gray-300" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Link href={`/mbb/${mbb.slug}`} target="_blank">
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function ContentManagerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ContentManagerInner />
    </Suspense>
  );
}
