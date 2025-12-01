'use client';

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaLibrary } from '@/components/MediaLibrary';

interface FeaturedImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function FeaturedImageUploader({ value, onChange, disabled }: FeaturedImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('upload');
  const [showLibrary, setShowLibrary] = useState(false);
  
  const containerMaxWidth = '268px';

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await uploadFile(files[0]);
    }
  };

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
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleLibrarySelect = (url: string) => {
    onChange(url);
    setShowLibrary(false);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Featured Image</h3>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-2 rounded text-xs">
          {error}
        </div>
      )}

      <div className="flex gap-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'upload'
              ? 'bg-orange-100 text-orange-700 font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          disabled={disabled}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
            activeTab === 'library'
              ? 'bg-orange-100 text-orange-700 font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          disabled={disabled}
        >
          <ImageIcon className="w-3 h-3" />
          Library
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'url'
              ? 'bg-orange-100 text-orange-700 font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          disabled={disabled}
        >
          URL
        </button>
      </div>

      {activeTab === 'upload' && (
        <>
          {!value ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                  <p className="text-xs text-gray-600">Uploading...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-medium mb-1">
                    Drag image here
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    id="featured-image-upload"
                    disabled={uploading || disabled}
                  />
                  <label htmlFor="featured-image-upload" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs pointer-events-none"
                      disabled={disabled}
                    >
                      Choose File
                    </Button>
                  </label>
                </>
              )}
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border" style={{ maxWidth: containerMaxWidth }}>
              <img 
                src={value} 
                alt="Featured" 
                className="w-full h-32 object-cover block"
                style={{ maxWidth: containerMaxWidth }}
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 flex-shrink-0"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'library' && (
        <>
          {value && (
            <div className="relative rounded-lg overflow-hidden border" style={{ maxWidth: containerMaxWidth }}>
              <img 
                src={value} 
                alt="Featured" 
                className="w-full h-32 object-cover block"
                style={{ maxWidth: containerMaxWidth }}
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 flex-shrink-0"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowLibrary(true)}
            className="w-full text-xs"
            disabled={disabled}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            {value ? 'Change Image' : 'Browse Media Library'}
          </Button>
        </>
      )}

      {activeTab === 'url' && (
        <>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
          {value && (
            <div className="rounded-lg overflow-hidden border" style={{ maxWidth: containerMaxWidth }}>
              <img 
                src={value} 
                alt="Featured" 
                className="w-full h-32 object-cover block"
                style={{ maxWidth: containerMaxWidth }}
              />
            </div>
          )}
        </>
      )}
      
      <p className="text-xs text-gray-500">
        Image URL for social sharing and post listings
      </p>

      {showLibrary && (
        <MediaLibrary
          onSelect={handleLibrarySelect}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </div>
  );
}
