"use client"

import Link from "next/link";
import { User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
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
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-stone-800 hover:text-yellow-500">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden text-neutral-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
