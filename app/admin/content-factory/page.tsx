"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  LayoutGrid,
  FileText,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface RecentCluster {
  id: string;
  pillarSlug: string;
  pillarTitle: string;
  engineId: string;
  toolCount: number;
  indexedCount: number;
  articleCount: number;
}

type TabType = "overview" | "clusters" | "engines";

export default function ContentFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [clusters, setClusters] = useState<RecentCluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClusters();
  }, []);

  const loadClusters = async () => {
    try {
      const res = await fetch("/api/admin/tools/clusters", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setClusters(data.clusters || []);
      }
    } catch (error) {
      console.error("Failed to load clusters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalTools = clusters.reduce((sum, c) => sum + c.toolCount, 0);
  const totalArticles = clusters.reduce((sum, c) => sum + c.articleCount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" />
              Content Factory
            </h1>
            <p className="text-gray-500 mt-1">
              Create clusters, generate tools, and build article shells
            </p>
          </div>
        </div>

        <div className="flex gap-2 border-b">
          {[
            { id: "overview", label: "Overview", icon: Zap },
            { id: "clusters", label: "Create Cluster", icon: LayoutGrid },
            { id: "engines", label: "Engines", icon: Sparkles },
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
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Clusters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{clusters.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalTools}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Article Shells</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalArticles}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  Recent Clusters
                </CardTitle>
                <CardDescription>
                  Your most recent cluster creations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-gray-400">Loading...</div>
                ) : clusters.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No clusters created yet</p>
                    <Button
                      onClick={() => setActiveTab("clusters")}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Create Your First Cluster
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {clusters.slice(0, 5).map((cluster) => (
                      <Link
                        key={cluster.id}
                        href={`/admin/clusters/${cluster.pillarSlug}`}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <LayoutGrid className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-medium">{cluster.pillarTitle}</div>
                            <div className="text-sm text-gray-500">
                              {cluster.toolCount} tools • {cluster.articleCount} articles
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{cluster.engineId}</Badge>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-orange-200 bg-orange-50/50">
              <CardContent className="py-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Create a New Cluster</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Generate tools, pillar pages, and article shells from a keyword universe
                    </p>
                  </div>
                  <Button
                    onClick={() => setActiveTab("clusters")}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Creating
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "clusters" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cluster Generator</CardTitle>
                <CardDescription>
                  Use the keyword universe prompt to generate a complete cluster with tools, pillar pages, and article shells
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-50 border">
                    <h4 className="font-medium mb-2">How it works:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Choose an engine type (calculator, image-resizer, ai-analysis, etc.)</li>
                      <li>Define your keyword matrix (segments × modifiers)</li>
                      <li>System auto-generates tool pages, pillar page, and article shells</li>
                      <li>Review content in Content Manager</li>
                      <li>Approve for indexing in SEO Control</li>
                    </ol>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/admin/clusters">
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        Open Cluster Control
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {clusters.map((cluster) => (
                <Card key={cluster.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{cluster.pillarTitle}</CardTitle>
                        <CardDescription>{cluster.pillarSlug}</CardDescription>
                      </div>
                      <Badge variant="outline">{cluster.engineId}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span>{cluster.toolCount} tools</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span>{cluster.articleCount} articles</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{cluster.indexedCount} indexed</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Link href={`/admin/clusters/${cluster.pillarSlug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Cluster
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "engines" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Engine Library</CardTitle>
                <CardDescription>
                  Reusable engines that power your tools. Each engine can generate hundreds of tool variations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-50 border">
                    <h4 className="font-medium mb-2">Available Engines:</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {["calculator", "platform-resizer", "ai-analysis", "image-compress", "standalone"].map((engine) => (
                        <div key={engine} className="flex items-center gap-2 p-2 rounded border bg-white">
                          <Sparkles className="w-4 h-4 text-orange-500" />
                          <span className="font-mono">{engine}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href="/admin/engines">
                    <Button variant="outline">
                      <Zap className="w-4 h-4 mr-2" />
                      Manage Engines
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
