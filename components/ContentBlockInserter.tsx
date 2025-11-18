'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from '@/components/ImageUploader';
import { MediaLibrary } from '@/components/MediaLibrary';
import { 
  Image as ImageIcon, 
  Video, 
  Quote, 
  Code, 
  List, 
  Heading2,
  Grid3x3,
  Link as LinkIcon,
  X
} from 'lucide-react';

interface BlockInserterProps {
  onInsert: (html: string) => void;
  onBeforeInsert?: () => void;
}

export function ContentBlockInserter({ onInsert, onBeforeInsert }: BlockInserterProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [codeText, setCodeText] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState('');

  const handleInsertImage = (imageUrl: string) => {
    // Insert image with proper paragraph wrapping for Tiptap
    const html = `<p><img src="${imageUrl}" alt="Image" /></p>`;
    onInsert(html);
    setActiveModal(null);
    setShowMediaLibrary(false);
  };

  const handleMediaLibrarySelect = (url: string) => {
    handleInsertImage(url);
  };

  const handleInsertVideo = () => {
    if (!videoUrl) return;
    let embedHtml = '';
    
    // YouTube
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtu.be') 
        ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
        : videoUrl.split('v=')[1]?.split('&')[0];
      embedHtml = `<div class="video-container my-6"><iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    // Vimeo
    else if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
      embedHtml = `<div class="video-container my-6"><iframe src="https://player.vimeo.com/video/${videoId}" width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    else {
      embedHtml = `<video controls class="w-full rounded-lg my-6"><source src="${videoUrl}" type="video/mp4"></video>`;
    }
    
    onInsert(embedHtml);
    setActiveModal(null);
    setVideoUrl('');
  };

  const handleInsertQuote = () => {
    if (!quoteText) return;
    const html = `<blockquote class="border-l-4 border-yellow-500 pl-4 italic my-6">
  <p class="text-lg">${quoteText}</p>
  ${quoteAuthor ? `<footer class="text-sm text-gray-600 mt-2">— ${quoteAuthor}</footer>` : ''}
</blockquote>`;
    onInsert(html);
    setActiveModal(null);
    setQuoteText('');
    setQuoteAuthor('');
  };

  const handleInsertCode = () => {
    if (!codeText) return;
    const html = `<pre class="bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto"><code>${codeText}</code></pre>`;
    onInsert(html);
    setActiveModal(null);
    setCodeText('');
  };

  const handleInsertLink = () => {
    if (!linkText || !linkUrl) return;
    const html = `<a href="${linkUrl}" class="text-yellow-600 hover:text-yellow-700 underline">${linkText}</a>`;
    onInsert(html);
    setActiveModal(null);
    setLinkText('');
    setLinkUrl('');
  };

  const handleInsertGallery = () => {
    if (!galleryUrls) return;
    const urls = galleryUrls.split('\n').filter(url => url.trim());
    const html = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
${urls.map(url => `  <img src="${url.trim()}" alt="Gallery image" class="w-full h-48 object-cover rounded-lg" />`).join('\n')}
</div>`;
    onInsert(html);
    setActiveModal(null);
    setGalleryUrls('');
  };

  const handleInsertHeading = () => {
    onInsert(`<h2 class="text-3xl font-bold mt-8 mb-4">Your Heading Here</h2>`);
  };

  const handleInsertList = () => {
    onInsert(`<ul class="list-disc list-inside my-6 space-y-2">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`);
  };

  return (
    <>
      {/* Insert Toolbar - Sticky so it follows you as you scroll */}
      <div className="sticky top-[80px] z-20 flex flex-wrap gap-2 p-4 bg-stone-50 border-b shadow-sm">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            onBeforeInsert?.();
            setShowMediaLibrary(true);
          }}
          className="gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
        >
          <ImageIcon className="w-4 h-4" />
          Image
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setActiveModal('video')}
          className="gap-2"
        >
          <Video className="w-4 h-4" />
          Video
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setActiveModal('gallery')}
          className="gap-2"
        >
          <Grid3x3 className="w-4 h-4" />
          Gallery
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setActiveModal('quote')}
          className="gap-2"
        >
          <Quote className="w-4 h-4" />
          Quote
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setActiveModal('code')}
          className="gap-2"
        >
          <Code className="w-4 h-4" />
          Code
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setActiveModal('link')}
          className="gap-2"
        >
          <LinkIcon className="w-4 h-4" />
          Link
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleInsertHeading}
          className="gap-2"
        >
          <Heading2 className="w-4 h-4" />
          Heading
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleInsertList}
          className="gap-2"
        >
          <List className="w-4 h-4" />
          List
        </Button>
      </div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <MediaLibrary
          onSelect={handleMediaLibrarySelect}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}

      {activeModal === 'video' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insert Video</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Video URL *</label>
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="YouTube, Vimeo, or direct video URL"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Supports YouTube, Vimeo, and direct video files
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInsertVideo} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Insert
                </Button>
                <Button onClick={() => setActiveModal(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'gallery' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insert Gallery</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Image URLs (one per line) *</label>
                <Textarea
                  value={galleryUrls}
                  onChange={(e) => setGalleryUrls(e.target.value)}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                  rows={6}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInsertGallery} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Insert
                </Button>
                <Button onClick={() => setActiveModal(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'quote' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insert Quote</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Quote Text *</label>
                <Textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="Enter the quote..."
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Author (optional)</label>
                <Input
                  value={quoteAuthor}
                  onChange={(e) => setQuoteAuthor(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInsertQuote} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Insert
                </Button>
                <Button onClick={() => setActiveModal(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'code' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insert Code Block</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Code *</label>
                <Textarea
                  value={codeText}
                  onChange={(e) => setCodeText(e.target.value)}
                  placeholder="Enter your code..."
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInsertCode} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Insert
                </Button>
                <Button onClick={() => setActiveModal(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'link' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insert Link</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Link Text *</label>
                <Input
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">URL *</label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInsertLink} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Insert
                </Button>
                <Button onClick={() => setActiveModal(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
