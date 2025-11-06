'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategorySelectorProps {
  selectedCategories: number[];
  onCategoriesChange: (categoryIds: number[]) => void;
}

export function CategorySelector({ selectedCategories, onCategoriesChange }: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        setCategories([...categories, data.category]);
        onCategoriesChange([...selectedCategories, data.category.id]);
        setNewCategoryName('');
        setShowNewCategory(false);
      } else {
        alert(data.error || 'Failed to create category');
      }
    } catch (error) {
      alert('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Categories</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowNewCategory(!showNewCategory)}
          className="h-7 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          New
        </Button>
      </div>

      {showNewCategory && (
        <div className="flex gap-2">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="text-sm h-8"
            disabled={loading}
          />
          <Button
            type="button"
            size="sm"
            onClick={handleCreateCategory}
            disabled={loading || !newCategoryName.trim()}
            className="h-8"
          >
            Add
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowNewCategory(false);
              setNewCategoryName('');
            }}
            className="h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.length === 0 ? (
          <p className="text-xs text-stone-500">No categories yet</p>
        ) : (
          categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-yellow-100"
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))
        )}
      </div>
      
      <p className="text-xs text-stone-500">
        Click categories to add/remove them from this post
      </p>
    </div>
  );
}
