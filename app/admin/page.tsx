"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { InlineUploader } from "@/components/inline-uploader";
import { Plus, Edit, Trash2 } from "lucide-react";

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
      price: Math.round(parseFloat(product.price as any) * 100),
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
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
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={() => setShowForm(true)} className="bg-yellow-500 hover:bg-yellow-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
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
                  </select>

                  <select
                    className="border rounded px-3 py-2"
                    value={formData.price_type}
                    onChange={(e) => setFormData({ ...formData, price_type: e.target.value })}
                  >
                    <option value="free">Free</option>
                    <option value="one_time">One-time</option>
                  </select>

                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Price (in dollars)"
                    value={formData.price / 100}
                    onChange={(e) => setFormData({ ...formData, price: Math.round(parseFloat(e.target.value) * 100) || 0 })}
                  />
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
                    <p className="text-xs text-stone-500">The URL where users will be redirected when they click "Check It Out"</p>
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
                  <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
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
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                {product.thumbnail_url && (
                  <div className="w-full h-48 bg-stone-50 rounded mb-4 flex items-center justify-center">
                    <img
                      src={product.thumbnail_url}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain rounded"
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
                <p className="text-sm text-stone-600 mb-4 line-clamp-3">
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
      </div>
    </div>
  );
}
