'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  post_count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(`/newsletter?category=${slug}`);
  };

  const clearFilter = () => {
    router.push('/newsletter');
  };

  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-gray-700">Filter by Category</h3>
        {selectedCategory && (
          <button
            onClick={clearFilter}
            className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              selectedCategory === category.slug
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'hover:bg-orange-100'
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name} ({category.post_count})
          </Badge>
        ))}
      </div>
    </div>
  );
}
