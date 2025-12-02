"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface SaveItemButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    type: string;
    thumbnail_url?: string;
  };
  className?: string;
}

export function SaveItemButton({ product, className }: SaveItemButtonProps) {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  const isSaved = isInCart(product.id);

  const handleClick = () => {
    if (isSaved) {
      removeFromCart(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price / 100,
        type: product.type,
        image: product.thumbnail_url,
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={isSaved ? "secondary" : "outline"}
      className={`w-full ${isSaved ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" : "border-gray-300 hover:bg-gray-50"} ${className}`}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          {justAdded ? "Saved!" : "Saved - Remove"}
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Save for Later
        </>
      )}
    </Button>
  );
}

export { SaveItemButton as AddToCartButton };
