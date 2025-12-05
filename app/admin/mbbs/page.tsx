"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ExternalLink, Calculator, FileText, Layers, Search, ChevronLeft, ChevronRight, ShoppingBag, BookOpen, Filter } from "lucide-react";

type MBBType = 'all' | 'tool' | 'product' | 'article';

interface MBBItem {
  id: string;
  name: string;
  description: string;
  targetKeyword: string;
  mainUrl: string;
  supportingArticles?: {
    title: string;
    url: string;
  }[];
  dateAdded: string;
  category: string;
  type: 'tool' | 'product' | 'article';
  thumbnailUrl?: string;
  price?: number;
  priceType?: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  price_type: string;
  price: number;
  thumbnail_url: string | null;
  created_at: string;
}

const TOOL_MBBS: MBBItem[] = [
  {
    id: "calorie-counter-best",
    name: "Best Calorie Counter",
    description: "Daily intake vs target calculator with comprehensive comparison of top calorie counters. Helps users choose the best tool for their needs.",
    targetKeyword: "calorie counter best",
    mainUrl: "/tools/calorie-counter-best",
    supportingArticles: [
      { title: "How to Choose the Best Calorie Counter for Your Goals", url: "/mbb/how-to-choose-best-calorie-counter" },
      { title: "7 Common Calorie Counter Mistakes (and How to Avoid Them)", url: "/mbb/calorie-counter-mistakes" },
    ],
    dateAdded: "2024-12-05",
    category: "Fitness",
    type: "tool",
  },
  {
    id: "calorie-counter-treadmill",
    name: "Treadmill Calorie Counter",
    description: "MET-based treadmill calorie calculator with speed, incline, duration, and activity mode inputs. Calculates calories, distance, and pace.",
    targetKeyword: "calorie counter for treadmill",
    mainUrl: "/tools/calorie-counter-treadmill",
    supportingArticles: [
      { title: "Treadmill Calories Guide: How Many Calories Are You Really Burning?", url: "/mbb/treadmill-calories-guide" },
      { title: "Incline vs Speed on the Treadmill: What Burns More Calories?", url: "/mbb/incline-vs-speed-treadmill" },
    ],
    dateAdded: "2024-12-05",
    category: "Fitness",
    type: "tool",
  },
  {
    id: "calorie-counter-free",
    name: "Free Calorie Counter",
    description: "100% free online calorie calculator. Track daily food intake with add/remove items or quick total entry. No signup required.",
    targetKeyword: "calorie counter for free",
    mainUrl: "/tools/calorie-counter-free",
    supportingArticles: [
      { title: "Best Free Calorie Counters You Can Use Online", url: "/mbb/best-free-calorie-counters" },
      { title: "How to Count Calories for Free Without Paying for Apps", url: "/mbb/how-to-count-calories-for-free" },
    ],
    dateAdded: "2024-12-05",
    category: "Fitness",
    type: "tool",
  },
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
    type: "tool",
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
    type: "tool",
  },
  {
    id: "calorie-counter-bmi",
    name: "Calorie Counter BMI",
    description: "Combined BMI + daily calorie calculator using Mifflin-St Jeor. Shows BMI category, TDEE, and suggested calorie ranges for weight goals.",
    targetKeyword: "calorie counter bmi",
    mainUrl: "/tools/calorie-counter-bmi",
    supportingArticles: [
      { title: "What Is BMI? Understanding Body Mass Index", url: "/mbb/what-is-bmi" },
      { title: "BMI vs Body Fat: What's the Difference?", url: "/mbb/bmi-vs-body-fat" },
    ],
    dateAdded: "2024-12-05",
    category: "Fitness",
    type: "tool",
  },
  {
    id: "weather-prediction",
    name: "Weather Prediction",
    description: "Instant weather forecast tool with current conditions, hourly outlook, and 7-day prediction. Supports city search and geolocation.",
    targetKeyword: "weather prediction",
    mainUrl: "/tools/weather-prediction",
    supportingArticles: [
      { title: "How Weather Prediction Works: The Science Behind Forecasting", url: "/mbb/how-weather-prediction-works" },
      { title: "7-Day Forecast Accuracy: How Reliable Is Extended Weather Prediction?", url: "/mbb/7-day-forecast-accuracy" },
    ],
    dateAdded: "2024-12-05",
    category: "Utilities",
    type: "tool",
  },
  {
    id: "calorie-counter-steps",
    name: "Calorie Counter Steps",
    description: "Convert steps walked into estimated calories burned based on weight and walking intensity. Includes conversion chart and distance estimates.",
    targetKeyword: "calorie counter steps",
    mainUrl: "/tools/calorie-counter-steps",
    supportingArticles: [],
    dateAdded: "2024-12-05",
    category: "Fitness",
    type: "tool",
  },
  {
    id: "ups-shipping-cost",
    name: "UPS Shipping Cost Estimator",
    description: "Calculate estimated UPS shipping costs based on weight, dimensions, distance zones, and service level. Includes dimensional weight calculation.",
    targetKeyword: "estimate ups shipping cost",
    mainUrl: "/tools/ups-shipping-cost",
    supportingArticles: [
      { title: "UPS Shipping Rates Explained: Complete Breakdown", url: "/mbb/ups-shipping-rates-explained" },
      { title: "UPS Ground vs Air: Which Is Cheaper?", url: "/mbb/ups-ground-vs-air" },
    ],
    dateAdded: "2024-12-05",
    category: "Utilities",
    type: "tool",
  },
];

const ITEMS_PER_PAGE = 5;

const TYPE_INFO = {
  tool: {
    label: "Tool MBBs",
    description: "Interactive calculators and utilities that rank for specific keywords",
    icon: Calculator,
    color: "bg-blue-500",
  },
  product: {
    label: "Product MBBs",
    description: "Invisible product sales pages that drive conversions from SEO traffic",
    icon: ShoppingBag,
    color: "bg-purple-500",
  },
  article: {
    label: "Article MBBs",
    description: "SEO-focused articles that don't appear in the Newsletter page",
    icon: BookOpen,
    color: "bg-green-500",
  },
};

export default function MBBsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<MBBType>('all');
  const [allMBBs, setAllMBBs] = useState<MBBItem[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadMBBs();
    }
  }, [isAuthenticated]);

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

  const loadMBBs = async () => {
    try {
      const res = await fetch("/api/admin/products", {
        credentials: 'include'
      });
      const data = await res.json();
      
      const invisibleProducts: Product[] = (data.products || []).filter(
        (p: Product) => p.type === 'invisible'
      );
      
      const productMBBs: MBBItem[] = invisibleProducts.map((p: Product) => ({
        id: `product-${p.id}`,
        name: p.name,
        description: p.description,
        targetKeyword: p.slug.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/-/g, ' ').toLowerCase(),
        mainUrl: `/product/${p.slug}`,
        dateAdded: p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : 'Unknown',
        category: "Product",
        type: 'product' as const,
        thumbnailUrl: p.thumbnail_url || undefined,
        price: p.price,
        priceType: p.price_type,
      }));
      
      const combined = [...TOOL_MBBS, ...productMBBs];
      setAllMBBs(combined);
    } catch (error) {
      console.error("Failed to load MBBs:", error);
      setAllMBBs([...TOOL_MBBS]);
    }
  };

  const filteredMBBs = allMBBs
    .map((mbb, index) => ({ ...mbb, _originalIndex: index }))
    .filter(mbb => {
      const matchesType = typeFilter === 'all' || mbb.type === typeFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = (
        mbb.name.toLowerCase().includes(query) ||
        mbb.targetKeyword.toLowerCase().includes(query) ||
        mbb.category.toLowerCase().includes(query) ||
        mbb.description.toLowerCase().includes(query)
      );
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return b._originalIndex - a._originalIndex;
    });

  const totalPages = Math.ceil(filteredMBBs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMBBs = filteredMBBs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: MBBType) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const getTypeIcon = (type: 'tool' | 'product' | 'article') => {
    const Icon = TYPE_INFO[type].icon;
    return <Icon className="w-4 h-4" />;
  };

  const getTypeBadgeColor = (type: 'tool' | 'product' | 'article') => {
    return TYPE_INFO[type].color;
  };

  const countByType = (type: MBBType) => {
    if (type === 'all') return allMBBs.length;
    return allMBBs.filter(m => m.type === type).length;
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
            Micro-Blog Businesses (MBBs) are standalone SEO pages that drive traffic to VCM Suite without appearing in the main navigation or homepage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {(['tool', 'product', 'article'] as const).map((type) => {
            const info = TYPE_INFO[type];
            const Icon = info.icon;
            return (
              <div 
                key={type}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  typeFilter === type 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => handleTypeChange(type === typeFilter ? 'all' : type)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${info.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{info.label}</h3>
                    <Badge variant="outline">{countByType(type)}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative flex items-center flex-1">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              placeholder="Search MBBs by name, keyword, or category..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => handleTypeChange(e.target.value as MBBType)}
            className="h-14 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium"
          >
            <option value="all">All Types ({countByType('all')})</option>
            <option value="tool">Tools ({countByType('tool')})</option>
            <option value="product">Products ({countByType('product')})</option>
            <option value="article">Articles ({countByType('article')})</option>
          </select>
        </div>

        {(searchQuery || typeFilter !== 'all') && (
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              Found {filteredMBBs.length} MBB{filteredMBBs.length !== 1 ? 's' : ''}
              {typeFilter !== 'all' && ` of type "${TYPE_INFO[typeFilter].label}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            {(searchQuery || typeFilter !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => { setSearchQuery(''); setTypeFilter('all'); }}
                className="text-orange-600 hover:text-orange-700"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {typeFilter === 'all' ? 'All MBBs' : TYPE_INFO[typeFilter].label} ({filteredMBBs.length})
          </h2>
        </div>

        <div className="space-y-6">
          {paginatedMBBs.map((mbb) => (
            <Card key={mbb.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge className={`${getTypeBadgeColor(mbb.type)} text-white`}>
                        {getTypeIcon(mbb.type)}
                        <span className="ml-1">{mbb.type.charAt(0).toUpperCase() + mbb.type.slice(1)}</span>
                      </Badge>
                      <Badge variant="outline">{mbb.category}</Badge>
                      <Badge variant="secondary">Added {mbb.dateAdded}</Badge>
                      {mbb.type === 'product' && mbb.priceType && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {mbb.priceType === 'free' ? 'Free' : `$${((mbb.price || 0) / 100).toFixed(2)}`}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{mbb.name}</CardTitle>
                    <CardDescription className="mt-1">{mbb.description}</CardDescription>
                  </div>
                  {mbb.type === 'product' && mbb.thumbnailUrl && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={mbb.thumbnailUrl}
                        alt={mbb.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Target Keyword:</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {mbb.targetKeyword}
                  </code>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {mbb.type === 'tool' ? 'Main Tool Page:' : mbb.type === 'product' ? 'Product Page:' : 'Article Page:'}
                  </p>
                  <Link 
                    href={mbb.mainUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    {getTypeIcon(mbb.type)}
                    {mbb.mainUrl}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {mbb.supportingArticles && mbb.supportingArticles.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Supporting Articles:</p>
                    <div className="space-y-2">
                      {mbb.supportingArticles.map((article, index) => (
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
                  <Link href={mbb.mainUrl} target="_blank">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Page
                    </Button>
                  </Link>
                  {mbb.type === 'product' && (
                    <Link href="/admin">
                      <Button size="sm" variant="outline">
                        Edit in Products
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMBBs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchQuery || typeFilter !== 'all'
                  ? `No MBBs found matching your filters`
                  : 'No MBBs created yet.'
                }
              </p>
              {!searchQuery && typeFilter === 'all' && (
                <p className="text-sm text-gray-400 mt-1">
                  Create invisible products in the Products page, or add tool MBBs through code development.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 mt-6 border-t">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredMBBs.length)} of {filteredMBBs.length} MBBs
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
