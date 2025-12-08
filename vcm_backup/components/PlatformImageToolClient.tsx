"use client";

import { useState, useRef } from "react";
import { Upload, Download, Image as ImageIcon, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import type { PlatformImagePreset } from "@/data/platformImagePresets";

type PlatformImageToolClientProps = {
  preset: PlatformImagePreset;
};

export default function PlatformImageToolClient({ preset }: PlatformImageToolClientProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [resizedBlobUrl, setResizedBlobUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setResizedBlobUrl(null);

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > preset.maxFileSizeMB) {
      setError(`File too large. Maximum size is ${preset.maxFileSizeMB}MB`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setOriginalPreviewUrl(url);
  };

  const handleResize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("presetId", preset.id);

      const response = await fetch("/api/platform-image/resize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resize image");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setResizedBlobUrl(blobUrl);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalPreviewUrl(null);
    setResizedBlobUrl(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {preset.seo.h1}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Resize images to <span className="font-semibold text-orange-600">{preset.width} × {preset.height}</span> pixels
        </p>
        <p className="text-sm text-gray-500">
          Aspect Ratio: {preset.aspectRatioLabel} • Max file size: {preset.maxFileSizeMB}MB
        </p>
      </div>

      {preset.ui.notes && preset.ui.notes.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-medium text-orange-800 mb-2">Pro Tips:</h3>
          <ul className="space-y-1">
            {preset.ui.notes.map((note, index) => (
              <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {!selectedFile ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <p className="mb-2 text-lg font-medium text-gray-700">
                Click to upload an image
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, or WebP up to {preset.maxFileSizeMB}MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Original Image
                </h3>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                  {originalPreviewUrl && (
                    <img
                      src={originalPreviewUrl}
                      alt="Original"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Resized Image ({preset.width}×{preset.height})
                </h3>
                <div 
                  className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{ aspectRatio: `${preset.width}/${preset.height}` }}
                >
                  {resizedBlobUrl ? (
                    <img
                      src={resizedBlobUrl}
                      alt="Resized"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click "Resize" to see preview</p>
                    </div>
                  )}
                  {preset.ui.showSafeZoneOverlay && resizedBlobUrl && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Image resized successfully! Click download to save.</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleResize}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    Resize Image
                  </>
                )}
              </button>

              {resizedBlobUrl && (
                <a
                  href={resizedBlobUrl}
                  download={`${preset.id}-${preset.width}x${preset.height}.jpg`}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Resized Image
                </a>
              )}

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Upload New Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
