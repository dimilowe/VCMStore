"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink,
  Trash2,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SeoSnapshot {
  id: string;
  slug: string;
  url: string;
  status_code: number;
  load_time_ms: number;
  has_title: boolean;
  has_h1: boolean;
  has_meta_description: boolean;
  word_count: number;
  robots_index: string;
  canonical_target: string | null;
  internal_links_out_count: number;
  is_thin_content: boolean;
  has_expected_schema: boolean;
  page_type: string;
  snapshot_date: string;
  overall_score: number;
  title_text: string | null;
  meta_description_text: string | null;
  h1_text: string | null;
  issues: string[];
}

interface Stats {
  total_pages: number;
  avg_score: number;
  critical_count: number;
  thin_count: number;
  broken_count: number;
  no_h1_count: number;
  no_meta_count: number;
  no_schema_count: number;
}

export default function SeoHealthPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [snapshots, setSnapshots] = useState<SeoSnapshot[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedSnapshot, setSelectedSnapshot] = useState<SeoSnapshot | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadSnapshots();
    }
  }, [isAuthenticated, filter, search]);

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
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  const loadSnapshots = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("filter", filter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/seo/snapshots?${params}`, {
        credentials: "include",
      });
      const data = await res.json();
      setSnapshots(data.snapshots || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error("Load snapshots failed:", error);
    }
  };

  const runScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    try {
      const res = await fetch("/api/admin/seo/scan", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setScanResult(`Scan complete: ${data.summary.successful} pages scanned, ${data.summary.failed} failed`);
        loadSnapshots();
      } else {
        setScanResult(`Scan failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Scan failed:", error);
      setScanResult("Scan failed: Network error");
    } finally {
      setIsScanning(false);
    }
  };

  const clearSnapshots = async () => {
    if (!confirm("Delete all SEO snapshots? This cannot be undone.")) return;
    try {
      await fetch("/api/admin/seo/snapshots", {
        method: "DELETE",
        credentials: "include",
      });
      loadSnapshots();
    } catch (error) {
      console.error("Clear failed:", error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">SEO Health Console</h1>
              <p className="text-gray-500 mt-1">Internal SEO health dashboard for VCM Suite pages</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={runScan}
                disabled={isScanning}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 mr-2" />
                    Run Scan
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={loadSnapshots}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={clearSnapshots}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {scanResult && (
          <div className={`mb-6 p-4 rounded-lg ${scanResult.includes("failed") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {scanResult}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {stats?.avg_score ? Math.round(Number(stats.avg_score)) : 0}
              </div>
              <div className="text-sm text-gray-500">Average Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats?.total_pages || 0}</div>
              <div className="text-sm text-gray-500">Pages Scanned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">{stats?.critical_count || 0}</div>
              <div className="text-sm text-gray-500">Critical Issues</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{stats?.thin_count || 0}</div>
              <div className="text-sm text-gray-500">Thin Content</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by slug or title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All" },
                  { key: "critical", label: "Critical" },
                  { key: "broken", label: "Broken" },
                  { key: "thin", label: "Thin" },
                  { key: "no_h1", label: "No H1" },
                  { key: "no_meta", label: "No Meta" },
                  { key: "no_schema", label: "No Schema" },
                ].map((f) => (
                  <Button
                    key={f.key}
                    variant={filter === f.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f.key)}
                    className={filter === f.key ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Slug</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Score</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Words</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Links</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Issues</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {snapshots.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        {stats?.total_pages === 0
                          ? "No snapshots yet. Click 'Run Scan' to analyze your indexed pages."
                          : "No pages match your filter."}
                      </td>
                    </tr>
                  ) : (
                    snapshots.map((snapshot) => (
                      <tr
                        key={snapshot.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedSnapshot(snapshot)}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-sm truncate max-w-xs">
                            {snapshot.slug}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">
                            {snapshot.page_type}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {snapshot.status_code === 200 ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-10 h-6 rounded text-xs font-bold ${getScoreColor(snapshot.overall_score)}`}
                          >
                            {snapshot.overall_score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {snapshot.word_count}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {snapshot.internal_links_out_count}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-1 flex-wrap">
                            {snapshot.is_thin_content && (
                              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                                THIN
                              </Badge>
                            )}
                            {!snapshot.has_h1 && (
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                NO H1
                              </Badge>
                            )}
                            {!snapshot.has_meta_description && (
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                NO META
                              </Badge>
                            )}
                            {!snapshot.has_expected_schema && (
                              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                NO SCHEMA
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <a
                            href={snapshot.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4 text-gray-400 hover:text-orange-500" />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedSnapshot} onOpenChange={() => setSelectedSnapshot(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedSnapshot && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {selectedSnapshot.slug}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl font-bold ${getScoreColor(selectedSnapshot.overall_score)} px-4 py-2 rounded-lg`}>
                      {selectedSnapshot.overall_score}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">SEO Health Score</div>
                      <div className="text-sm">
                        {selectedSnapshot.overall_score >= 80
                          ? "Good"
                          : selectedSnapshot.overall_score >= 60
                          ? "Needs Improvement"
                          : "Critical Issues"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">URL</div>
                      <a
                        href={selectedSnapshot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 hover:underline break-all"
                      >
                        {selectedSnapshot.url}
                      </a>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Page Type</div>
                      <Badge variant="outline">{selectedSnapshot.page_type}</Badge>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Status Code</div>
                      <span className={selectedSnapshot.status_code === 200 ? "text-green-600" : "text-red-600"}>
                        {selectedSnapshot.status_code || "Failed"}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Load Time</div>
                      {selectedSnapshot.load_time_ms}ms
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Word Count</div>
                      <span className={selectedSnapshot.is_thin_content ? "text-yellow-600" : ""}>
                        {selectedSnapshot.word_count} words
                        {selectedSnapshot.is_thin_content && " (thin)"}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Internal Links Out</div>
                      {selectedSnapshot.internal_links_out_count}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">SEO Elements</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        {selectedSnapshot.has_title ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mt-1" />
                        )}
                        <div>
                          <div className="text-sm font-medium">Title Tag</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            {selectedSnapshot.title_text || "Not found"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        {selectedSnapshot.has_h1 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mt-1" />
                        )}
                        <div>
                          <div className="text-sm font-medium">H1 Heading</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            {selectedSnapshot.h1_text || "Not found"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        {selectedSnapshot.has_meta_description ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mt-1" />
                        )}
                        <div>
                          <div className="text-sm font-medium">Meta Description</div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {selectedSnapshot.meta_description_text || "Not found"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        {selectedSnapshot.has_expected_schema ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-1" />
                        )}
                        <div>
                          <div className="text-sm font-medium">Structured Data (JSON-LD)</div>
                          <div className="text-sm text-gray-500">
                            {selectedSnapshot.has_expected_schema ? "Found" : "Not found"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        {selectedSnapshot.robots_index === "index" ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        ) : selectedSnapshot.robots_index === "noindex" ? (
                          <XCircle className="h-4 w-4 text-red-500 mt-1" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
                        )}
                        <div>
                          <div className="text-sm font-medium">Robots Meta</div>
                          <div className="text-sm text-gray-500">{selectedSnapshot.robots_index}</div>
                        </div>
                      </div>
                      {selectedSnapshot.canonical_target && (
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                          <div>
                            <div className="text-sm font-medium">Canonical URL</div>
                            <div className="text-sm text-gray-500 truncate max-w-md">
                              {selectedSnapshot.canonical_target}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedSnapshot.issues && selectedSnapshot.issues.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        Issues Found
                      </h3>
                      <ul className="space-y-2">
                        {(Array.isArray(selectedSnapshot.issues)
                          ? selectedSnapshot.issues
                          : JSON.parse(selectedSnapshot.issues as unknown as string)
                        ).map((issue: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-xs text-gray-400">
                    Last scanned: {new Date(selectedSnapshot.snapshot_date).toLocaleString()}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
