import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductRecommendations } from "@/components/product-recommendations";
import { ClaimButton } from "@/components/claim-button";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail_url: string;
  type: string;
  price_type: string;
  price: number;
  stripe_price_id: string;
  meta: any;
}

async function getProduct(slug: string): Promise<Product | null> {
  const result = await query(
    `SELECT * FROM products WHERE slug = $1 AND visibility = 'public'`,
    [slug]
  );
  return result.rows[0] || null;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const isFree = product.price_type === "free" || product.price === 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          {product.thumbnail_url && (
            <div className="aspect-video bg-stone-50 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
              <img
                src={product.thumbnail_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="secondary" className="capitalize mb-4">
              {product.type}
            </Badge>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            {product.description}
          </p>

          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold">
                {isFree ? "Free" : `$${(product.price / 100).toFixed(2)}`}
              </div>
            </div>
            
            <ClaimButton product={product} />
          </Card>

          {product.meta?.features && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">What's included:</h3>
              <ul className="space-y-2">
                {product.meta.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ProductRecommendations currentProductId={product.id} productType={product.type} />
    </div>
  );
}
