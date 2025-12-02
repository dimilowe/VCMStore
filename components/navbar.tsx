"use client"

import Link from "next/link";
import { User, Search, Menu, LayoutDashboard, ShieldCheck, Settings, LogOut, LogIn, ChevronDown, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

interface ToolCategory {
  title: string;
  items: DropdownItem[];
}

const productDropdown: NavDropdown = {
  label: "Products",
  items: [
    { label: "Apps", href: "/apps", description: "Premium applications for creators" },
    { label: "Downloads", href: "/downloads", description: "Digital downloads & assets" },
    { label: "Templates", href: "/funnels", description: "Conversion-focused templates" },
    { label: "Videos", href: "/videos", description: "Video content & tutorials" },
    { label: "Freebies", href: "/freebies", description: "Free products & resources" },
  ]
};

const resourceCategories: ToolCategory[] = [
  {
    title: "AI Tools",
    items: [
      { label: "AI Chat", href: "/chat", description: "Strategy assistant" },
      { label: "AI Thumbnail Coach", href: "/tools/ai-thumbnail-coach", description: "YouTube thumbnail analyzer" },
      { label: "Logo Generator", href: "/tools/logo-generator", description: "AI-powered logo maker" },
      { label: "AI Humanizer", href: "/tools/ai-humanizer-free", description: "Detect & humanize AI text" },
      { label: "AI Summarizer", href: "/tools/summarizer", description: "Summarize any text instantly" },
      { label: "Outfit Ideas", href: "/tools/outfit-ideas", description: "AI outfit generator" },
    ]
  },
  {
    title: "Content & SEO",
    items: [
      { label: "Keyword Finder", href: "/tools/keyword-finder", description: "Find low-competition SEO ideas" },
      { label: "Reach Grabber", href: "/tools/reach-grabber-tool", description: "AI SEO content optimizer" },
      { label: "Ad Copy Analyzer", href: "/tools/ad-copy-analyzer", description: "Analyze & improve ad copy" },
      { label: "Internal Link Audit", href: "/tools/internal-link-seo-audit", description: "Find orphan pages & weak links" },
      { label: "Word Counter", href: "/tools/word-counter", description: "Count words & characters" },
      { label: "Producer Tags", href: "/tools/producer-tag-generator", description: "AI voice tags for beats" },
    ]
  },
  {
    title: "Media Tools",
    items: [
      { label: "GIF Compressor", href: "/tools/gif-compressor", description: "Compress GIF files" },
      { label: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert iPhone HEIC to JPG" },
      { label: "Image Compressor", href: "/tools/image-compressor", description: "Compress JPG, PNG, WebP" },
      { label: "Visualization", href: "/tools/visualization", description: "Turn text into diagrams" },
      { label: "Emoji Combos", href: "/tools/emoji-combos", description: "Copy aesthetic emoji combos" },
    ]
  },
  {
    title: "Community",
    items: [
      { label: "VCM Answers", href: "/answers", description: "Community Q&A forum" },
      { label: "Ideas Hub", href: "/ideas", description: "Browse & share startup ideas" },
      { label: "Resource Box", href: "/tools/resource-box", description: "Create shareable link cards" },
      { label: "Horoscope", href: "/tools/horoscope-of-the-day", description: "AI daily zodiac readings" },
      { label: "Affirmations", href: "/tools/affirmation-about-self-love", description: "Daily affirmation generator" },
    ]
  }
];

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn || false);
        setIsAdmin(data.isAdmin || false);
        setIsCheckingSession(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsCheckingSession(false);
      });
  }, []);

  const handleDropdownEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-8" ref={navRef}>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VCM Suite</span>
              <span className="text-xs text-gray-500 hidden sm:inline">Creator Campus</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("Products")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    openDropdown === "Products" 
                      ? 'text-orange-500 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                  }`}
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    openDropdown === "Products" ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {openDropdown === "Products" && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-xl min-w-[280px] overflow-hidden">
                      <div className="py-2">
                        {productDropdown.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-5 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="block text-sm font-medium text-gray-900">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="block text-xs text-gray-500 mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("Resources")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    openDropdown === "Resources" 
                      ? 'text-orange-500 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                  }`}
                >
                  Resources
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    openDropdown === "Resources" ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {openDropdown === "Resources" && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                      <div className="grid grid-cols-4 gap-0 divide-x divide-gray-100">
                        {resourceCategories.map((category) => (
                          <div key={category.title} className="p-4 min-w-[200px]">
                            <h3 className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
                              {category.title}
                            </h3>
                            <div className="space-y-1">
                              {category.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block py-2 hover:text-orange-500 transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <span className="block text-sm font-medium text-gray-900 hover:text-orange-500">
                                    {item.label}
                                  </span>
                                  <span className="block text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                        <Link 
                          href="/tools" 
                          className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1"
                          onClick={() => setOpenDropdown(null)}
                        >
                          View all tools
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                href="/newsletter" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-colors rounded-lg"
              >
                Newsletter
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg">
              <Search className="h-5 w-5" />
            </Button>
            
            {!isCheckingSession && (
              <>
                {isLoggedIn ? (
                  <div className="relative" ref={dropdownRef}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                    
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="py-2">
                          <Link href="/dashboard" onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                              <LayoutDashboard className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">Dashboard</span>
                            </div>
                          </Link>
                          
                          {isAdmin && (
                            <Link href="/admin" onClick={() => setIsProfileOpen(false)}>
                              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                                <ShieldCheck className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700">Admin</span>
                              </div>
                            </Link>
                          )}
                          
                          <div className="border-t border-gray-100 my-2"></div>
                          
                          <Link href="/settings" onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                              <Settings className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">Settings</span>
                            </div>
                          </Link>
                          
                          <button 
                            onClick={async () => {
                              if (isLoggingOut) return;
                              setIsLoggingOut(true);
                              setIsProfileOpen(false);
                              try {
                                const response = await fetch('/api/auth/logout', { method: 'POST' });
                                if (!response.ok) {
                                  console.error('Logout failed:', response.statusText);
                                }
                              } catch (error) {
                                console.error('Logout error:', error);
                              }
                              setIsLoggedIn(false);
                              window.location.href = '/';
                            }}
                            disabled={isLoggingOut}
                            className="w-full"
                          >
                            <div className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${isLoggingOut ? 'opacity-50' : ''}`}>
                              <LogOut className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">
                                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-4">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-4 space-y-1">
            {/* Products */}
            <div>
              <button
                onClick={() => setMobileOpenDropdown(
                  mobileOpenDropdown === "Products" ? null : "Products"
                )}
                className="flex items-center justify-between w-full text-sm font-medium py-3 text-gray-700"
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  mobileOpenDropdown === "Products" ? 'rotate-180' : ''
                }`} />
              </button>
              
              {mobileOpenDropdown === "Products" && (
                <div className="pl-4 pb-2 space-y-1">
                  {productDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources with categories */}
            <div>
              <button
                onClick={() => setMobileOpenDropdown(
                  mobileOpenDropdown === "Resources" ? null : "Resources"
                )}
                className="flex items-center justify-between w-full text-sm font-medium py-3 text-gray-700"
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  mobileOpenDropdown === "Resources" ? 'rotate-180' : ''
                }`} />
              </button>
              
              {mobileOpenDropdown === "Resources" && (
                <div className="pl-4 pb-2 space-y-3">
                  {resourceCategories.map((category) => (
                    <div key={category.title}>
                      <h4 className="text-xs font-semibold text-orange-500 uppercase tracking-wider py-2">
                        {category.title}
                      </h4>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block py-1.5 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileOpenDropdown(null);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link 
                    href="/tools" 
                    className="block py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setMobileOpenDropdown(null);
                    }}
                  >
                    View all tools →
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/newsletter" 
              className="block text-sm font-medium py-3 text-gray-700 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Newsletter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
