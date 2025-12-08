"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { InlineUploader } from "@/components/inline-uploader";
import { Plus, Edit, Trash2, BookOpen, Layers, Search, ChevronLeft, ChevronRight, Wrench, LayoutGrid, FileText, Zap, Globe, Activity } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  price_type: string;
  price: number;
  thumbnail_url: string | null;
  download_url: string | null;
  external_url: string | null;
  visibility: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  
  // Form state
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    description: "",
    type: "app",
    price_type: "free",
    price: 0,
    thumbnail_url: "",
    download_url: "",
    external_url: "",
    visibility: "public",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check", {
        credentials: 'include'
      });
      const data = await res.json();
      setIsAuthenticated(data.isAdmin);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: 'include'
      });

      if (res.ok) {
        setPassword("");
        setIsAuthenticated(true);
        // Small delay to ensure session cookie is set
        await new Promise(resolve => setTimeout(resolve, 300));
        // Load products directly
        await loadProducts();
      } else {
        alert("Invalid password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { 
      method: "POST",
      credentials: 'include'
    });
    setIsAuthenticated(false);
    router.refresh();
  };

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/admin/products", {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to load products - Status:", res.status, "Data:", data);
        alert(`Failed to load products: ${data.error || 'Unknown error'}`);
        return;
      }
      console.log("Products loaded successfully:", data.products?.length || 0, "products");
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      alert("Failed to load products - check console for details");
    }
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    // Create form data with file
    const formData = new FormData();
    formData.append("file", file);
    
    // Upload file directly to backend
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error("Failed to upload file");
    }
    
    const data = await res.json();
    
    if (!data.fileUrl) {
      throw new Error("No file URL returned");
    }
    
    // Return the file URL
    return data.fileUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      
      const method = editingProduct ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await loadProducts();
        resetForm();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      slug: product.slug,
      name: product.name,
      description: product.description,
      type: product.type,
      price_type: product.price_type,
      price: Math.round(parseFloat(product.price as any)),
      thumbnail_url: product.thumbnail_url || "",
      download_url: product.download_url || "",
      external_url: product.external_url || "",
      visibility: product.visibility,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      name: "",
      description: "",
      type: "app",
      price_type: "free",
      price: 0,
      thumbnail_url: "",
      download_url: "",
      external_url: "",
      visibility: "public",
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query) ||
      product.type.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blog">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Blog
              </Button>
            </Link>
            <Link href="/admin/mbbs">
              <Button variant="outline">
                <Layers className="mr-2 h-4 w-4" />
                Manage MBBs
              </Button>
            </Link>
            <Link href="/admin/tools">
              <Button variant="outline">
                <Wrench className="mr-2 h-4 w-4" />
                Tool Control
              </Button>
            </Link>
            <Link href="/admin/clusters">
              <Button variant="outline">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Cluster Control
              </Button>
            </Link>
            <Link href="/admin/articles">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Article Control
              </Button>
            </Link>
            <Link href="/admin/engines">
              <Button variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Engine Factory
              </Button>
            </Link>
            <Link href="/admin/indexing">
              <Button variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                URL Registry
              </Button>
            </Link>
            <Link href="/admin/seo-health">
              <Button variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                SEO Health
              </Button>
            </Link>
            <Button onClick={() => setShowForm(true)} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              placeholder="Search products by name, slug, type, or description..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Products ({filteredProducts.length})</h2>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Slug (URL-friendly)"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <select
                    className="border rounded px-3 py-2"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="app">App</option>
                    <option value="download">Download</option>
                    <option value="funnel">Template</option>
                    <option value="freebie">Freebie</option>
                    <option value="video">Video</option>
                    <option value="course">Course</option>
                    <option value="invisible">Invisible</option>
                  </select>

                  <select
                    className="border rounded px-3 py-2"
                    value={formData.price_type}
                    onChange={(e) => setFormData({ ...formData, price_type: e.target.value })}
                  >
                    <option value="free">Free</option>
                    <option value="one_time">One-time</option>
                  </select>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="10.00"
                      className="pl-8"
                      value={(formData.price / 100).toFixed(2)}
                      onChange={(e) => setFormData({ ...formData, price: Math.round(parseFloat(e.target.value || '0') * 100) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Thumbnail Image</label>
                  <InlineUploader
                    onUpload={async (file) => {
                      const url = await handleFileUpload(file);
                      setFormData({ ...formData, thumbnail_url: url });
                      return url;
                    }}
                    accept="image/*"
                    maxSize={20971520}
                    currentUrl={formData.thumbnail_url}
                    onRemove={() => setFormData({ ...formData, thumbnail_url: "" })}
                    placeholder="Drop your image here or click to browse"
                    showPreview={true}
                  />
                </div>

                {formData.type === "app" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">External URL (for apps)</label>
                    <Input
                      placeholder="https://your-app-url.com"
                      value={formData.external_url}
                      onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">The URL where users will be redirected when they click "Check It Out"</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Download File (for freebies/downloads)</label>
                  <InlineUploader
                    onUpload={async (file) => {
                      const url = await handleFileUpload(file);
                      setFormData({ ...formData, download_url: url });
                      return url;
                    }}
                    maxSize={524288000}
                    currentUrl={formData.download_url}
                    onRemove={() => setFormData({ ...formData, download_url: "" })}
                    placeholder="Drop your file here or click to browse"
                    showPreview={false}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    {editingProduct ? "Update Product" : "Create Product"}
                  </Button>
                  <Button type="button" onClick={resetForm} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                {product.thumbnail_url && (
                  <div className="w-full h-48 bg-gray-50 rounded mb-4 relative overflow-hidden">
                    <Image
                      src={product.thumbnail_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain rounded"
                      unoptimized
                    />
                  </div>
                )}
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{product.type}</Badge>
                  <Badge variant="secondary">
                    {product.price_type === "free"
                      ? "Free"
                      : `$${(product.price / 100).toFixed(2)}`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(product)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                {searchQuery 
                  ? `No products found matching "${searchQuery}"`
                  : 'No products created yet. Click "Add Product" to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 mt-6 border-t">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
