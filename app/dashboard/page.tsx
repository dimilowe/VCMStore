import { query } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Entitlement {
  product_id: string;
  product_name: string;
  product_slug: string;
  product_type: string;
  thumbnail_url: string;
  created_at: Date;
}

async function getUserEntitlements(userId: string): Promise<Entitlement[]> {
  const result = await query(
    `SELECT 
      e.product_id,
      p.name as product_name,
      p.slug as product_slug,
      p.type as product_type,
      p.thumbnail_url,
      e.created_at
     FROM entitlements e
     JOIN products p ON e.product_id = p.id
     WHERE e.user_id = $1
     ORDER BY e.created_at DESC`,
    [userId]
  );
  return result.rows;
}

export default async function DashboardPage() {
  const userId = "00000000-0000-0000-0000-000000000000";
  const entitlements = await getUserEntitlements(userId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Access all your purchased products and courses
        </p>
      </div>

      {entitlements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              You don't have any products yet.
            </p>
            <Link
              href="/store"
              className="text-primary hover:underline font-medium"
            >
              Browse the store
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entitlements.map((item) => (
            <Link
              key={item.product_id}
              href={`/${item.product_type}s/${item.product_slug}`}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                {item.thumbnail_url && (
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={item.thumbnail_url}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{item.product_name}</CardTitle>
                    <Badge variant="secondary" className="capitalize shrink-0">
                      {item.product_type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Added {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
