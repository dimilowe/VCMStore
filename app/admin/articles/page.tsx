"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ExternalLink,
  Filter,
  FileText,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cluster_slug: string;
  is_indexed: boolean;
  is_published: boolean;
  view_count: number;
  created_at: string;
}

export default function AdminArticlesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");

  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [filterCluster, setFilterCluster] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterIndexed, setFilterIndexed] = useState<string>("all");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadArticles();
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
      if (res.ok) {
        setPassword("");
        setIsAuthenticated(true);
      } else {
        alert("Invalid password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  const loadArticles = async () => {
    try {
      const res = await fetch("/api/admin/articles", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  const togglePublished = async (slug: string, currentValue: boolean) => {
    try {
      const action = currentValue ? "unpublish" : "publish";
      const res = await fetch("/api/admin/articles/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
        credentials: "include",
      });
      if (res.ok) {
        setArticles((prev) =>
          prev.map((a) => (a.slug === slug ? { ...a, is_published: !currentValue } : a))
        );
      }
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  const toggleIndexed = async (slug: string, currentValue: boolean) => {
    try {
      const action = currentValue ? "unindex" : "index";
      const res = await fetch("/api/admin/articles/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
        credentials: "include",
      });
      if (res.ok) {
        setArticles((prev) =>
          prev.map((a) => (a.slug === slug ? { ...a, is_indexed: !currentValue } : a))
        );
      }
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  const uniqueClusters = [...new Set(articles.map((a) => a.cluster_slug).filter(Boolean))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCluster = filterCluster === "all" || article.cluster_slug === filterCluster;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && article.is_published) ||
      (filterStatus === "draft" && !article.is_published);
    const matchesIndexed =
      filterIndexed === "all" ||
      (filterIndexed === "indexed" && article.is_indexed) ||
      (filterIndexed === "not-indexed" && !article.is_indexed);
    return matchesSearch && matchesCluster && matchesStatus && matchesIndexed;
  });

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-wide flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-500" />
              Articles Control Panel
            </h1>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-4 py-2 text-base">
              {articles.length} Articles
            </Badge>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              placeholder="Search by title or slug..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-5 h-5 text-gray-500" />

            <select
              className="border rounded px-3 py-2 bg-white text-sm"
              value={filterCluster}
              onChange={(e) => {
                setFilterCluster(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Clusters</option>
              {uniqueClusters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-3 py-2 bg-white text-sm"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <select
              className="border rounded px-3 py-2 bg-white text-sm"
              value={filterIndexed}
              onChange={(e) => {
                setFilterIndexed(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Indexed</option>
              <option value="indexed">Indexed Only</option>
              <option value="not-indexed">Not Indexed</option>
            </select>

            <span className="text-sm text-gray-500 ml-auto">
              Showing {filteredArticles.length} of {articles.length} articles
            </span>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Title</th>
                    <th className="text-left p-4 font-medium text-gray-600">Cluster</th>
                    <th className="text-center p-4 font-medium text-gray-600">Status</th>
                    <th className="text-center p-4 font-medium text-gray-600">Indexed</th>
                    <th className="text-center p-4 font-medium text-gray-600">Views</th>
                    <th className="text-center p-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArticles.map((article) => (
                    <tr key={article.slug} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-gray-900">{article.title.replace(/^"|"$/g, '')}</div>
                          <div className="text-sm text-gray-500">{article.slug}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Link href={`/clusters/${article.cluster_slug}`} target="_blank">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors">
                            {article.cluster_slug}
                          </Badge>
                        </Link>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => togglePublished(article.slug, article.is_published)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            article.is_published
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {article.is_published ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Published
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleIndexed(article.slug, article.is_indexed)}
                          className={`p-2 rounded-full transition-colors ${
                            article.is_indexed
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                          title={article.is_indexed ? "Remove from index" : "Add to index"}
                        >
                          {article.is_indexed ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-center text-sm text-gray-600">
                        {article.view_count || 0}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 rounded text-sm text-orange-700 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Preview
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 mt-6 border-t">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredArticles.length)} of{" "}
              {filteredArticles.length} articles
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
