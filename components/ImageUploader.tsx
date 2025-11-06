'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onCancel: () => void;
  defaultUrl?: string;
}

export function ImageUploader({ onUploadComplete, onCancel, defaultUrl = '' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultUrl);
  const [altText, setAltText] = useState('');
  const [error, setError] = useState('');
  const [useUrl, setUseUrl] = useState(!!defaultUrl);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await uploadFile(files[0]);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const files = e.target.files;
    if (files && files[0]) {
      await uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.url);
        setUseUrl(false);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleInsert = () => {
    if (!imageUrl) {
      setError('Please provide an image');
      return;
    }
    onUploadComplete(imageUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Image</h3>
          <button onClick={onCancel} className="hover:bg-stone-100 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex gap-2 mb-4 border-b">
          <button
            onClick={() => setUseUrl(false)}
            className={`px-4 py-2 font-medium transition-colors ${
              !useUrl
                ? 'border-b-2 border-yellow-500 text-yellow-600'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setUseUrl(true)}
            className={`px-4 py-2 font-medium transition-colors ${
              useUrl
                ? 'border-b-2 border-yellow-500 text-yellow-600'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            From URL
          </button>
        </div>

        {!useUrl ? (
          <>
            {/* Drag and Drop Area */}
            {!imageUrl && (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-stone-300 hover:border-stone-400'
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                    <p className="text-sm text-stone-600">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                    <p className="text-sm font-medium mb-1">
                      Drag and drop an image here
                    </p>
                    <p className="text-xs text-stone-500 mb-4">
                      or click to browse (max 10MB)
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      disabled={uploading}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        asChild
                      >
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </>
                )}
              </div>
            )}

            {/* Preview */}
            {imageUrl && !uploading && (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border">
                  <img src={imageUrl} alt="Preview" className="w-full" />
                  <button
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Alt Text (optional)
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe the image..."
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Alt Text (optional)
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image..."
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            {imageUrl && (
              <div className="rounded-lg overflow-hidden border">
                <img src={imageUrl} alt="Preview" className="w-full" />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={handleInsert}
            disabled={!imageUrl || uploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Insert Image
          </Button>
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
