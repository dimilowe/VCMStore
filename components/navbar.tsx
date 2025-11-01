"use client"

import Link from "next/link";
import { User, Search, Menu, LayoutDashboard, ShieldCheck, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  return (
    <nav className="bg-white text-stone-800 border-b border-stone-200">
      <div className="bg-stone-700 text-white text-center py-2 text-xs tracking-wider">
        FREE SHIPPING ON ORDERS $50+ | INSTANT DELIVERY | LIFETIME UPDATES
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
                FUNNELS
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
                          const response = await fetch('/api/admin/logout', { method: 'POST' });
                          if (!response.ok) {
                            console.error('Logout failed:', response.statusText);
                          }
                        } catch (error) {
                          console.error('Logout error:', error);
                        }
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
            
            <Button variant="ghost" size="icon" className="md:hidden text-neutral-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
