import Link from "next/link";
import { Metadata } from "next";
import { 
  FileImage, 
  Type, 
  Palette, 
  Search, 
  GitBranch, 
  Smile, 
  Star, 
  Heart,
  ArrowRight,
  Youtube,
  LayoutGrid,
  Target,
  Music,
  Megaphone,
  Link2,
  FileText,
  ShoppingBag,
  Flame
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Tools for Creators — VCM Suite",
  description: "Free online tools for creators and entrepreneurs. Compress images, generate logos, find keywords, create diagrams, and more — all 100% free.",
  keywords: "free tools, image compressor, gif compressor, word counter, logo generator, keyword finder, emoji combos, horoscope generator, affirmation generator",
};

const tools = [
  { 
    name: "Calorie Deficit Calculator", 
    description: "Snap your food + Health app screenshot to see today's calorie surplus or deficit.",
    icon: Flame, 
    href: "/tools/calorie-deficit-calculator",
    category: "AI",
    iconBg: "bg-green-500"
  },
  { 
    name: "Outfit Ideas Generator", 
    description: "Upload outfit photos and find similar items to shop with AI.",
    icon: ShoppingBag, 
    href: "/tools/outfit-ideas",
    category: "AI",
    iconBg: "bg-pink-500"
  },
  { 
    name: "AI Thumbnail Coach", 
    description: "Analyze and optimize your YouTube thumbnails with AI.",
    icon: Youtube, 
    href: "/tools/ai-thumbnail-coach",
    category: "AI",
    iconBg: "bg-red-500"
  },
  { 
    name: "Logo Generator", 
    description: "Create AI-powered logos for your brand in seconds.",
    icon: Palette, 
    href: "/tools/logo-generator",
    category: "AI",
    iconBg: "bg-pink-500"
  },
  { 
    name: "Resource Box", 
    description: "Create shareable link collections for your bio.",
    icon: LayoutGrid, 
    href: "/tools/resource-box",
    category: "Social",
    iconBg: "bg-teal-500"
  },
  { 
    name: "GIF Compressor", 
    description: "Compress GIF files to reduce size while maintaining quality.",
    icon: FileImage, 
    href: "/tools/gif-compressor",
    category: "Image",
    iconBg: "bg-violet-500"
  },
  { 
    name: "GIF Maker", 
    description: "Convert video or images to GIF directly in your browser.",
    icon: FileImage, 
    href: "/tools/gif-maker",
    category: "Image",
    iconBg: "bg-fuchsia-500"
  },
  { 
    name: "HEIC to JPG Converter", 
    description: "Convert iPhone HEIC photos to JPG format online. Free, private, no upload.",
    icon: FileImage, 
    href: "/tools/heic-to-jpg",
    category: "Image",
    iconBg: "bg-rose-500"
  },
  { 
    name: "Image Compressor", 
    description: "Compress JPG, PNG, and WebP images with smart optimization.",
    icon: FileImage, 
    href: "/tools/image-compressor",
    category: "Image",
    iconBg: "bg-sky-500"
  },
  { 
    name: "Word Counter", 
    description: "Count words, characters, sentences, and reading time.",
    icon: Type, 
    href: "/tools/word-counter",
    category: "Writing",
    iconBg: "bg-gray-500"
  },
  { 
    name: "Keyword Finder", 
    description: "Find low-competition SEO keywords for your content.",
    icon: Search, 
    href: "/tools/keyword-finder",
    category: "SEO",
    iconBg: "bg-blue-500"
  },
  { 
    name: "Reach Grabber Tool", 
    description: "AI-powered SEO optimizer for your blog posts and articles.",
    icon: Target, 
    href: "/tools/reach-grabber-tool",
    category: "SEO",
    iconBg: "bg-orange-500"
  },
  { 
    name: "AI Humanizer Free", 
    description: "Detect AI-written content and humanize it to sound natural.",
    icon: Palette, 
    href: "/tools/ai-humanizer-free",
    category: "AI",
    iconBg: "bg-indigo-500"
  },
  { 
    name: "Producer Tag Generator", 
    description: "Create custom AI voice tags for your beats and instrumentals.",
    icon: Music, 
    href: "/tools/producer-tag-generator",
    category: "Audio",
    iconBg: "bg-green-500"
  },
  { 
    name: "Ad Copy Analyzer", 
    description: "Analyze any ad copy and get scores, insights, and improved versions.",
    icon: Megaphone, 
    href: "/tools/ad-copy-analyzer",
    category: "Marketing",
    iconBg: "bg-cyan-500"
  },
  { 
    name: "Internal Link Audit", 
    description: "Find orphan pages and weak internal links to improve your SEO.",
    icon: Link2, 
    href: "/tools/internal-link-seo-audit",
    category: "SEO",
    iconBg: "bg-emerald-500"
  },
  { 
    name: "AI Summarizer", 
    description: "Summarize any text and extract key takeaways instantly.",
    icon: FileText, 
    href: "/tools/summarizer",
    category: "Writing",
    iconBg: "bg-yellow-500"
  },
  { 
    name: "Visualization Tool", 
    description: "Turn text into flowcharts, diagrams, and visual maps.",
    icon: GitBranch, 
    href: "/tools/visualization",
    category: "Design",
    iconBg: "bg-amber-500"
  },
  { 
    name: "Emoji Combos", 
    description: "Copy aesthetic emoji combinations for your social bios.",
    icon: Smile, 
    href: "/tools/emoji-combos",
    category: "Social",
    iconBg: "bg-yellow-400"
  },
  { 
    name: "Horoscope of the Day", 
    description: "Get your personalized AI-powered daily horoscope reading.",
    icon: Star, 
    href: "/tools/horoscope-of-the-day",
    category: "Lifestyle",
    iconBg: "bg-purple-400"
  },
  { 
    name: "Self-Love Affirmations", 
    description: "Daily AI-generated affirmations for self-love and confidence.",
    icon: Heart, 
    href: "/tools/affirmation-about-self-love",
    category: "Lifestyle",
    iconBg: "bg-pink-400"
  },
];

const categories = [...new Set(tools.map(t => t.category))];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Tools for Creators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful online tools to help you create, optimize, and grow. No signup required.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.filter(t => t.category === category).map((tool) => (
                <Link 
                  key={tool.name} 
                  href={tool.href}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="text-orange-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Use Tool <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
