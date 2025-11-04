"use client"

import Link from "next/link";
import { User, Search, Menu, LayoutDashboard, ShieldCheck, Settings, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check session status on mount
  useEffect(() => {
    fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn || false);
        setIsCheckingSession(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsCheckingSession(false);
      });
  }, []);

  return (
    <nav className="bg-white text-stone-800 border-b border-stone-200">
      <div className="bg-stone-700 text-white text-center py-2 text-xs tracking-wider">
        SUBSCRIBE TO STAY UP TO DATE ON ALL MY LATEST CREATIONS
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold tracking-wider text-stone-900">
              VCM STORE
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/apps" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                APPS
              </Link>
              <Link href="/downloads" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                DOWNLOADS
              </Link>
              <Link href="/funnels" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                TEMPLATES
              </Link>
              <Link href="/freebies" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                FREEBIES
              </Link>
              <Link href="/videos" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                VIDEOS
              </Link>
              <Link href="/newsletter" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                NEWSLETTER
              </Link>
              <Link href="/chat" className="text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">
                AI CHAT
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
                          
                          <Link href="/admin" onClick={() => setIsProfileOpen(false)}>
                            <div className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer">
                              <ShieldCheck className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium tracking-wide text-stone-800">ADMIN</span>
                            </div>
                          </Link>
                          
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
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <div className="px-6 py-4 space-y-3">
            <Link 
              href="/apps" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              APPS
            </Link>
            <Link 
              href="/downloads" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DOWNLOADS
            </Link>
            <Link 
              href="/funnels" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TEMPLATES
            </Link>
            <Link 
              href="/freebies" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FREEBIES
            </Link>
            <Link 
              href="/videos" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VIDEOS
            </Link>
            <Link 
              href="/newsletter" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NEWSLETTER
            </Link>
            <Link 
              href="/chat" 
              className="block text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI CHAT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
