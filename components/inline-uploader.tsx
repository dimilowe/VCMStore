"use client"

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, X, Loader2, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InlineUploaderProps {
  onUpload: (file: File) => Promise<string>;
  accept?: string;
  maxSize?: number;
  currentUrl?: string;
  onRemove?: () => void;
  placeholder?: string;
  showPreview?: boolean;
}

export function InlineUploader({
  onUpload,
  accept,
  maxSize = 52428800, // 50MB default
  currentUrl,
  onRemove,
  placeholder = "Drop your file here or click to browse",
  showPreview = false,
}: InlineUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      const sizeMB = (maxSize / 1024 / 1024).toFixed(0);
      return `File size must be less than ${sizeMB}MB`;
    }
    return null;
  };

  const handleFile = async (file: File) => {
    setError(null);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await onUpload(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Reset after a short delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setError(null);
    onRemove?.();
  };

  const isImage = currentUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(currentUrl);

  return (
    <div className="space-y-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-all
          ${isDragging 
            ? "border-orange-500 bg-orange-50" 
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }
          ${isUploading ? "opacity-75" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />

        {currentUrl && showPreview && isImage ? (
          <div className="space-y-3">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={currentUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Button
              onClick={handleBrowseClick}
              variant="outline"
              className="w-full"
              type="button"
              disabled={isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Replace Image
            </Button>
          </div>
        ) : currentUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <FileIcon className="h-8 w-8 text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  File uploaded
                </p>
                <p className="text-xs text-gray-500 truncate">{currentUrl}</p>
              </div>
              <button
                onClick={handleRemove}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                type="button"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <Button
              onClick={handleBrowseClick}
              variant="outline"
              className="w-full"
              type="button"
              disabled={isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Replace File
            </Button>
          </div>
        ) : (
          <div className="text-center">
            {isUploading ? (
              <div className="space-y-3">
                <Loader2 className="h-8 w-8 mx-auto text-orange-600 animate-spin" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Uploading...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uploadProgress}%</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    {placeholder}
                  </p>
                  <p className="text-xs text-gray-500">
                    Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                  </p>
                </div>
                <Button
                  onClick={handleBrowseClick}
                  className="bg-gray-700 hover:bg-gray-800"
                  type="button"
                >
                  Browse Files
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
