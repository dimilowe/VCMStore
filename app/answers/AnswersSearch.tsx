"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function AnswersSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/answers?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-stone-200 rounded-full shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all"
        />
      </div>
    </form>
  );
}
