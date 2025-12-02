"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
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

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  const inCart = isInCart(product.id);

  const handleClick = () => {
    if (inCart) {
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
      variant={inCart ? "secondary" : "outline"}
      className={`w-full ${inCart ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "border-gray-300 hover:bg-gray-50"} ${className}`}
    >
      {inCart ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {justAdded ? "Added to Cart!" : "In Cart - Remove"}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
