"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  Copy, 
  Check, 
  Image as ImageIcon,
  Grid3X3,
  LayoutGrid,
  Columns,
  GalleryHorizontal,
  Trash2,
  AlertCircle
} from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

type LayoutType = "grid-3" | "grid-4" | "masonry" | "horizontal";

interface UploadedImage {
  id: string;
  src: string;
  name: string;
  width: number;
  height: number;
}

export default function PhotoGalleryMakerPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [layout, setLayout] = useState<LayoutType>("grid-3");
  const [spacing, setSpacing] = useState(8);
  const [borderRadius, setBorderRadius] = useState(8);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback((files: FileList) => {
    if (files.length > 50) {
      setError("Please upload no more than 50 images at a time.");
      return;
    }

    setError("");
    const imageFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    let loadedCount = 0;
    const newImages: UploadedImage[] = [];

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          newImages.push({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            src: event.target?.result as string,
            name: file.name,
            width: img.width,
            height: img.height,
          });
          loadedCount++;

          if (loadedCount === imageFiles.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) processFiles(files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files) processFiles(files);
  }, [processFiles]);

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAllImages = () => {
    setImages([]);
    setShowPreview(false);
  };

  const generateGallery = () => {
    if (images.length === 0) {
      setError("Please upload at least one photo to create a gallery.");
      return;
    }
    setError("");
    setIsGenerating(true);
    setTimeout(() => {
      setShowPreview(true);
      setIsGenerating(false);
      setStatusMessage("Gallery generated successfully!");
      setTimeout(() => setStatusMessage(""), 3000);
    }, 300);
  };

  const getLayoutStyles = (): React.CSSProperties => {
    switch (layout) {
      case "grid-3":
        return {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: `${spacing}px`,
        };
      case "grid-4":
        return {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: `${spacing}px`,
        };
      case "masonry":
        return {
          columnCount: 3,
          columnGap: `${spacing}px`,
        };
      case "horizontal":
        return {
          display: "flex",
          gap: `${spacing}px`,
          overflowX: "auto",
          paddingBottom: "10px",
        };
      default:
        return {};
    }
  };

  const getImageStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      borderRadius: `${borderRadius}px`,
      display: "block",
    };

    if (layout === "masonry") {
      return {
        ...baseStyles,
        width: "100%",
        marginBottom: `${spacing}px`,
        breakInside: "avoid",
      };
    }

    if (layout === "horizontal") {
      return {
        ...baseStyles,
        height: "200px",
        width: "auto",
        flexShrink: 0,
      };
    }

    return {
      ...baseStyles,
      width: "100%",
      height: "auto",
      objectFit: "cover",
      aspectRatio: "1",
    };
  };

  const downloadAsImage = async () => {
    if (images.length === 0) {
      setError("Please upload and generate a gallery first.");
      return;
    }

    setStatusMessage("Generating PNG...");

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      const loadedImages = await Promise.all(images.map(img => loadImage(img.src)));

      if (layout === "horizontal") {
        const fixedHeight = 300;
        let totalWidth = spacing;
        const imageWidths: number[] = [];
        
        loadedImages.forEach(img => {
          const scaledWidth = (img.width / img.height) * fixedHeight;
          imageWidths.push(scaledWidth);
          totalWidth += scaledWidth + spacing;
        });

        canvas.width = totalWidth;
        canvas.height = fixedHeight + spacing * 2;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let currentX = spacing;
        for (let i = 0; i < loadedImages.length; i++) {
          const img = loadedImages[i];
          const imgWidth = imageWidths[i];
          
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(currentX, spacing, imgWidth, fixedHeight, borderRadius);
          ctx.clip();
          ctx.drawImage(img, currentX, spacing, imgWidth, fixedHeight);
          ctx.restore();
          
          currentX += imgWidth + spacing;
        }
      } else if (layout === "masonry") {
        const columns = 3;
        const canvasWidth = 1200;
        const columnWidth = (canvasWidth - spacing * (columns + 1)) / columns;
        const columnHeights = new Array(columns).fill(spacing);
        const imagePositions: { x: number; y: number; w: number; h: number; imgIndex: number }[] = [];

        loadedImages.forEach((img, i) => {
          const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));
          const aspectRatio = img.height / img.width;
          const imgHeight = columnWidth * aspectRatio;
          const x = spacing + shortestCol * (columnWidth + spacing);
          const y = columnHeights[shortestCol];
          
          imagePositions.push({ x, y, w: columnWidth, h: imgHeight, imgIndex: i });
          columnHeights[shortestCol] += imgHeight + spacing;
        });

        const canvasHeight = Math.max(...columnHeights);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const pos of imagePositions) {
          const img = loadedImages[pos.imgIndex];
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(pos.x, pos.y, pos.w, pos.h, borderRadius);
          ctx.clip();
          ctx.drawImage(img, pos.x, pos.y, pos.w, pos.h);
          ctx.restore();
        }
      } else {
        const columns = layout === "grid-4" ? 4 : 3;
        const canvasWidth = 1200;
        const cellWidth = (canvasWidth - spacing * (columns + 1)) / columns;
        const cellHeight = cellWidth;
        const rows = Math.ceil(images.length / columns);
        const canvasHeight = rows * cellHeight + spacing * (rows + 1);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        for (let i = 0; i < loadedImages.length; i++) {
          const img = loadedImages[i];
          const col = i % columns;
          const row = Math.floor(i / columns);
          const x = spacing + col * (cellWidth + spacing);
          const y = spacing + row * (cellHeight + spacing);

          const scale = Math.max(cellWidth / img.width, cellHeight / img.height);
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          const offsetX = (scaledWidth - cellWidth) / 2;
          const offsetY = (scaledHeight - cellHeight) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.roundRect(x, y, cellWidth, cellHeight, borderRadius);
          ctx.clip();
          ctx.drawImage(img, x - offsetX, y - offsetY, scaledWidth, scaledHeight);
          ctx.restore();
        }
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "photo-gallery.png";
      link.href = dataUrl;
      link.click();

      setStatusMessage("PNG downloaded successfully!");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      setStatusMessage("");
    }
  };

  const generateHtmlCss = (): string => {
    const layoutCss = (() => {
      switch (layout) {
        case "grid-3":
          return `  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing}px;`;
        case "grid-4":
          return `  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing}px;`;
        case "masonry":
          return `  column-count: 3;
  column-gap: ${spacing}px;`;
        case "horizontal":
          return `  display: flex;
  gap: ${spacing}px;
  overflow-x: auto;`;
        default:
          return "";
      }
    })();

    const imageCss = layout === "masonry" 
      ? `  width: 100%;
  margin-bottom: ${spacing}px;
  break-inside: avoid;`
      : layout === "horizontal"
      ? `  height: 200px;
  width: auto;
  flex-shrink: 0;`
      : `  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;`;

    const imageHtml = images
      .map((_, i) => `  <img src="photo-${i + 1}.jpg" alt="Gallery photo ${i + 1}">`)
      .join("\n");

    return `<!-- HTML -->
<div class="my-photo-gallery">
${imageHtml}
</div>

<!-- CSS -->
<style>
.my-photo-gallery {
${layoutCss}
  background: ${bgColor};
  padding: ${spacing}px;
}

.my-photo-gallery img {
${imageCss}
  border-radius: ${borderRadius}px;
  display: block;
}
</style>

<!-- Note: Replace photo-1.jpg, photo-2.jpg, etc. with your actual image URLs -->`;
  };

  const copyHtmlCss = async () => {
    if (images.length === 0) {
      setError("Please upload and generate a gallery first.");
      return;
    }

    try {
      const snippet = generateHtmlCss();
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setStatusMessage("HTML & CSS copied to clipboard!");
      setTimeout(() => {
        setCopied(false);
        setStatusMessage("");
      }, 3000);
    } catch (err) {
      setError("Failed to copy to clipboard. Please try again.");
    }
  };

  const layoutOptions = [
    { value: "grid-3", label: "Grid – 3 columns", icon: Grid3X3 },
    { value: "grid-4", label: "Grid – 4 columns", icon: LayoutGrid },
    { value: "masonry", label: "Masonry – Pinterest style", icon: Columns },
    { value: "horizontal", label: "Horizontal strip", icon: GalleryHorizontal },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <MonetizationBar />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
            <ImageIcon className="w-4 h-4" />
            Free Photo Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Photo Gallery Maker – Create a Gallery of Photos Online
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload images, choose a layout, and instantly create a <strong>gallery of photos</strong> for your website, blog, or social media. Export as PNG or copy the HTML & CSS code.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  isDragging 
                    ? "border-orange-500 bg-orange-100" 
                    : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
                }`}
              >
                <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragging ? "text-orange-500" : "text-gray-400"}`} />
                <p className="text-sm text-gray-600">
                  {isDragging ? "Drop images here..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 50 images
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">
                Images are processed in your browser and not uploaded to our server.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Layout
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {layoutOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setLayout(option.value as LayoutType)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                        layout === option.value
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      <span className="truncate">{option.label.split(" – ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spacing: {spacing}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="2"
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Corner Radius: {borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="2"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {images.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {images.length} photo{images.length !== 1 ? "s" : ""} selected
                </span>
                <button
                  onClick={clearAllImages}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img) => (
                  <div key={img.id} className="relative flex-shrink-0">
                    <img
                      src={img.src}
                      alt={img.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {statusMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
              <Check className="w-4 h-4" />
              {statusMessage}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={generateGallery}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  Generate Gallery
                </>
              )}
            </button>
            <button
              onClick={downloadAsImage}
              disabled={!showPreview}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>
            <button
              onClick={copyHtmlCss}
              disabled={!showPreview}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy HTML & CSS
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gallery Preview</h2>
          <div
            ref={previewRef}
            className="min-h-[200px] rounded-xl border border-dashed border-gray-300 overflow-hidden"
            style={{ backgroundColor: bgColor, padding: showPreview ? `${spacing}px` : 0 }}
          >
            {!showPreview ? (
              <div className="flex items-center justify-center h-[200px] text-gray-400">
                <p>Upload photos and click "Generate Gallery" to see preview</p>
              </div>
            ) : images.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-gray-400">
                <p>No photos to display</p>
              </div>
            ) : (
              <div style={getLayoutStyles()}>
                {images.map((img) => (
                  <img
                    key={img.id}
                    src={img.src}
                    alt={img.name}
                    style={getImageStyles()}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <PostResultUpsell />

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Gallery of Photos?</h2>
            <p className="text-gray-600 leading-relaxed">
              A gallery of photos is a visual arrangement of multiple images displayed together in an organized layout. Photo galleries are essential for showcasing portfolios, product collections, event highlights, travel memories, and creative projects. Whether you're a photographer, business owner, blogger, or creator, a well-designed photo gallery helps tell your story and engage your audience. This free tool lets you create stunning galleries without any design skills or expensive software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Photo Gallery Layouts</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Grid Galleries</h3>
                <p className="text-sm text-gray-600">
                  Clean, uniform layouts with equal-sized cells. Perfect for product photos, team headshots, or any collection where consistency matters. Choose between 3 or 4 columns based on your content.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Masonry Galleries</h3>
                <p className="text-sm text-gray-600">
                  Pinterest-style layouts that preserve image aspect ratios. Ideal for mixed portrait and landscape photos, creative portfolios, and artistic collections where varied dimensions add visual interest.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Horizontal Strips</h3>
                <p className="text-sm text-gray-600">
                  Scrollable single-row galleries perfect for featured images, product showcases, or timeline-style presentations. Great for headers and hero sections.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Social Media Collages</h3>
                <p className="text-sm text-gray-600">
                  Combined layouts optimized for Instagram, Facebook, and other platforms. Download as a single image to share your collection in one post.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Create a Gallery of Photos</h2>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                <div>
                  <p className="font-medium text-gray-900">Upload your photos</p>
                  <p className="text-sm text-gray-600">Click the upload area or drag and drop up to 50 images. All processing happens in your browser for complete privacy.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                <div>
                  <p className="font-medium text-gray-900">Choose your layout</p>
                  <p className="text-sm text-gray-600">Select from Grid (3 or 4 columns), Masonry (Pinterest-style), or Horizontal strip layouts.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                <div>
                  <p className="font-medium text-gray-900">Customize the appearance</p>
                  <p className="text-sm text-gray-600">Adjust spacing between photos, corner radius, and background color to match your brand or style.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">4</span>
                <div>
                  <p className="font-medium text-gray-900">Generate and export</p>
                  <p className="text-sm text-gray-600">Click "Generate Gallery" to preview, then download as PNG for social media or copy HTML/CSS code for your website.</p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Uses for a Gallery of Photos</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Photography portfolios and showcases",
                "E-commerce product collections",
                "Blog post image galleries",
                "Event and wedding photo displays",
                "Travel and adventure photo journals",
                "Real estate property listings",
                "Social media photo collages",
                "Team and company about pages",
                "Before/after transformation galleries",
                "Art and creative project showcases",
              ].map((use, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  {use}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Are my photos uploaded to a server?</h3>
                <p className="text-sm text-gray-600">
                  No. All photo processing happens entirely in your browser. Your images never leave your device, ensuring complete privacy and security.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">What image formats are supported?</h3>
                <p className="text-sm text-gray-600">
                  This tool supports all common image formats including PNG, JPG, JPEG, GIF, and WebP. You can upload up to 50 images at once.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">How do I use the HTML/CSS code on my website?</h3>
                <p className="text-sm text-gray-600">
                  Copy the generated code snippet and paste it into your website's HTML. Replace the placeholder image filenames (photo-1.jpg, photo-2.jpg, etc.) with your actual image URLs.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use this for commercial projects?</h3>
                <p className="text-sm text-gray-600">
                  Yes! The gallery code and downloaded images are yours to use however you like, including commercial websites, social media, and marketing materials.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center text-sm text-gray-500 mt-8 pb-8">
          All images are handled locally in your browser. No data is sent to any server.
        </footer>
      </div>
    </div>
  );
}
