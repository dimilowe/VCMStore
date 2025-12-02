"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Rocket, Flame, ShoppingBag, FilePen, LayoutGrid, Youtube, FileImage, Type, Palette, Search, Target, Sparkles, Music, Megaphone, Link2, FileText, GitBranch, Smile, Star, Heart } from "lucide-react";

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

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export default function FreeToolsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: "start",
    skipSnaps: false,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const itemsPerPage = 24;
  const pages = chunkArray(freeTools, itemsPerPage);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  
  if (pages.length === 0) return null;
  
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {pages.map((pageTools, pageIndex) => (
            <div 
              key={pageIndex}
              className="flex-[0_0_100%] min-w-0"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-1">
                {pageTools.map((tool) => (
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
          ))}
        </div>
      </div>
      
      {pages.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
              canScrollPrev 
                ? 'hover:bg-orange-50 hover:border-orange-300 text-gray-700 hover:text-orange-500' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
              canScrollNext 
                ? 'hover:bg-orange-50 hover:border-orange-300 text-gray-700 hover:text-orange-500' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <div className="flex justify-center items-center gap-2 mt-6">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'w-8 bg-orange-500' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
            <span className="ml-3 text-sm text-gray-500">
              {currentIndex + 1} / {pages.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
