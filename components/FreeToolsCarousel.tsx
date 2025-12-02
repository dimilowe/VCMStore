"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Rocket, Flame, ShoppingBag, FilePen, LayoutGrid, Youtube, FileImage, Type, Palette, Search, Target, Sparkles, Music, Megaphone, Link2, FileText, GitBranch, Smile, Star, Heart, StickyNote } from "lucide-react";

const freeTools = [
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
];

export default function FreeToolsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
    dragFree: false,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress);
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);
  
  return (
    <div className="relative group/carousel">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />
      
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex touch-pan-y gap-3 md:gap-4">
          {freeTools.map((tool) => (
            <Link 
              key={tool.name} 
              href={tool.href}
              className="flex-[0_0_140px] sm:flex-[0_0_150px] md:flex-[0_0_160px] lg:flex-[0_0_170px] min-w-0 bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all text-center group"
            >
              <div className={`w-11 h-11 md:w-12 md:h-12 ${tool.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110`}>
                <tool.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 leading-tight">{tool.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <button
        onClick={scrollPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 ${
          canScrollPrev 
            ? 'hover:bg-orange-50 hover:border-orange-300 text-gray-600 hover:text-orange-500 cursor-pointer' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={scrollNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 ${
          canScrollNext 
            ? 'hover:bg-orange-50 hover:border-orange-300 text-gray-600 hover:text-orange-500 cursor-pointer' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      <div className="mt-4 flex justify-center">
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 rounded-full transition-all duration-150"
            style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
