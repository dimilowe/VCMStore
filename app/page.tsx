import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmailCapture } from "@/components/email-capture";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { query } from "@/lib/db";
import { HeroSearch } from "@/components/hero-search";
import { 
  Sparkles, 
  QrCode, 
  Flame,
  FileImage,
  Type,
  Palette,
  Search,
  GitBranch,
  Smile,
  Star,
  Heart,
  ArrowRight,
  Briefcase,
  Megaphone,
  PenTool,
  Zap,
  TrendingUp,
  ExternalLink,
  Rocket,
  Wrench,
  Package,
  MessageCircleQuestion,
  LayoutGrid,
  Youtube,
  Bell,
  Music
} from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
}

interface Idea {
  slug: string;
  title: string;
  one_liner: string;
  upvote_count: number;
}

interface Product {
  slug: string;
  name: string;
  type: string;
  price: number | null;
}

async function getLatestBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await query(
      `SELECT slug, title, excerpt, featured_image_url 
       FROM blog_posts 
       WHERE published_at IS NOT NULL AND published_at <= NOW()
       ORDER BY published_at DESC 
       LIMIT 3`
    );
    return result.rows;
  } catch {
    return [];
  }
}

async function getLatestIdeas(): Promise<Idea[]> {
  try {
    const result = await query(
      `SELECT slug, title, one_liner, upvote_count 
       FROM ideas 
       ORDER BY created_at DESC 
       LIMIT 3`
    );
    return result.rows;
  } catch {
    return [];
  }
}

async function getLatestDrops(): Promise<Product[]> {
  try {
    const result = await query(
      `SELECT slug, name, type, price 
       FROM products 
       ORDER BY created_at DESC 
       LIMIT 5`
    );
    return result.rows;
  } catch {
    return [];
  }
}

const creatorApps = [
  {
    name: "APE",
    description: "AI-Powered Engagement",
    icon: Zap,
    href: "https://ape.vcm.fyi",
    gradient: "app-card-pink",
    external: true
  },
  {
    name: "QR Social",
    description: "Social QR Networking",
    icon: QrCode,
    href: "/product/qrsocial",
    gradient: "app-card-blue"
  },
  {
    name: "Nudge",
    description: "Smart Notifications",
    icon: Bell,
    href: "/product/nudge",
    gradient: "app-card-yellow"
  },
  {
    name: "Stemly",
    description: "Music Stem Editor",
    icon: Music,
    href: "/product/stemly",
    gradient: "app-card-teal"
  },
  {
    name: "C-Score",
    description: "Calorie Calculator",
    icon: Flame,
    href: "/product/cscorecals",
    gradient: "app-card-orange"
  },
];

const freeTools = [
  { name: "VCM Answers", icon: MessageCircleQuestion, href: "/answers" },
  { name: "Ideas Hub", icon: Rocket, href: "/ideas" },
  { name: "Resource Box", icon: LayoutGrid, href: "/tools/resource-box" },
  { name: "Thumbnail Coach", icon: Youtube, href: "/tools/ai-thumbnail-coach" },
  { name: "GIF Compressor", icon: FileImage, href: "/tools/gif-compressor" },
  { name: "Image Compressor", icon: FileImage, href: "/tools/image-compressor" },
  { name: "Word Counter", icon: Type, href: "/tools/word-counter" },
  { name: "Logo Generator", icon: Palette, href: "/tools/logo-generator" },
  { name: "Keyword Finder", icon: Search, href: "/tools/keyword-finder" },
  { name: "Visualization", icon: GitBranch, href: "/tools/visualization" },
  { name: "Emoji Combos", icon: Smile, href: "/tools/emoji-combos" },
  { name: "Daily Horoscope", icon: Star, href: "/tools/horoscope-of-the-day" },
  { name: "Self-Love Affirmations", icon: Heart, href: "/tools/affirmation-about-self-love" },
];

const categories = [
  { name: "Creative Projects", icon: PenTool },
  { name: "Online Business", icon: Briefcase },
  { name: "Marketing Tools", icon: Megaphone },
  { name: "Content Creation", icon: Sparkles },
];

const ecosystemApps = [
  { name: "APE", href: "https://ape.vcm.fyi" },
  { name: "QR Social", href: "/product/qrsocial" },
  { name: "C-Score", href: "/product/cscorecals" },
  { name: "VCM Blog", href: "/blog" },
  { name: "Ideas Hub", href: "/ideas" },
  { name: "VCM Answers", href: "/answers" },
  { name: "Resource Box", href: "/tools/resource-box" },
  { name: "Thumbnail Coach", href: "/tools/ai-thumbnail-coach" },
  { name: "Free Tools", href: "/tools" },
  { name: "Funnels", href: "/funnels" },
  { name: "Downloads", href: "/downloads" },
  { name: "Store", href: "/store" },
];

export default async function HomePage() {
  const [blogPosts, ideas, latestDrops] = await Promise.all([
    getLatestBlogPosts(),
    getLatestIdeas(),
    getLatestDrops()
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Creator Apps
          </h1>
          <p className="text-gray-500 text-lg mb-12">
            Unified tools for modern creators
          </p>

          {/* Creator Apps Grid - VCM OS Style */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
            {creatorApps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                target={app.external ? "_blank" : undefined}
                className="group flex flex-col items-center"
              >
                <div className={`w-24 h-24 md:w-28 md:h-28 ${app.gradient} rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-transform`}>
                  <app.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">{app.name}</span>
                <span className="text-xs text-gray-500">{app.description}</span>
              </Link>
            ))}
          </div>

          {/* What is VCM Suite Box */}
          <div className="max-w-2xl mx-auto gradient-border rounded-2xl p-8 bg-white">
            <h2 className="text-2xl font-bold text-gradient mb-3">
              What is VCM Suite?
            </h2>
            <p className="text-gray-600 mb-6">
              Your unified creator campus. Discover tools, track your growth, and connect all your creator resources in one beautiful hub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://ape.vcm.fyi" target="_blank">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-2 border-gray-300 hover:border-orange-400 text-gray-700 px-8 py-6 text-base font-semibold rounded-xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 border-y border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <HeroSearch />
        </div>
      </section>

      {/* Latest Drops Strip */}
      {latestDrops.length > 0 && (
        <section className="bg-gray-900 py-4 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 shrink-0">
                <Package className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-white tracking-wide">LATEST DROPS</span>
              </div>
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                {latestDrops.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-1.5 hover:bg-gray-700 transition-colors shrink-0"
                  >
                    <span className="text-sm text-white font-medium">{product.name}</span>
                    {product.price && product.price > 0 ? (
                      <span className="text-xs text-orange-400 font-bold">${product.price}</span>
                    ) : (
                      <span className="text-xs text-green-400 font-bold">FREE</span>
                    )}
                  </Link>
                ))}
              </div>
              <Link href="/store" className="text-orange-500 hover:text-orange-400 text-sm font-medium shrink-0 hidden sm:flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Microtools / Free Tools */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Free Creator Tools</h2>
          <p className="text-gray-500 mb-8">Powerful utilities at no cost</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {freeTools.map((tool) => (
              <Link 
                key={tool.name} 
                href={tool.href}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <tool.icon className="w-6 h-6 text-gray-600 group-hover:text-orange-500" />
                </div>
                <span className="text-sm font-medium text-gray-800">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VCM Media Hub */}
      {blogPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">VCM Media Hub</h2>
                <p className="text-gray-500">Latest articles and insights</p>
              </div>
              <Link href="/newsletter" className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/newsletter/${post.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all group"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    {post.featured_image_url ? (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Article</p>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* For Creators & Entrepreneurs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">For Creators & Entrepreneurs</h2>
          <p className="text-gray-500 mb-8">Tools designed for your success</p>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.name}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-orange-50 rounded-lg flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-gray-600 group-hover:text-orange-500" />
                </div>
                <span className="font-medium text-gray-800">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ecosystem Overview</h2>
          <p className="text-gray-500 mb-8">Explore the VCM universe</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ecosystemApps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                target={app.href.startsWith('http') ? '_blank' : undefined}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium py-3 transition-colors"
              >
                {app.name}
                {app.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas Hub Highlights */}
      {ideas.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ideas Hub Highlights</h2>
                <p className="text-gray-500">Latest startup ideas from the community</p>
              </div>
              <Link href="/ideas" className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <Link 
                  key={idea.slug} 
                  href={`/ideas/${idea.slug}`}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <TrendingUp className="w-5 h-5 text-orange-500 mb-1" />
                      <span className="text-sm font-bold text-gray-700">{idea.upvote_count}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-2">
                        {idea.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{idea.one_liner}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Email Capture */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <EmailCapture 
            source="homepage" 
            title="Join the Creator Movement"
            description="Get exclusive tools, tips, and early access to new features delivered to your inbox."
            dark
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-gray-900">VCM Suite</span>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} VCM. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm hidden md:block">Have feedback or suggestions?</p>
              <FeedbackDialog />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
