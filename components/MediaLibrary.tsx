'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaLibraryProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

interface MediaItem {
  filename: string;
  url: string;
  uploadedAt: number;
}

export function MediaLibrary({ onSelect, onClose }: MediaLibraryProps) {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const res = await fetch('/api/media/list', {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      } else {
        setError(data.error || 'Failed to load images');
      }
    } catch (err) {
      setError('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
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
        // Reload images to show the new upload
        await loadImages();
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleInsert = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Media Library</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Section */}
        <div className="p-6 border-b bg-stone-50">
          <label className="block">
            <div className="flex items-center gap-3 cursor-pointer">
              <Button type="button" disabled={uploading} className="gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload New Image
                  </>
                )}
              </Button>
              <span className="text-sm text-stone-600">
                Upload a new image to your media library
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </div>

        {/* Images Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-stone-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">No images yet</p>
              <p className="text-sm">Upload your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.filename}
                  onClick={() => setSelectedUrl(image.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${
                    selectedUrl === image.url
                      ? 'border-blue-500 shadow-lg'
                      : 'border-transparent hover:border-stone-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                  {selectedUrl === image.url && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between items-center">
          <p className="text-sm text-stone-600">
            {selectedUrl ? 'Click "Insert" to add the selected image' : 'Select an image to insert'}
          </p>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleInsert}
              disabled={!selectedUrl}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Insert Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
