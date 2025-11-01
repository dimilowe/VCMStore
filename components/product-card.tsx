import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail_url: string;
  type: string;
  price_type: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isFree = product.price_type === "free" || product.price === 0;
  
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-neutral-200 group">
        <CardHeader className="p-0">
          {product.thumbnail_url && (
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
              <img
                src={product.thumbnail_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-base font-semibold tracking-wide text-neutral-900">{product.name}</CardTitle>
            <Badge variant="outline" className="capitalize shrink-0 text-xs border-amber-600 text-amber-600">
              {product.type}
            </Badge>
          </div>
          <p className="text-sm text-neutral-600 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <div className="text-lg font-bold text-neutral-900">
            {isFree ? "Free" : `$${(product.price / 100).toFixed(2)}`}
          </div>
          <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700">
            {isFree ? "Claim" : "View"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
