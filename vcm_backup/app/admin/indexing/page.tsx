"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Check,
  X,
  ExternalLink,
  Globe,
  FileText,
  Wrench,
  Lightbulb,
  ShoppingBag,
  Newspaper,
  HelpCircle,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  Edit,
  Save,
} from "lucide-react";

interface GlobalUrl {
  id: string;
  url: string;
  title: string | null;
  type: string;
  is_indexed: boolean;
  canonical: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  indexed: number;
  not_indexed: number;
  tools: number;
  static: number;
  products: number;
  ideas: number;
  blog: number;
  articles: number;
}

const TYPE_OPTIONS = [
  "renderer",
  "static",
  "legacy",
  "product",
  "idea",
  "tool",
  "custom",
  "article",
  "blog",
  "answer",
  "unknown",
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "tool":
      return <Wrench className="h-4 w-4" />;
    case "idea":
      return <Lightbulb className="h-4 w-4" />;
    case "product":
      return <ShoppingBag className="h-4 w-4" />;
    case "blog":
    case "article":
      return <Newspaper className="h-4 w-4" />;
    case "answer":
      return <HelpCircle className="h-4 w-4" />;
    case "static":
      return <FileText className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case "tool":
      return "bg-orange-100 text-orange-700";
    case "idea":
      return "bg-yellow-100 text-yellow-700";
    case "product":
      return "bg-purple-100 text-purple-700";
    case "blog":
      return "bg-blue-100 text-blue-700";
    case "article":
      return "bg-cyan-100 text-cyan-700";
    case "answer":
      return "bg-green-100 text-green-700";
    case "static":
      return "bg-gray-100 text-gray-700";
    case "legacy":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function AdminIndexingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");

  const [urls, setUrls] = useState<GlobalUrl[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterIndexed, setFilterIndexed] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<GlobalUrl>>({});
  const [isDiscovering, setIsDiscovering] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadUrls();
    }
  }, [isAuthenticated, filterType, filterIndexed]);

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

  const loadUrls = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (filterType !== "all") params.set("type", filterType);
      if (filterIndexed !== "all") params.set("indexed", filterIndexed);

      const res = await fetch(`/api/global-urls?${params}`, {
        credentials: "include",
      });
      const data = await res.json();
      setUrls(data.urls || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error("Load failed:", error);
    }
  };

  const handleDiscover = async () => {
    setIsDiscovering(true);
    try {
      const res = await fetch("/api/global-urls/discover", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        alert(`Discovery complete!\nFound: ${data.discovered}\nNew: ${data.inserted}\nExisting: ${data.existing}`);
        loadUrls();
      } else {
        alert("Discovery failed");
      }
    } catch (error) {
      console.error("Discovery failed:", error);
      alert("Discovery failed");
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleToggleIndexed = async (url: GlobalUrl) => {
    try {
      await fetch("/api/global-urls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: url.id,
          title: url.title,
          type: url.type,
          is_indexed: !url.is_indexed,
          canonical: url.canonical,
          notes: url.notes,
        }),
      });
      loadUrls();
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.size === 0) {
      alert("Select URLs first");
      return;
    }

    if (action === "delete" && !confirm(`Delete ${selectedIds.size} URLs?`)) {
      return;
    }

    try {
      await fetch("/api/global-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          action,
          ids: Array.from(selectedIds),
        }),
      });
      setSelectedIds(new Set());
      loadUrls();
    } catch (error) {
      console.error("Bulk action failed:", error);
    }
  };

  const handleEdit = (url: GlobalUrl) => {
    setEditingId(url.id);
    setEditForm({
      title: url.title || "",
      type: url.type,
      canonical: url.canonical || "",
      notes: url.notes || "",
    });
  };

  const handleSaveEdit = async (url: GlobalUrl) => {
    try {
      await fetch("/api/global-urls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: url.id,
          title: editForm.title,
          type: editForm.type,
          is_indexed: url.is_indexed,
          canonical: editForm.canonical,
          notes: editForm.notes,
        }),
      });
      setEditingId(null);
      loadUrls();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === urls.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(urls.map((u) => u.id)));
    }
  };

  const filteredUrls = urls.filter((url) =>
    url.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (url.title && url.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Global URL Registry</h1>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-500">Total URLs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{stats.indexed}</div>
                <div className="text-sm text-gray-500">Indexed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{stats.not_indexed}</div>
                <div className="text-sm text-gray-500">Not Indexed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.tools}</div>
                <div className="text-sm text-gray-500">Tools</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.blog + stats.articles}</div>
                <div className="text-sm text-gray-500">Content</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search URLs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={filterIndexed}
                onChange={(e) => setFilterIndexed(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="indexed">Indexed Only</option>
                <option value="not_indexed">Not Indexed</option>
              </select>

              <Button onClick={() => loadUrls()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <Button
                onClick={handleDiscover}
                disabled={isDiscovering}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isDiscovering ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Discover URLs
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {selectedIds.size > 0 && (
          <Card className="mb-4 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{selectedIds.size} selected</span>
                <Button
                  size="sm"
                  onClick={() => handleBulkAction("index_on")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Index On
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBulkAction("index_off")}
                  variant="outline"
                >
                  <EyeOff className="h-4 w-4 mr-1" />
                  Index Off
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBulkAction("delete")}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedIds(new Set())}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === urls.length && urls.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">URL</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="p-3 text-center text-sm font-medium text-gray-600">Indexed</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">Notes</th>
                  <th className="p-3 text-center text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUrls.map((url) => (
                  <tr key={url.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(url.id)}
                        onChange={() => {
                          const newSelected = new Set(selectedIds);
                          if (newSelected.has(url.id)) {
                            newSelected.delete(url.id);
                          } else {
                            newSelected.add(url.id);
                          }
                          setSelectedIds(newSelected);
                        }}
                        className="rounded"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded max-w-xs truncate">
                          {url.url}
                        </code>
                        <a
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-orange-500"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                    <td className="p-3">
                      {editingId === url.id ? (
                        <Input
                          value={editForm.title || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                          className="h-8 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-gray-700">
                          {url.title || "-"}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {editingId === url.id ? (
                        <select
                          value={editForm.type}
                          onChange={(e) =>
                            setEditForm({ ...editForm, type: e.target.value })
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {TYPE_OPTIONS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Badge
                          className={`${getTypeBadgeColor(url.type)} flex items-center gap-1 w-fit`}
                        >
                          {getTypeIcon(url.type)}
                          {url.type}
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggleIndexed(url)}
                        className={`p-2 rounded-full transition-colors ${
                          url.is_indexed
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {url.is_indexed ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-3">
                      {editingId === url.id ? (
                        <Input
                          value={editForm.notes || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, notes: e.target.value })
                          }
                          placeholder="Add notes..."
                          className="h-8 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-gray-500 truncate max-w-xs block">
                          {url.notes || "-"}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {editingId === url.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(url)}
                            className="bg-green-500 hover:bg-green-600 h-8"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                            className="h-8"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(url)}
                          className="h-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUrls.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No URLs found. Click "Discover URLs" to scan your app.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
