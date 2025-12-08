"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  PlayCircle,
  Zap,
  ExternalLink,
  Eye,
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

interface PageData {
  id: string;
  url: string;
  type: string;
  last_health_score: number | null;
  is_ready_to_index: boolean;
  manual_review_passed: boolean;
  word_count: number | null;
  internal_links_out_count: number | null;
  issues: string[];
  needsManualReview?: boolean;
}

interface Stats {
  total: number;
  ready: number;
  needsReview: number;
  notReady: number;
}

export default function ReadyToIndexPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [pages, setPages] = useState<PageData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionResult, setActionResult] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadPages();
    }
  }, [isAuthenticated]);

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

  const loadPages = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/seo/unindexed-pages", {
        credentials: "include",
      });
      const data = await res.json();
      setPages(data.pages || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error("Load pages failed:", error);
    } finally {
      if (showLoading) setIsRefreshing(false);
    }
  };

  const runInspector = async () => {
    setIsInspecting(true);
    setActionResult(null);
    try {
      const res = await fetch("/api/admin/seo/ready-inspector", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setActionResult(
          `Inspector complete: ${data.summary.evaluated} evaluated, ${data.summary.readyCount} ready, ${data.summary.needsReviewCount} need review`
        );
        loadPages();
      } else {
        setActionResult(`Inspector failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Inspector failed:", error);
      setActionResult("Inspector failed: Network error");
    } finally {
      setIsInspecting(false);
    }
  };

  const indexReadyPages = async () => {
    if (!confirm("Index all ready pages? They will enter your sitemap.")) return;
    setIsIndexing(true);
    setActionResult(null);
    try {
      const res = await fetch("/api/admin/seo/index-ready", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setActionResult(`Indexed ${data.indexedCount} pages`);
        loadPages();
      } else {
        setActionResult(`Indexing failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Indexing failed:", error);
      setActionResult("Indexing failed: Network error");
    } finally {
      setIsIndexing(false);
    }
  };

  const toggleManualReview = async (page: PageData) => {
    try {
      const res = await fetch("/api/admin/seo/manual-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urlId: page.id,
          manualReviewPassed: !page.manual_review_passed,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        const newManualReviewPassed = !page.manual_review_passed;
        const newIsReady = data.isReadyToIndex;
        
        setPages(pages.map(p => 
          p.id === page.id 
            ? { 
                ...p, 
                manual_review_passed: newManualReviewPassed,
                is_ready_to_index: newIsReady,
                needsManualReview: !newManualReviewPassed && !newIsReady,
                issues: newManualReviewPassed ? p.issues.filter(i => !i.includes('visual review')) : [...p.issues, 'Awaiting manual visual review']
              }
            : p
        ));
        
        if (selectedPage?.id === page.id) {
          setSelectedPage({
            ...selectedPage,
            manual_review_passed: newManualReviewPassed,
            is_ready_to_index: newIsReady,
          });
        }
        
        loadPages();
      }
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  const getStatusBadge = (page: PageData) => {
    if (page.is_ready_to_index) {
      return <Badge className="bg-green-500 text-white">Ready</Badge>;
    }
    if (page.needsManualReview || (page.issues.length === 1 && page.issues[0].includes('visual review'))) {
      return <Badge className="bg-yellow-500 text-white">Needs Review</Badge>;
    }
    return <Badge className="bg-red-500 text-white">Not Ready</Badge>;
  };

  const filteredPages = pages.filter((page) => {
    if (search && !page.url.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filter === "ready") return page.is_ready_to_index;
    if (filter === "review") return page.needsManualReview || (page.issues.length === 1 && page.issues[0].includes('visual review'));
    if (filter === "not-ready") return !page.is_ready_to_index && !page.needsManualReview;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Ready to Index Inspector
              </h1>
              <p className="text-gray-600 mt-1">
                Review and publish pages that are ready for SEO indexing
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={runInspector}
                disabled={isInspecting}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isInspecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Inspecting...
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Run Inspector
                  </>
                )}
              </Button>
              <Button
                onClick={indexReadyPages}
                disabled={isIndexing || !stats?.ready}
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                {isIndexing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Indexing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Index All Ready ({stats?.ready || 0})
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => loadPages(true)}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>

        {actionResult && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              actionResult.includes("failed")
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {actionResult}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600">
                {stats?.total || 0}
              </div>
              <div className="text-sm text-gray-600">Total Unindexed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600">
                {stats?.ready || 0}
              </div>
              <div className="text-sm text-gray-600">Ready to Index</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-yellow-600">
                {stats?.needsReview || 0}
              </div>
              <div className="text-sm text-gray-600">Need Manual Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-600">
                {stats?.notReady || 0}
              </div>
              <div className="text-sm text-gray-600">Not Ready</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by URL..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {["all", "ready", "review", "not-ready"].map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className={filter === f ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {f === "all" && "All"}
                    {f === "ready" && "Ready"}
                    {f === "review" && "Needs Review"}
                    {f === "not-ready" && "Not Ready"}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">URL</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Score</th>
                    <th className="pb-3 font-medium">Words</th>
                    <th className="pb-3 font-medium">Links</th>
                    <th className="pb-3 font-medium">Manual Review</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No pages match your filter
                      </td>
                    </tr>
                  ) : (
                    filteredPages.map((page) => (
                      <tr
                        key={page.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedPage(page)}
                      >
                        <td className="py-3 pr-4">
                          <div className="font-medium text-gray-900 truncate max-w-[200px]">
                            {page.url}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="outline">{page.type}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`font-medium ${
                              (page.last_health_score || 0) >= 75
                                ? "text-green-600"
                                : (page.last_health_score || 0) >= 50
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {page.last_health_score ?? "-"}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          {page.word_count ?? "-"}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          {page.internal_links_out_count ?? "-"}
                        </td>
                        <td className="py-3 pr-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleManualReview(page);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              page.manual_review_passed
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {page.manual_review_passed ? (
                              <>
                                <CheckCircle className="inline h-3 w-3 mr-1" />
                                Passed
                              </>
                            ) : (
                              <>
                                <Eye className="inline h-3 w-3 mr-1" />
                                Pending
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3 pr-4">{getStatusBadge(page)}</td>
                        <td className="py-3">
                          <a
                            href={page.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <ExternalLink className="h-4 w-4" />
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

        <Dialog open={!!selectedPage} onOpenChange={() => setSelectedPage(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Page Details</DialogTitle>
            </DialogHeader>
            {selectedPage && (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">URL</div>
                  <div className="font-medium">{selectedPage.url}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium">{selectedPage.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Health Score</div>
                    <div className="font-medium">
                      {selectedPage.last_health_score ?? "No scan"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Word Count</div>
                    <div className="font-medium">
                      {selectedPage.word_count ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Internal Links</div>
                    <div className="font-medium">
                      {selectedPage.internal_links_out_count ?? "-"}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Status</div>
                  {getStatusBadge(selectedPage)}
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Issues</div>
                  {selectedPage.issues.length === 0 ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      No issues found
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {selectedPage.issues.map((issue, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <XCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => toggleManualReview(selectedPage)}
                    className="flex-1"
                  >
                    {selectedPage.manual_review_passed ? (
                      <>
                        <XCircle className="h-4 w-4 mr-2" />
                        Revoke Manual Review
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Reviewed
                      </>
                    )}
                  </Button>
                  <a
                    href={selectedPage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Page
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
