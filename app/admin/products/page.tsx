"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { InlineUploader } from "@/components/inline-uploader";
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight, Package } from "lucide-react";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
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
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/admin/products", { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) throw new Error("Failed to upload file");
    const data = await res.json();
    if (!data.fileUrl) throw new Error("No file URL returned");
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
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package className="w-6 h-6 text-orange-500" />
              Products
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your digital products and downloads
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-12 h-12"
          />
        </div>

        {showForm && (
          <Card>
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
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
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
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Download File</label>
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
                  <div className="w-full h-40 bg-gray-100 rounded mb-4 relative overflow-hidden flex items-center justify-center">
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
                    {product.price_type === "free" ? "Free" : `$${(product.price / 100).toFixed(2)}`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(product)} variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(product.id)} variant="destructive" size="sm">
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
              <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                {searchQuery ? `No products found matching "${searchQuery}"` : 'No products yet. Click "Add Product" to get started.'}
              </p>
            </CardContent>
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
