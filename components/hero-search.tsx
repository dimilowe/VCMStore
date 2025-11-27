"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, FileImage, Type, Palette, Star, Heart, Smile, GitBranch, Zap, QrCode, Flame } from "lucide-react";

const searchSuggestions = [
  { name: "GIF Compressor", href: "/tools/gif-compressor", icon: FileImage },
  { name: "Image Compressor", href: "/tools/image-compressor", icon: FileImage },
  { name: "Word Counter", href: "/tools/word-counter", icon: Type },
  { name: "Logo Generator", href: "/tools/logo-generator", icon: Palette },
  { name: "Keyword Finder", href: "/tools/keyword-finder", icon: Search },
  { name: "Visualization", href: "/tools/visualization", icon: GitBranch },
  { name: "Emoji Combos", href: "/tools/emoji-combos", icon: Smile },
  { name: "Daily Horoscope", href: "/tools/horoscope-of-the-day", icon: Star },
  { name: "Self-Love Affirmations", href: "/tools/affirmation-about-self-love", icon: Heart },
  { name: "QR Social", href: "/product/qrsocial", icon: QrCode },
  { name: "C-Score", href: "/product/cscorecals", icon: Flame },
  { name: "APE", href: "https://ape.vcm.fyi", icon: Zap },
  { name: "Ideas Hub", href: "/ideas", icon: Star },
  { name: "Blog", href: "/blog", icon: Type },
  { name: "Store", href: "/store", icon: Palette },
];

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredSuggestions = query.length > 0
    ? searchSuggestions.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : searchSuggestions.slice(0, 6);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        const selected = filteredSuggestions[selectedIndex];
        if (selected.href.startsWith("http")) {
          window.open(selected.href, "_blank");
        } else {
          router.push(selected.href);
        }
        setIsOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (suggestion: typeof searchSuggestions[0]) => {
    if (suggestion.href.startsWith("http")) {
      window.open(suggestion.href, "_blank");
    } else {
      router.push(suggestion.href);
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tools, products, resources..."
          className="w-full pl-14 pr-14 py-5 text-lg bg-white border-2 border-stone-200 rounded-full shadow-lg focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all"
        />
        <button 
          onClick={() => {
            if (filteredSuggestions.length > 0) {
              handleSelect(filteredSuggestions[0]);
            }
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl z-50 overflow-hidden"
        >
          <div className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion.name}
                onClick={() => handleSelect(suggestion)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                  index === selectedIndex 
                    ? "bg-yellow-50 text-yellow-700" 
                    : "hover:bg-stone-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  index === selectedIndex ? "bg-yellow-100" : "bg-stone-100"
                }`}>
                  <suggestion.icon className={`w-4 h-4 ${
                    index === selectedIndex ? "text-yellow-600" : "text-stone-500"
                  }`} />
                </div>
                <span className="font-medium text-stone-800">{suggestion.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
