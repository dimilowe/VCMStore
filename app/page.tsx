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
  LayoutGrid
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

const featuredTools = [
  {
    name: "QR Social",
    icon: QrCode,
    href: "/product/qrsocial",
    color: "bg-blue-500"
  },
  {
    name: "C-Score",
    icon: Flame,
    href: "/product/cscorecals",
    color: "bg-orange-500"
  },
  {
    name: "APE",
    icon: Zap,
    href: "https://ape.vcm.fyi",
    color: "bg-yellow-500",
    external: true
  },
  {
    name: "Logo Gen",
    icon: Palette,
    href: "/tools/logo-generator",
    color: "bg-purple-500"
  },
  {
    name: "Keywords",
    icon: Search,
    href: "/tools/keyword-finder",
    color: "bg-green-500"
  },
];

const freeTools = [
  { name: "VCM Answers", icon: MessageCircleQuestion, href: "/answers" },
  { name: "Ideas Hub", icon: Rocket, href: "/ideas" },
  { name: "Resource Box", icon: LayoutGrid, href: "/tools/resource-box" },
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
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-3">
              Tools, ideas, and opportunities for the{" "}
              <span className="text-yellow-500">modern creative</span>
            </h1>
            <p className="text-stone-600 text-lg">
              Everything you need to build, grow, and monetize your creative business.
            </p>
          </div>

          {/* Big Search Bar */}
          <HeroSearch />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="https://ape.vcm.fyi" target="_blank">
              <Button className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Open VCM OS
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" className="border-2 border-stone-300 hover:border-yellow-500 text-stone-800 px-8 py-6 text-base font-semibold rounded-full flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Browse Tools
              </Button>
            </Link>
          </div>

          {/* Featured Tools Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="text-sm text-stone-500 font-medium">Popular:</span>
            {featuredTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                target={tool.external ? "_blank" : undefined}
                className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-2 hover:border-yellow-400 hover:shadow-md transition-all group"
              >
                <div className={`w-6 h-6 ${tool.color} rounded-full flex items-center justify-center`}>
                  <tool.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">
                  {tool.name}
                </span>
                {tool.external && <ExternalLink className="w-3 h-3 text-stone-400" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Drops Strip */}
      {latestDrops.length > 0 && (
        <section className="bg-stone-900 py-4 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 shrink-0">
                <Package className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-white tracking-wide">LATEST DROPS</span>
              </div>
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                {latestDrops.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-2 bg-stone-800 rounded-full px-4 py-1.5 hover:bg-stone-700 transition-colors shrink-0"
                  >
                    <span className="text-sm text-white font-medium">{product.name}</span>
                    {product.price && product.price > 0 ? (
                      <span className="text-xs text-yellow-400 font-bold">${product.price}</span>
                    ) : (
                      <span className="text-xs text-green-400 font-bold">FREE</span>
                    )}
                  </Link>
                ))}
              </div>
              <Link href="/store" className="text-yellow-500 hover:text-yellow-400 text-sm font-medium shrink-0 hidden sm:flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Microtools / Free Tools */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">Microtools / Free Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {freeTools.map((tool) => (
              <Link 
                key={tool.name} 
                href={tool.href}
                className="bg-white rounded-xl p-4 border border-stone-200 hover:border-yellow-400 hover:shadow-md transition-all text-center group"
              >
                <div className="w-10 h-10 bg-stone-100 group-hover:bg-yellow-50 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors">
                  <tool.icon className="w-5 h-5 text-stone-600 group-hover:text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-stone-800">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VCM Media Hub */}
      {blogPosts.length > 0 && (
        <section className="py-12 px-4 bg-stone-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900">VCM Media Hub</h2>
              <Link href="/newsletter" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/newsletter/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-yellow-400 hover:shadow-lg transition-all group"
                >
                  <div className="aspect-video bg-gradient-to-br from-stone-200 to-stone-300 relative">
                    {post.featured_image_url ? (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-stone-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-stone-500 mb-1">Article</p>
                    <h3 className="font-bold text-stone-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
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
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">For Creators & Entrepreneurs</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.name}
                className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-3 hover:border-yellow-400 hover:shadow-md transition-all cursor-pointer"
              >
                <cat.icon className="w-5 h-5 text-stone-600" />
                <span className="font-medium text-stone-800">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-12 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">Ecosystem Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ecosystemApps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                target={app.href.startsWith('http') ? '_blank' : undefined}
                className="text-stone-700 hover:text-yellow-600 font-medium py-2 transition-colors"
              >
                {app.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas Hub Highlights */}
      {ideas.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Ideas Hub Highlights</h2>
              <Link href="/ideas" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <Link 
                  key={idea.slug} 
                  href={`/ideas/${idea.slug}`}
                  className="bg-white rounded-xl p-6 border border-stone-200 hover:border-yellow-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <TrendingUp className="w-5 h-5 text-yellow-500 mb-1" />
                      <span className="text-sm font-bold text-stone-700">{idea.upvote_count}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-stone-900 group-hover:text-yellow-600 transition-colors mb-2">
                        {idea.title}
                      </h3>
                      <p className="text-sm text-stone-600 line-clamp-2">{idea.one_liner}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Email Capture */}
      <section className="py-16 px-4 bg-stone-900">
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
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-stone-900 mb-1">VCM Hub</p>
              <p className="text-stone-600 text-sm">
                © {new Date().getFullYear()} VCM. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-stone-600 text-sm hidden md:block">Have feedback or suggestions?</p>
              <FeedbackDialog />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
