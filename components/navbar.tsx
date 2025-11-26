"use client"

import Link from "next/link";
import { User, Search, Menu, LayoutDashboard, ShieldCheck, Settings, LogOut, LogIn, ChevronDown, X } from "lucide-react";
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

const navDropdowns: NavDropdown[] = [
  {
    label: "Products",
    items: [
      { label: "Apps", href: "/apps", description: "Premium applications for creators" },
      { label: "Downloads", href: "/downloads", description: "Digital downloads & assets" },
      { label: "Templates", href: "/funnels", description: "Conversion-focused templates" },
      { label: "Videos", href: "/videos", description: "Video content & tutorials" },
    ]
  },
  {
    label: "Resources",
    items: [
      { label: "Freebies", href: "/freebies", description: "Free tools & resources" },
      { label: "AI Chat", href: "/chat", description: "Strategy assistant" },
      { label: "GIF Compressor", href: "/tools/gif-compressor", description: "Compress GIF files" },
      { label: "Image Compressor", href: "/tools/image-compressor", description: "Compress JPG, PNG, WebP" },
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
    <nav className="bg-white text-stone-800 border-b border-stone-200">
      <div className="bg-stone-700 text-white text-center py-2 text-xs tracking-wider">
        SUBSCRIBE TO STAY UP TO DATE ON ALL MY LATEST CREATIONS
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-8" ref={navRef}>
            <Link href="/" className="text-2xl font-bold tracking-wider text-stone-900">
              VCM STORE
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {navDropdowns.map((dropdown) => (
                <div
                  key={dropdown.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(dropdown.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                      openDropdown === dropdown.label 
                        ? 'text-yellow-500' 
                        : 'text-stone-800 hover:text-yellow-500'
                    }`}
                  >
                    {dropdown.label.toUpperCase()}
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      openDropdown === dropdown.label ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {openDropdown === dropdown.label && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="bg-white border border-stone-200 shadow-xl min-w-[280px]">
                        <div className="py-2">
                          {dropdown.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-5 py-3 hover:bg-stone-50 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="block text-sm font-medium text-stone-900 tracking-wide">
                                {item.label.toUpperCase()}
                              </span>
                              {item.description && (
                                <span className="block text-xs text-stone-500 mt-0.5">
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
              ))}
              
              <Link 
                href="/newsletter" 
                className="px-4 py-2 text-sm font-medium tracking-wide text-stone-800 hover:text-yellow-500 transition-colors"
              >
                NEWSLETTER
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-stone-800 hover:text-yellow-500">
              <Search className="h-5 w-5" />
            </Button>
            
            {!isCheckingSession && (
              <>
                {isLoggedIn ? (
                  <div className="relative" ref={dropdownRef}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-stone-800 hover:text-yellow-500"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                    
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 shadow-lg z-50">
                        <div className="py-2">
                          <Link href="/dashboard" onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer">
                              <LayoutDashboard className="h-4 w-4 text-stone-600" />
                              <span className="text-sm font-medium tracking-wide text-stone-800">DASHBOARD</span>
                            </div>
                          </Link>
                          
                          {isAdmin && (
                            <Link href="/admin" onClick={() => setIsProfileOpen(false)}>
                              <div className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer">
                                <ShieldCheck className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm font-medium tracking-wide text-stone-800">ADMIN</span>
                              </div>
                            </Link>
                          )}
                          
                          <div className="border-t border-stone-200 my-2"></div>
                          
                          <Link href="/settings" onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer">
                              <Settings className="h-4 w-4 text-stone-600" />
                              <span className="text-sm font-medium tracking-wide text-stone-800">SETTINGS</span>
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
                            <div className={`flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer ${isLoggingOut ? 'opacity-50' : ''}`}>
                              <LogOut className="h-4 w-4 text-stone-600" />
                              <span className="text-sm font-medium tracking-wide text-stone-800">
                                {isLoggingOut ? 'SIGNING OUT...' : 'SIGN OUT'}
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login">
                    <Button 
                      variant="ghost" 
                      className="text-stone-800 hover:text-yellow-500 font-medium tracking-wide"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      SIGN IN
                    </Button>
                  </Link>
                )}
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-stone-800 hover:text-yellow-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <div className="px-6 py-4 space-y-1">
            {navDropdowns.map((dropdown) => (
              <div key={dropdown.label}>
                <button
                  onClick={() => setMobileOpenDropdown(
                    mobileOpenDropdown === dropdown.label ? null : dropdown.label
                  )}
                  className="flex items-center justify-between w-full text-sm font-medium tracking-wide py-3 text-stone-800"
                >
                  {dropdown.label.toUpperCase()}
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    mobileOpenDropdown === dropdown.label ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {mobileOpenDropdown === dropdown.label && (
                  <div className="pl-4 pb-2 space-y-1">
                    {dropdown.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-stone-600 hover:text-yellow-500 transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileOpenDropdown(null);
                        }}
                      >
                        {item.label}
                        {item.description && (
                          <span className="block text-xs text-stone-400 mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link 
              href="/newsletter" 
              className="block text-sm font-medium tracking-wide py-3 text-stone-800 hover:text-yellow-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NEWSLETTER
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
