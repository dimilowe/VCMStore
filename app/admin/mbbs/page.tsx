"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ExternalLink, Footprints, FileText, Layers, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface MBBTool {
  id: string;
  name: string;
  description: string;
  targetKeyword: string;
  mainUrl: string;
  supportingArticles: {
    title: string;
    url: string;
  }[];
  dateAdded: string;
  category: string;
}

const MBB_TOOLS: MBBTool[] = [
  {
    id: "calorie-counter-walking",
    name: "Calorie Counter Walking",
    description: "Walking calorie calculator using MET-based formulas. Includes duration, weight, and intensity inputs with SEO content.",
    targetKeyword: "calorie counter walking",
    mainUrl: "/tools/calorie-counter-walking",
    supportingArticles: [
      { title: "Steps vs Calories: How Walking Translates Into Calorie Burn", url: "/articles/steps-vs-calories-walking" },
      { title: "Walking for Fat Loss: How Many Calories Do You Really Burn?", url: "/articles/walking-for-fat-loss" },
    ],
    dateAdded: "2024-12-04",
    category: "Fitness",
  },
  {
    id: "calorie-counter-maintenance",
    name: "Calorie Counter Maintenance",
    description: "TDEE/Maintenance calorie calculator using Mifflin-St Jeor formula. Calculates BMR, maintenance calories, and deficit/surplus suggestions.",
    targetKeyword: "calorie counter maintenance",
    mainUrl: "/tools/calorie-counter-maintenance",
    supportingArticles: [
      { title: "What Are Maintenance Calories and Why Do They Matter?", url: "/articles/what-are-maintenance-calories" },
      { title: "Maintenance vs Deficit vs Surplus: Which Is Right for Your Goal?", url: "/articles/maintenance-vs-deficit-vs-surplus" },
    ],
    dateAdded: "2024-12-04",
    category: "Fitness",
  },
];

const ITEMS_PER_PAGE = 5;

export default function MBBsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check", {
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.isAdmin) {
        router.push("/admin");
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTools = MBB_TOOLS.filter(tool => {
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.targetKeyword.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTools = filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Layers className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-wide">Manage MBBs</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Micro-Blog Businesses (MBBs) are standalone SEO tools that drive traffic to VCM Suite without appearing in the main navigation or homepage.
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">What are MBBs?</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Hidden from public navigation</strong> - Not in navbar Resources dropdown or homepage carousel</li>
            <li>• <strong>SEO-focused</strong> - Each targets a specific keyword phrase for organic search traffic</li>
            <li>• <strong>Full branding</strong> - Maintains VCM Suite look and feel with all monetization components</li>
            <li>• <strong>Topical depth</strong> - Includes supporting articles for better SEO authority</li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              placeholder="Search MBBs by name, keyword, or category..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Found {filteredTools.length} MBB{filteredTools.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All MBB Tools ({filteredTools.length})</h2>
        </div>

        <div className="space-y-6">
          {paginatedTools.map((tool) => (
            <Card key={tool.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-orange-500 text-white">{tool.category}</Badge>
                      <Badge variant="outline">Added {tool.dateAdded}</Badge>
                    </div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription className="mt-1">{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Target Keyword:</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {tool.targetKeyword}
                  </code>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Main Tool Page:</p>
                  <Link 
                    href={tool.mainUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <Footprints className="w-4 h-4" />
                    {tool.mainUrl}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {tool.supportingArticles.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Supporting Articles:</p>
                    <div className="space-y-2">
                      {tool.supportingArticles.map((article, index) => (
                        <Link 
                          key={index}
                          href={article.url}
                          target="_blank"
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{article.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t flex gap-3">
                  <Link href={tool.mainUrl} target="_blank">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Tool
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchQuery 
                  ? `No MBBs found matching "${searchQuery}"`
                  : 'No MBB tools created yet.'
                }
              </p>
              {!searchQuery && (
                <p className="text-sm text-gray-400 mt-1">MBB tools are added through code development.</p>
              )}
            </CardContent>
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 mt-6 border-t">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTools.length)} of {filteredTools.length} MBBs
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
