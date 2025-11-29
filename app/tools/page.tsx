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
  LayoutGrid
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Tools for Creators — VCM Suite",
  description: "Free online tools for creators and entrepreneurs. Compress images, generate logos, find keywords, create diagrams, and more — all 100% free.",
  keywords: "free tools, image compressor, gif compressor, word counter, logo generator, keyword finder, emoji combos, horoscope generator, affirmation generator",
};

const tools = [
  { 
    name: "AI Thumbnail Coach", 
    description: "Analyze and optimize your YouTube thumbnails with AI.",
    icon: Youtube, 
    href: "/tools/ai-thumbnail-coach",
    category: "AI"
  },
  { 
    name: "Logo Generator", 
    description: "Create AI-powered logos for your brand in seconds.",
    icon: Palette, 
    href: "/tools/logo-generator",
    category: "AI"
  },
  { 
    name: "Resource Box", 
    description: "Create shareable link collections for your bio.",
    icon: LayoutGrid, 
    href: "/tools/resource-box",
    category: "Social"
  },
  { 
    name: "GIF Compressor", 
    description: "Compress GIF files to reduce size while maintaining quality.",
    icon: FileImage, 
    href: "/tools/gif-compressor",
    category: "Image"
  },
  { 
    name: "Image Compressor", 
    description: "Compress JPG, PNG, and WebP images with smart optimization.",
    icon: FileImage, 
    href: "/tools/image-compressor",
    category: "Image"
  },
  { 
    name: "Word Counter", 
    description: "Count words, characters, sentences, and reading time.",
    icon: Type, 
    href: "/tools/word-counter",
    category: "Writing"
  },
  { 
    name: "Keyword Finder", 
    description: "Find low-competition SEO keywords for your content.",
    icon: Search, 
    href: "/tools/keyword-finder",
    category: "SEO"
  },
  { 
    name: "Visualization Tool", 
    description: "Turn text into flowcharts, diagrams, and visual maps.",
    icon: GitBranch, 
    href: "/tools/visualization",
    category: "Design"
  },
  { 
    name: "Emoji Combos", 
    description: "Copy aesthetic emoji combinations for your social bios.",
    icon: Smile, 
    href: "/tools/emoji-combos",
    category: "Social"
  },
  { 
    name: "Horoscope of the Day", 
    description: "Get your personalized AI-powered daily horoscope reading.",
    icon: Star, 
    href: "/tools/horoscope-of-the-day",
    category: "Lifestyle"
  },
  { 
    name: "Self-Love Affirmations", 
    description: "Daily AI-generated affirmations for self-love and confidence.",
    icon: Heart, 
    href: "/tools/affirmation-about-self-love",
    category: "Lifestyle"
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
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-orange-50 rounded-xl flex items-center justify-center transition-colors shrink-0">
                      <tool.icon className="w-6 h-6 text-gray-600 group-hover:text-orange-500" />
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
