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
  Music,
  Target,
  Link2,
  FileText,
  ShoppingBag,
  FilePen
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
  { name: "VCM Answers", icon: MessageCircleQuestion, href: "/answers", iconBg: "bg-blue-400" },
  { name: "Ideas Hub", icon: Rocket, href: "/ideas", iconBg: "bg-amber-400" },
  { name: "Calorie Deficit Calculator", icon: Flame, href: "/tools/calorie-deficit-calculator", iconBg: "bg-green-500" },
  { name: "Outfit Ideas", icon: ShoppingBag, href: "/tools/outfit-ideas", iconBg: "bg-pink-500" },
  { name: "PDF Editor", icon: FilePen, href: "/tools/pdf-editor", iconBg: "bg-red-500" },
  { name: "Resource Box", icon: LayoutGrid, href: "/tools/resource-box", iconBg: "bg-teal-500" },
  { name: "Thumbnail Coach", icon: Youtube, href: "/tools/ai-thumbnail-coach", iconBg: "bg-red-500" },
  { name: "GIF Compressor", icon: FileImage, href: "/tools/gif-compressor", iconBg: "bg-violet-500" },
  { name: "GIF Maker", icon: FileImage, href: "/tools/gif-maker", iconBg: "bg-fuchsia-500" },
  { name: "HEIC to JPG", icon: FileImage, href: "/tools/heic-to-jpg", iconBg: "bg-rose-500" },
  { name: "Image Compressor", icon: FileImage, href: "/tools/image-compressor", iconBg: "bg-sky-500" },
  { name: "Word Counter", icon: Type, href: "/tools/word-counter", iconBg: "bg-gray-500" },
  { name: "Logo Generator", icon: Palette, href: "/tools/logo-generator", iconBg: "bg-pink-500" },
  { name: "Keyword Finder", icon: Search, href: "/tools/keyword-finder", iconBg: "bg-blue-500" },
  { name: "Reach Grabber", icon: Target, href: "/tools/reach-grabber-tool", iconBg: "bg-orange-500" },
  { name: "AI Humanizer", icon: Sparkles, href: "/tools/ai-humanizer-free", iconBg: "bg-indigo-500" },
  { name: "Producer Tag", icon: Music, href: "/tools/producer-tag-generator", iconBg: "bg-green-500" },
  { name: "Ad Copy Analyzer", icon: Megaphone, href: "/tools/ad-copy-analyzer", iconBg: "bg-cyan-500" },
  { name: "Internal Link Audit", icon: Link2, href: "/tools/internal-link-seo-audit", iconBg: "bg-emerald-500" },
  { name: "AI Summarizer", icon: FileText, href: "/tools/summarizer", iconBg: "bg-yellow-500" },
  { name: "Visualization", icon: GitBranch, href: "/tools/visualization", iconBg: "bg-amber-500" },
  { name: "Emoji Combos", icon: Smile, href: "/tools/emoji-combos", iconBg: "bg-yellow-400" },
  { name: "Daily Horoscope", icon: Star, href: "/tools/horoscope-of-the-day", iconBg: "bg-purple-400" },
  { name: "Self-Love Affirmations", icon: Heart, href: "/tools/affirmation-about-self-love", iconBg: "bg-pink-400" },
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

  const popularTools = [
    { name: "QR Social", icon: QrCode, href: "/product/qrsocial" },
    { name: "C-Score", icon: Flame, href: "/product/cscorecals" },
    { name: "APE", icon: Zap, href: "https://ape.vcm.fyi", external: true },
    { name: "Logo Gen", icon: Palette, href: "/tools/logo-generator" },
    { name: "Keywords", icon: Search, href: "/tools/keyword-finder" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Creator Apps
          </h1>
          <p className="text-gray-500 text-lg mb-12">
            Unified tools for modern creators
          </p>

          {/* Creator Apps Grid - VCM OS Style */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
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

          {/* Tagline */}
          <p className="text-gray-500 text-base mb-6">
            Free tools & resources to grow, engage, and monetize your creative business.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <HeroSearch />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="https://vcmos.io" target="_blank">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Open VCM OS
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-6 text-base font-semibold rounded-full flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Browse Tools
              </Button>
            </Link>
          </div>

          {/* Popular Tools */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-500">Popular:</span>
            {popularTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                target={tool.external ? "_blank" : undefined}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-orange-400 hover:shadow-md transition-all text-sm font-medium text-gray-700"
              >
                <tool.icon className="w-4 h-4 text-gray-500" />
                {tool.name}
                {tool.external && <ExternalLink className="w-3 h-3 text-gray-400" />}
              </Link>
            ))}
          </div>
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
                <div className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110`}>
                  <tool.icon className="w-6 h-6 text-white" />
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

      {/* Explore VCM OS */}
      <section className="pt-10 pb-6 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Explore VCM OS
          </h2>

          {/* Creator Apps Grid - VCM OS Style */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
            {creatorApps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                target={app.external ? "_blank" : undefined}
                className="group flex flex-col items-center"
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 ${app.gradient} rounded-2xl flex items-center justify-center mb-2 shadow-lg group-hover:scale-105 transition-transform`}>
                  <app.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className="text-xs font-semibold text-white">{app.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            <Link
              href="https://vcmos.io"
              target="_blank"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-lg text-sm"
            >
              <Zap className="w-4 h-4" />
              Open VCM OS
            </Link>
            <Link
              href="/tools"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-2.5 rounded-full border border-gray-700 transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Browse Tools
            </Link>
          </div>
          <p className="text-gray-400 text-sm">Unified tools for modern creators</p>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="pt-6 pb-12 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ecosystem Overview</h2>
          <p className="text-gray-400 mb-6">Explore the VCM universe</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ecosystemApps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                target={app.href.startsWith('http') ? '_blank' : undefined}
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-orange-400 font-medium py-3 transition-colors"
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
