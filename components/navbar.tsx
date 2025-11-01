"use client"

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          VCM Store
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/store" className="text-sm font-medium hover:underline">
            Store
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:underline">
            Blog
          </Link>
          <Link href="/strategy-ai" className="text-sm font-medium hover:underline">
            AI Strategy
          </Link>
          <Link href="/newsletter" className="text-sm font-medium hover:underline">
            Newsletter
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
