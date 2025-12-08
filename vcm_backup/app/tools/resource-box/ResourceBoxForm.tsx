"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Link2, Wrench, Gift } from "lucide-react";

interface InternalResource {
  id: number;
  name: string;
  slug: string;
  url: string;
  category: string;
  short_tag: string | null;
  description: string | null;
}

interface BoxItem {
  label: string;
  description: string;
  itemType: "external" | "internal_tool" | "internal_freebie";
  externalUrl: string;
  internalResourceId: string;
}

interface ResourceBoxFormProps {
  tools: InternalResource[];
  freebies: InternalResource[];
}

const emptyItem: BoxItem = {
  label: "",
  description: "",
  itemType: "external",
  externalUrl: "",
  internalResourceId: "",
};

export function ResourceBoxForm({ tools, freebies }: ResourceBoxFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [accentColor, setAccentColor] = useState("#eab308");
  const [items, setItems] = useState<BoxItem[]>([{ ...emptyItem }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addItem = () => {
    if (items.length < 4) {
      setItems([...items, { ...emptyItem }]);
    }
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof BoxItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === "itemType") {
      newItems[index].externalUrl = "";
      newItems[index].internalResourceId = "";
    }
    
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a title for your resource box.");
      return;
    }

    const validItems = items.filter(item => item.label.trim());
    if (validItems.length === 0) {
      setError("Please add at least one item with a label.");
      return;
    }

    for (const item of validItems) {
      if (item.itemType === "external" && !item.externalUrl.trim()) {
        setError(`Please enter a URL for "${item.label}".`);
        return;
      }
      if ((item.itemType === "internal_tool" || item.itemType === "internal_freebie") && !item.internalResourceId) {
        setError(`Please select a resource for "${item.label}".`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/resource-box", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim() || null,
          accentColor,
          items: validItems.map((item, i) => ({
            label: item.label.trim(),
            description: item.description.trim() || null,
            itemType: item.itemType,
            externalUrl: item.itemType === "external" ? item.externalUrl.trim() : null,
            internalResourceId: item.itemType !== "external" ? parseInt(item.internalResourceId) : null,
            position: i + 1,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create resource box");
      }

      router.push(`/tools/resource-box/${data.slug}/success`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Box Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Creator Resources"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            maxLength={100}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle (optional)
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Tools I use every day"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            maxLength={200}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accent Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            placeholder="#eab308"
            className="w-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 font-mono text-sm"
          />
          <div className="flex gap-2">
            {["#eab308", "#3b82f6", "#22c55e", "#ef4444", "#8b5cf6", "#ec4899"].map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setAccentColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${accentColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Resource Links (up to 4)</h3>
          {items.length < 4 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Item {index + 1}</span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateItem(index, "label", e.target.value)}
                    placeholder="My Favorite Tool"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    placeholder="Brief description"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    maxLength={200}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Type
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateItem(index, "itemType", "external")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      item.itemType === "external"
                        ? "bg-orange-50 border-orange-400 text-orange-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    External URL
                  </button>
                  <button
                    type="button"
                    onClick={() => updateItem(index, "itemType", "internal_tool")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      item.itemType === "internal_tool"
                        ? "bg-orange-50 border-orange-400 text-orange-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Wrench className="w-4 h-4" />
                    VCM Tool
                  </button>
                  {freebies.length > 0 && (
                    <button
                      type="button"
                      onClick={() => updateItem(index, "itemType", "internal_freebie")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        item.itemType === "internal_freebie"
                          ? "bg-orange-50 border-orange-400 text-orange-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      VCM Freebie
                    </button>
                  )}
                </div>
              </div>

              {item.itemType === "external" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={item.externalUrl}
                    onChange={(e) => updateItem(index, "externalUrl", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              )}

              {item.itemType === "internal_tool" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Tool <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={item.internalResourceId}
                    onChange={(e) => updateItem(index, "internalResourceId", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="">Choose a tool...</option>
                    {tools.map(tool => (
                      <option key={tool.id} value={tool.id}>
                        {tool.name} - {tool.description}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {item.itemType === "internal_freebie" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Freebie <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={item.internalResourceId}
                    onChange={(e) => updateItem(index, "internalResourceId", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="">Choose a freebie...</option>
                    {freebies.map(freebie => (
                      <option key={freebie.id} value={freebie.id}>
                        {freebie.name} - {freebie.description}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Resource Box"
          )}
        </Button>
      </div>
    </form>
  );
}
