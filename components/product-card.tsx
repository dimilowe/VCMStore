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
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          {product.thumbnail_url && (
            <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
              <img
                src={product.thumbnail_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <Badge variant="secondary" className="capitalize shrink-0">
              {product.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-lg font-bold">
            {isFree ? "Free" : `$${(product.price / 100).toFixed(2)}`}
          </div>
          <Button variant="ghost" size="sm">
            {isFree ? "Get it" : "Buy"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
