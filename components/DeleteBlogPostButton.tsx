'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteBlogPostButtonProps {
  postId: number;
  postTitle: string;
}

export function DeleteBlogPostButton({ postId, postTitle }: DeleteBlogPostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        router.refresh();
      } else {
        alert(data.error || 'Failed to delete post');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4 mr-1" />
      Delete
    </Button>
  );
}
