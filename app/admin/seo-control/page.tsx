"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
  Zap,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface UrlEntry {
  id: string;
  url: string;
  type: string;
  title: string | null;
  is_indexed: boolean;
  canonical: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

type UrlKind = "cms-tool" | "cms-article" | "cms-pillar" | "cms-product" | "system" | "legacy";
type UrlStatus = "Ready" | "Needs Links" | "Needs Review" | "Legacy" | "System";

interface EnrichedUrlRow {
  id: string;
  url: string;
  kind: UrlKind;
  status: UrlStatus;
  isIndexed: boolean;
  cmsId: string | null;
  cmsType: string | null;
  clusterSlug: string | null;
  engine: string | null;
  linksInbound: number;
  linksOutbound: number;
  expectedLinks: number | null;
  seoScore: number | null;
}

interface RegistrySummary {
  total: number;
  indexed: number;
  byKind: Record<string, number>;
  byStatus: Record<string, number>;
}

interface SeoSnapshot {
  id: string;
  url: string;
  status_code: number;
  overall_score: number;
  is_thin_content: boolean;
  has_h1: boolean;
  has_meta_description: boolean;
  word_count: number;
  issues: string[];
  page_type: string;
}

interface ReadyPage {
  id: string;
  url: string;
  type: string;
  page_type?: string;
  last_health_score: number | null;
  is_ready_to_index: boolean;
  word_count: number | null;
  internal_links: number;
  expected_links: number | null;
  issues: string[];
  status: 'Ready' | 'Needs Links' | 'Needs Review' | 'Legacy';
  clusterId: string | null;
  classification: {
    isLegacyTool: boolean;
    isCmsTool: boolean;
    isCmsArticle: boolean;
    isPillar: boolean;
    isOtherCms: boolean;
  };
}

type TabType = "overview" | "health" | "ready" | "registry";

export default function SeoControlPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [snapshots, setSnapshots] = useState<SeoSnapshot[]>([]);
  const [readyPages, setReadyPages] = useState<ReadyPage[]>([]);
  const [expectedLinks, setExpectedLinks] = useState<Record<string, number>>({});
  const [legacyTools, setLegacyTools] = useState<string[]>([]);
  const [enrichedRegistry, setEnrichedRegistry] = useState<EnrichedUrlRow[]>([]);
  const [registrySummary, setRegistrySummary] = useState<RegistrySummary | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterKind, setFilterKind] = useState("all");
  const [filterRegistryStatus, setFilterRegistryStatus] = useState("all");
  const [registryPage, setRegistryPage] = useState(1);
  const REGISTRY_PER_PAGE = 100;
  
  // SEO Health tab state
  const [healthSearch, setHealthSearch] = useState("");
  const [healthTypeFilter, setHealthTypeFilter] = useState("all");
  const [healthPage, setHealthPage] = useState(1);
  const HEALTH_PER_PAGE = 50;
  
  // Ready to Index tab state
  const [readySearch, setReadySearch] = useState("");
  const [readyStatusFilter, setReadyStatusFilter] = useState("all");
  const [readyPage, setReadyPage] = useState(1);
  const READY_PER_PAGE = 50;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [urlsRes, snapshotsRes, readyRes, expectedRes, enrichedRes] = await Promise.all([
        fetch("/api/global-urls", { credentials: "include" }),
        fetch("/api/admin/seo/snapshots", { credentials: "include" }),
        fetch("/api/admin/seo/unindexed-pages", { credentials: "include" }),
        fetch("/api/admin/seo/expected-links", { credentials: "include" }),
        fetch("/api/admin/seo/url-registry/enriched", { credentials: "include" }),
      ]);

      if (urlsRes.ok) {
        const data = await urlsRes.json();
        setUrls(data.urls || []);
      }
      if (snapshotsRes.ok) {
        const data = await snapshotsRes.json();
        setSnapshots(data.snapshots || []);
      }
      if (readyRes.ok) {
        const data = await readyRes.json();
        setReadyPages(data.pages || []);
      }
      if (expectedRes.ok) {
        const data = await expectedRes.json();
        setExpectedLinks(data.expectedLinks || {});
        setLegacyTools(data.legacyTools || []);
      }
      if (enrichedRes.ok) {
        const data = await enrichedRes.json();
        setEnrichedRegistry(data.rows || []);
        setRegistrySummary(data.summary || null);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/admin/seo/scan", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        await loadData();
      }
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleInspect = async () => {
    setIsInspecting(true);
    try {
      const res = await fetch("/api/admin/seo/ready-inspector", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        await loadData();
      }
    } catch (error) {
      console.error("Inspect failed:", error);
    } finally {
      setIsInspecting(false);
    }
  };

  const toggleIndexing = async (urlEntry: UrlEntry) => {
    try {
      const res = await fetch("/api/global-urls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: urlEntry.id,
          is_indexed: !urlEntry.is_indexed,
        }),
      });
      if (res.ok) {
        setUrls((prev) =>
          prev.map((u) => (u.url === urlEntry.url ? { ...u, is_indexed: !urlEntry.is_indexed } : u))
        );
        setEnrichedRegistry((prev) =>
          prev.map((r) => (r.id === urlEntry.id ? { ...r, isIndexed: !r.isIndexed } : r))
        );
      }
    } catch (error) {
      console.error("Failed to toggle indexing:", error);
    }
  };

  const toggleEnrichedIndexing = async (row: EnrichedUrlRow) => {
    try {
      const res = await fetch("/api/global-urls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: row.id,
          is_indexed: !row.isIndexed,
        }),
      });
      if (res.ok) {
        setEnrichedRegistry((prev) =>
          prev.map((r) => (r.id === row.id ? { ...r, isIndexed: !r.isIndexed } : r))
        );
        setUrls((prev) =>
          prev.map((u) => (u.id === row.id ? { ...u, is_indexed: !row.isIndexed } : u))
        );
      }
    } catch (error) {
      console.error("Failed to toggle indexing:", error);
    }
  };

  const getKindBadgeStyle = (kind: UrlKind) => {
    switch (kind) {
      case "cms-tool": return "bg-blue-100 text-blue-700";
      case "cms-article": return "bg-purple-100 text-purple-700";
      case "cms-pillar": return "bg-indigo-100 text-indigo-700";
      case "cms-product": return "bg-green-100 text-green-700";
      case "system": return "bg-gray-100 text-gray-600";
      case "legacy": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getKindLabel = (kind: UrlKind) => {
    switch (kind) {
      case "cms-tool": return "CMS Tool";
      case "cms-article": return "Article";
      case "cms-pillar": return "Pillar";
      case "cms-product": return "Product";
      case "system": return "System";
      case "legacy": return "Legacy";
      default: return kind;
    }
  };

  const getStatusPillStyle = (status: UrlStatus) => {
    switch (status) {
      case "Ready": return "bg-green-100 text-green-700";
      case "Needs Links": return "bg-orange-100 text-orange-700";
      case "Needs Review": return "bg-yellow-100 text-yellow-700";
      case "Legacy": return "bg-red-100 text-red-700";
      case "System": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const indexedCount = urls.filter((u) => u.is_indexed).length;
  const healthyCount = snapshots.filter((s) => s.overall_score >= 80).length;
  const readyCount = readyPages.filter((p) => p.status === "Ready").length;
  const needsLinksCount = readyPages.filter((p) => p.status === "Needs Links").length;
  const needsReviewCount = readyPages.filter((p) => p.status === "Needs Review").length;
  const legacyCount = readyPages.filter((p) => p.status === "Legacy").length;
  const criticalCount = snapshots.filter((s) => s.overall_score < 50).length;

  const filteredUrls = urls.filter((url) => {
    const matchesSearch = url.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || url.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "indexed" && url.is_indexed) ||
      (filterStatus === "not-indexed" && !url.is_indexed);
    return matchesSearch && matchesType && matchesStatus;
  });

  const pageTypes = [...new Set(urls.map((u) => u.type))];
  const snapshotPageTypes = [...new Set(snapshots.map((s) => s.page_type))];
  
  // Filter snapshots for SEO Health tab
  const filteredSnapshots = snapshots.filter((snapshot) => {
    const cleanUrl = snapshot.url.replace("http://localhost:5000", "");
    const matchesSearch = cleanUrl.toLowerCase().includes(healthSearch.toLowerCase());
    const matchesType = healthTypeFilter === "all" || snapshot.page_type === healthTypeFilter;
    return matchesSearch && matchesType;
  });
  const totalHealthPages = Math.ceil(filteredSnapshots.length / HEALTH_PER_PAGE);
  const paginatedSnapshots = filteredSnapshots.slice(
    (healthPage - 1) * HEALTH_PER_PAGE,
    healthPage * HEALTH_PER_PAGE
  );
  
  // Filter readyPages for Ready to Index tab
  const filteredReadyPages = readyPages.filter((page) => {
    const cleanUrl = page.url.replace("http://localhost:5000", "");
    const matchesSearch = cleanUrl.toLowerCase().includes(readySearch.toLowerCase());
    
    const matchesStatus = 
      readyStatusFilter === "all" ||
      (readyStatusFilter === "ready" && page.status === "Ready") ||
      (readyStatusFilter === "needs-links" && page.status === "Needs Links") ||
      (readyStatusFilter === "needs-review" && page.status === "Needs Review") ||
      (readyStatusFilter === "legacy" && page.status === "Legacy");
    return matchesSearch && matchesStatus;
  });
  const totalReadyPages = Math.ceil(filteredReadyPages.length / READY_PER_PAGE);
  const paginatedReadyPages = filteredReadyPages.slice(
    (readyPage - 1) * READY_PER_PAGE,
    readyPage * READY_PER_PAGE
  );

  const filteredEnrichedRegistry = enrichedRegistry.filter((row) => {
    const matchesSearch = row.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.clusterSlug && row.clusterSlug.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesKind = filterKind === "all" || row.kind === filterKind;
    const matchesStatus = filterRegistryStatus === "all" || row.status === filterRegistryStatus;
    return matchesSearch && matchesKind && matchesStatus;
  });
  const totalRegistryPages = Math.ceil(filteredEnrichedRegistry.length / REGISTRY_PER_PAGE);
  const paginatedEnrichedRegistry = filteredEnrichedRegistry.slice(
    (registryPage - 1) * REGISTRY_PER_PAGE,
    registryPage * REGISTRY_PER_PAGE
  );

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-400";
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number | null) => {
    if (score === null) return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (score >= 50) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="w-6 h-6 text-orange-500" />
            SEO Control Center
          </h1>
          <p className="text-gray-500 mt-1">
            Check health, approve for indexing, and manage your sitemap
          </p>
        </div>

        <div className="flex gap-2 border-b">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "health", label: "SEO Health", icon: Activity },
            { id: "ready", label: "Ready to Index", icon: Zap },
            { id: "registry", label: "URL Registry", icon: Globe },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
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

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total URLs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{urls.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Indexed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{indexedCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Ready to Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{readyCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Critical Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{criticalCount}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("health")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    SEO Health
                  </CardTitle>
                  <CardDescription>
                    Scan pages for SEO issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{snapshots.length} pages scanned</span>
                    <Badge variant={healthyCount > 0 ? "default" : "secondary"}>
                      {healthyCount} healthy
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("ready")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    Ready to Index
                  </CardTitle>
                  <CardDescription>
                    Pages that pass quality checks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{readyPages.length} pages checked</span>
                    <Badge variant="default" className="bg-green-500">
                      {readyCount} ready
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("registry")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-500" />
                    URL Registry
                  </CardTitle>
                  <CardDescription>
                    Control sitemap indexing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{urls.length} total URLs</span>
                    <Badge variant="outline">
                      {indexedCount} in sitemap
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Publishing Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-4 rounded-lg bg-gray-50 text-center">
                    <div className="text-2xl font-bold mb-1">{snapshots.length}</div>
                    <div className="text-sm text-gray-500">Pages Scanned</div>
                  </div>
                  <div className="text-gray-300">→</div>
                  <div className="flex-1 p-4 rounded-lg bg-blue-50 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{readyCount}</div>
                    <div className="text-sm text-gray-500">Ready to Index</div>
                  </div>
                  <div className="text-gray-300">→</div>
                  <div className="flex-1 p-4 rounded-lg bg-green-50 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{indexedCount}</div>
                    <div className="text-sm text-gray-500">In Sitemap</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "health" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search URLs..."
                  value={healthSearch}
                  onChange={(e) => { setHealthSearch(e.target.value); setHealthPage(1); }}
                  className="pl-10"
                />
              </div>
              <select
                value={healthTypeFilter}
                onChange={(e) => { setHealthTypeFilter(e.target.value); setHealthPage(1); }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                {snapshotPageTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? "animate-spin" : ""}`} />
                {isScanning ? "Scanning..." : "Run Full Scan"}
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {filteredSnapshots.length} pages with health data
            </p>

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : snapshots.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Activity className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No health data yet</p>
                  <Button
                    onClick={handleScan}
                    className="mt-4 bg-orange-500 hover:bg-orange-600"
                  >
                    Run First Scan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">URL</th>
                      <th className="text-left px-4 py-3 font-medium">Type</th>
                      <th className="text-center px-4 py-3 font-medium">H1</th>
                      <th className="text-center px-4 py-3 font-medium">Score</th>
                      <th className="text-center px-4 py-3 font-medium">Words</th>
                      <th className="text-center px-4 py-3 font-medium">Links</th>
                      <th className="text-left px-4 py-3 font-medium">Issues</th>
                      <th className="text-center px-4 py-3 font-medium w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedSnapshots.map((snapshot) => (
                      <tr key={snapshot.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="font-medium">{snapshot.url.replace('http://localhost:5000', '')}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{snapshot.page_type}</Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {snapshot.has_h1 ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${getScoreColor(snapshot.overall_score)}`}>
                            {snapshot.overall_score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {snapshot.word_count}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {(snapshot as any).internal_links ?? '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {!snapshot.has_h1 && (
                              <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">NO H1</span>
                            )}
                            {!snapshot.has_meta_description && (
                              <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">NO META</span>
                            )}
                            {snapshot.is_thin_content && (
                              <span className="px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700">THIN</span>
                            )}
                            {snapshot.issues.includes('Missing schema markup') && (
                              <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">NO SCHEMA</span>
                            )}
                            {snapshot.status_code !== 200 && (
                              <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">{snapshot.status_code}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <a href={snapshot.url.replace("http://localhost:5000", "")} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalHealthPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-gray-500">
                  Page {healthPage} of {totalHealthPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setHealthPage((p) => Math.max(1, p - 1))}
                    disabled={healthPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setHealthPage((p) => Math.min(totalHealthPages, p + 1))}
                    disabled={healthPage === totalHealthPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "ready" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search URLs..."
                  value={readySearch}
                  onChange={(e) => { setReadySearch(e.target.value); setReadyPage(1); }}
                  className="pl-10"
                />
              </div>
              <select
                value={readyStatusFilter}
                onChange={(e) => { setReadyStatusFilter(e.target.value); setReadyPage(1); }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="ready">Ready</option>
                <option value="needs-links">Needs Links</option>
                <option value="needs-review">Needs Review</option>
                <option value="legacy">Legacy</option>
              </select>
              <Button
                onClick={handleInspect}
                disabled={isInspecting}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isInspecting ? "animate-spin" : ""}`} />
                {isInspecting ? "Inspecting..." : "Run Inspection"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-green-600 font-medium">{readyCount} Ready</span>
              <span className="text-blue-600 font-medium">{needsLinksCount} Needs Links</span>
              <span className="text-yellow-600 font-medium">{needsReviewCount} Needs Review</span>
              <span className="text-gray-500">{legacyCount} Legacy</span>
              <span className="text-gray-400 ml-auto">{readyPages.length} total pages</span>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : readyPages.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Zap className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No pages inspected yet</p>
                  <Button
                    onClick={handleInspect}
                    className="mt-4 bg-orange-500 hover:bg-orange-600"
                  >
                    Run First Inspection
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">URL</th>
                      <th className="text-left px-4 py-3 font-medium">Type</th>
                      <th className="text-center px-4 py-3 font-medium">Score</th>
                      <th className="text-center px-4 py-3 font-medium">Words</th>
                      <th className="text-center px-4 py-3 font-medium">Links</th>
                      <th className="text-center px-4 py-3 font-medium">Expected</th>
                      <th className="text-center px-4 py-3 font-medium">Status</th>
                      <th className="text-center px-4 py-3 font-medium">Indexed</th>
                      <th className="text-center px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedReadyPages.map((page) => {
                      const urlEntry = urls.find((u) => u.url === page.url);
                      const isIndexed = urlEntry?.is_indexed ?? false;
                      const score = page.last_health_score ?? 0;
                      const wordCount = page.word_count ?? 0;
                      const cleanUrl = page.url.replace("http://localhost:5000", "");
                      
                      const statusColors: Record<string, string> = {
                        Ready: "bg-green-100 text-green-700",
                        "Needs Links": "bg-blue-100 text-blue-700",
                        "Needs Review": "bg-yellow-100 text-yellow-700",
                        Legacy: "bg-gray-100 text-gray-500",
                      };
                      const statusColor = statusColors[page.status] || "bg-gray-100 text-gray-600";
                      
                      const linksMetStatus = page.expected_links !== null 
                        ? page.internal_links >= page.expected_links 
                        : page.internal_links >= 3;
                      
                      return (
                        <tr key={page.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium truncate max-w-xs" title={cleanUrl}>
                              {cleanUrl}
                            </div>
                            {page.clusterId && (
                              <div className="text-xs text-gray-400 mt-0.5">
                                Cluster: {page.clusterId}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-gray-500">{page.type || "static"}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-medium ${
                              score >= 80 ? "text-green-600" :
                              score >= 60 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {score || '-'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600">
                            {wordCount || '-'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-medium ${linksMetStatus ? "text-green-600" : "text-orange-600"}`}>
                              {page.internal_links}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {page.status === "Legacy" ? (
                              <span className="text-gray-400">-</span>
                            ) : page.expected_links !== null ? (
                              <span className="text-blue-600 font-medium">{page.expected_links}</span>
                            ) : (
                              <span className="text-gray-400">3</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 text-xs rounded ${statusColor}`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => urlEntry && toggleIndexing(urlEntry)}
                              className="inline-flex hover:opacity-70 transition-opacity cursor-pointer"
                              title={isIndexed ? "Click to remove from sitemap" : "Click to add to sitemap"}
                            >
                              {isIndexed ? (
                                <Eye className="w-5 h-5 text-green-500" />
                              ) : (
                                <EyeOff className="w-5 h-5 text-gray-400 hover:text-green-400" />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <a href={cleanUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {totalReadyPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-gray-500">
                  Page {readyPage} of {totalReadyPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReadyPage((p) => Math.max(1, p - 1))}
                    disabled={readyPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReadyPage((p) => Math.min(totalReadyPages, p + 1))}
                    disabled={readyPage === totalReadyPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "registry" && (
          <div className="space-y-4">
            {registrySummary && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold">{registrySummary.total}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{registrySummary.byKind["cms-tool"] || 0}</div>
                  <div className="text-xs text-blue-600">CMS Tools</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{registrySummary.byStatus["Ready"] || 0}</div>
                  <div className="text-xs text-green-600">Ready</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{registrySummary.byStatus["Needs Links"] || 0}</div>
                  <div className="text-xs text-orange-600">Needs Links</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{registrySummary.byStatus["Needs Review"] || 0}</div>
                  <div className="text-xs text-yellow-600">Needs Review</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{registrySummary.byStatus["Legacy"] || 0}</div>
                  <div className="text-xs text-red-600">Legacy</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search URLs or clusters..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setRegistryPage(1); }}
                  className="pl-10"
                />
              </div>
              <select
                value={filterKind}
                onChange={(e) => { setFilterKind(e.target.value); setRegistryPage(1); }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Kinds</option>
                <option value="cms-tool">CMS Tools</option>
                <option value="cms-article">Articles</option>
                <option value="cms-pillar">Pillars</option>
                <option value="cms-product">Products</option>
                <option value="system">System</option>
                <option value="legacy">Legacy</option>
              </select>
              <select
                value={filterRegistryStatus}
                onChange={(e) => { setFilterRegistryStatus(e.target.value); setRegistryPage(1); }}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Ready">Ready</option>
                <option value="Needs Links">Needs Links</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Legacy">Legacy</option>
                <option value="System">System</option>
              </select>
            </div>

            <div className="text-sm text-gray-500">
              {filteredEnrichedRegistry.length} URLs • {filteredEnrichedRegistry.filter((r) => r.isIndexed).length} indexed
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left px-3 py-3 font-medium">URL</th>
                        <th className="text-left px-3 py-3 font-medium">Kind</th>
                        <th className="text-left px-3 py-3 font-medium">Cluster</th>
                        <th className="text-left px-3 py-3 font-medium">Engine</th>
                        <th className="text-center px-3 py-3 font-medium">Links</th>
                        <th className="text-center px-3 py-3 font-medium">Expected</th>
                        <th className="text-center px-3 py-3 font-medium">Status</th>
                        <th className="text-center px-3 py-3 font-medium">Indexed</th>
                        <th className="text-center px-3 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {paginatedEnrichedRegistry.map((row) => {
                        const linksMet = row.expectedLinks === null || row.linksOutbound >= row.expectedLinks;
                        const isLegacyWarning = row.kind === "legacy" && row.isIndexed;
                        return (
                          <tr key={row.id} className={`hover:bg-gray-50 ${isLegacyWarning ? "bg-red-50" : ""}`}>
                            <td className="px-3 py-3">
                              <div className="font-medium truncate max-w-[250px]">{row.url}</div>
                            </td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-1 rounded text-xs ${getKindBadgeStyle(row.kind)}`}>
                                {getKindLabel(row.kind)}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <span className="text-xs text-gray-500 truncate max-w-[100px] block">
                                {row.clusterSlug || "—"}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <span className="text-xs text-gray-500">
                                {row.engine || "—"}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className={`font-medium ${linksMet ? "text-green-600" : "text-orange-600"}`}>
                                {row.linksOutbound}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className="text-blue-600 font-medium">
                                {row.expectedLinks ?? "—"}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusPillStyle(row.status)}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <button
                                onClick={() => toggleEnrichedIndexing(row)}
                                disabled={row.kind === "system"}
                                className={`inline-flex ${row.kind === "system" ? "opacity-50 cursor-not-allowed" : "hover:opacity-70 cursor-pointer"}`}
                                title={row.kind === "system" ? "System pages cannot be toggled" : 
                                       row.kind === "legacy" && !row.isIndexed ? "Warning: This is a legacy page" :
                                       row.isIndexed ? "Click to remove from sitemap" : "Click to add to sitemap"}
                              >
                                {row.isIndexed ? (
                                  <Eye className={`w-5 h-5 ${isLegacyWarning ? "text-red-500" : "text-green-500"}`} />
                                ) : (
                                  <EyeOff className={`w-5 h-5 ${row.kind === "legacy" ? "text-red-300" : "text-gray-300"}`} />
                                )}
                              </button>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <a href={row.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {totalRegistryPages > 1 && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {(registryPage - 1) * REGISTRY_PER_PAGE + 1} - {Math.min(registryPage * REGISTRY_PER_PAGE, filteredEnrichedRegistry.length)} of {filteredEnrichedRegistry.length}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRegistryPage(p => Math.max(1, p - 1))}
                        disabled={registryPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRegistryPage(p => Math.min(totalRegistryPages, p + 1))}
                        disabled={registryPage >= totalRegistryPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
