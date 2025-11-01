"use client"

import Link from "next/link";
import { User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-neutral-900 text-white border-b border-neutral-800">
      <div className="bg-neutral-800 text-center py-2 text-xs tracking-wider">
        FREE SHIPPING ON ORDERS $50+ | INSTANT DELIVERY | LIFETIME UPDATES
      </div>
      
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          VCM STORE
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/apps" className="text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
            APPS
          </Link>
          <Link href="/downloads" className="text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
            DOWNLOADS
          </Link>
          <Link href="/funnels" className="text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
            FUNNELS
          </Link>
          <Link href="/freebies" className="text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
            FREEBIES
          </Link>
          <Link href="/videos" className="text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
            VIDEOS
          </Link>
          <Link href="/newsletter" className="text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
            NEWSLETTER
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-neutral-400">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:text-neutral-400">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
