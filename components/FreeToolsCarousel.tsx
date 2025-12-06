"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Rocket, Flame, ShoppingBag, FilePen, LayoutGrid, Youtube, FileImage, Type, Palette, Search, Target, Sparkles, Music, Megaphone, Link2, FileText, GitBranch, Smile, Star, Heart, StickyNote, X, TrendingUp, Users, Images, RotateCcw } from "lucide-react";

const freeTools = [
  { name: "Prediction Center", icon: TrendingUp, href: "/tools/prediction-center", iconBg: "bg-purple-500" },
  { name: "VCM Answers", icon: MessageCircleQuestion, href: "/answers", iconBg: "bg-blue-400" },
  { name: "Ideas Hub", icon: Rocket, href: "/ideas", iconBg: "bg-amber-400" },
  { name: "Calorie Deficit Calculator", icon: Flame, href: "/tools/calorie-deficit-calculator", iconBg: "bg-green-500" },
  { name: "Outfit Ideas", icon: ShoppingBag, href: "/tools/outfit-ideas", iconBg: "bg-pink-500" },
  { name: "Self-Love Affirmations", icon: Heart, href: "/tools/affirmation-about-self-love", iconBg: "bg-pink-400" },
  { name: "PDF Editor", icon: FilePen, href: "/tools/pdf-editor", iconBg: "bg-red-500" },
  { name: "Resource Box", icon: LayoutGrid, href: "/tools/resource-box", iconBg: "bg-teal-500" },
  { name: "Thumbnail Coach", icon: Youtube, href: "/tools/ai-thumbnail-coach", iconBg: "bg-red-500" },
  { name: "GIF Compressor", icon: FileImage, href: "/tools/gif-compressor", iconBg: "bg-violet-500" },
  { name: "GIF Maker", icon: FileImage, href: "/tools/gif-maker", iconBg: "bg-fuchsia-500" },
  { name: "HEIC to JPG", icon: FileImage, href: "/tools/heic-to-jpg", iconBg: "bg-rose-500" },
  { name: "Image Compressor", icon: FileImage, href: "/tools/image-compressor", iconBg: "bg-sky-500" },
  { name: "Online Notepad", icon: StickyNote, href: "/tools/online-notepad", iconBg: "bg-amber-500" },
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
  { name: "Name Combiner", icon: Users, href: "/tools/name-combiner", iconBg: "bg-cyan-500" },
  { name: "Photo Gallery Maker", icon: Images, href: "/tools/photo-gallery-maker", iconBg: "bg-indigo-500" },
  { name: "YouTube Title Split-Test", icon: RotateCcw, href: "/tools/youtube-title-split-test", iconBg: "bg-red-500" },
];

const ITEMS_PER_PAGE = 24;

export default function FreeToolsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return freeTools;
    const query = searchQuery.toLowerCase();
    return freeTools.filter(tool => 
      tool.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentTools = filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const goToPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  
  const goToNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };
  
  return (
    <div className="relative">
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            placeholder="Search tools..."
            className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-center text-sm text-gray-500 mt-2">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
          </p>
        )}
      </div>

      {currentTools.length > 0 ? (
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 transition-opacity duration-300"
        >
          {currentTools.map((tool) => (
            <Link 
              key={tool.name} 
              href={tool.href}
              className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all text-center group"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 ${tool.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110`}>
                <tool.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <span className="text-sm md:text-base font-medium text-gray-800 line-clamp-2">{tool.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No tools found matching "{searchQuery}"</p>
          <button
            onClick={clearSearch}
            className="mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}
      
      {totalPages > 1 && !searchQuery && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrev}
            disabled={currentPage === 0}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              currentPage === 0
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentPage === index 
                    ? 'w-8 bg-orange-500' 
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages - 1}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              currentPage === totalPages - 1
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50'
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
