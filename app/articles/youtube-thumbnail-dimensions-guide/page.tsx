'use client';

import Link from 'next/link';
import { 
  Youtube,
  Image,
  ArrowRight,
  CheckCircle,
  Maximize,
  FileImage,
  Eye,
  Zap,
  Type,
  Palette
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';
import MoreFreeTools from '@/components/MoreFreeTools';

export default function YouTubeThumbnailDimensionsGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/social-media-image-sizes" className="hover:text-orange-600">Social Media Image Sizes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">YouTube Thumbnail Dimensions</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-lg">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                YouTube Thumbnail Dimensions Guide 2024
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create click-worthy thumbnails with the exact dimensions, resolution, and design best practices used by top YouTubers.
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-red-600" />
                <span className="font-semibold text-gray-900">Quick Resize Tool</span>
              </div>
              <p className="text-gray-700 mb-4">
                Resize any image to perfect YouTube thumbnail dimensions instantly—no design skills needed.
              </p>
              <Link 
                href="/tools/youtube-thumbnail-size"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Create YouTube Thumbnail
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Maximize className="w-6 h-6 text-red-500" />
                Official YouTube Thumbnail Specifications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                YouTube thumbnails are the single most important factor in getting clicks. They appear everywhere—search results, suggested videos, homepage, and subscriptions. Getting the dimensions right is essential.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">YouTube Thumbnail Requirements</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dimensions</p>
                        <p className="font-semibold text-gray-900">1280 x 720 pixels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aspect Ratio</p>
                        <p className="font-semibold text-gray-900">16:9</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">File Formats</p>
                        <p className="font-semibold text-gray-900">JPG, PNG, GIF, BMP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Maximum File Size</p>
                        <p className="font-semibold text-gray-900">2 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                <p className="text-gray-700">
                  <strong>Pro tip:</strong> While 1280 x 720 is the minimum, many creators upload at 1920 x 1080 for extra sharpness on high-resolution displays. YouTube will scale it down, but the quality is retained.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-orange-500" />
                Where Thumbnails Appear (And Why Size Matters)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your thumbnail displays at different sizes across YouTube. Design with the smallest view in mind—if it's readable on a phone, it'll work everywhere.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">YouTube Search Results</h4>
                  <p className="text-gray-700 text-sm">
                    Displays at approximately 360 x 202 pixels on desktop. This is often where first impressions are made—text and faces must be clearly visible at this size.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Suggested Videos Sidebar</h4>
                  <p className="text-gray-700 text-sm">
                    Even smaller at roughly 168 x 94 pixels. Only the boldest elements survive at this size. This is why high-contrast colors and large faces are so effective.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">YouTube Homepage</h4>
                  <p className="text-gray-700 text-sm">
                    Larger display around 320 x 180 pixels. This is prime real estate—your thumbnail competes directly against other creators for attention.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Mobile App</h4>
                  <p className="text-gray-700 text-sm">
                    Over 70% of YouTube watch time is mobile. Thumbnails appear even smaller on phones—simplicity is essential.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-6 h-6 text-purple-500" />
                Thumbnail Design Best Practices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The highest-performing thumbnails share common characteristics. Here's what the data shows works best:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold text-gray-900">Use Faces (With Emotion)</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Thumbnails with expressive faces get 38% higher CTR on average. Surprised, excited, or curious expressions work best. Eyes should be clearly visible.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-5 h-5 text-orange-500" />
                    <h4 className="font-semibold text-gray-900">High Contrast Colors</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Bold colors that pop against YouTube's white background. Yellow, red, and blue consistently outperform muted tones. Avoid colors that blend into the interface.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900">3 Words or Less</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Text should complement, not duplicate your title. Use bold, sans-serif fonts with strong outlines. If you can't read it at 100px wide, it's too small.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Maximize className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-gray-900">Simple Composition</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    One focal point maximum. Cluttered thumbnails confuse viewers. The best thumbnails communicate one idea instantly—within 1-2 seconds of viewing.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Technical Optimization Tips
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Avoid the Bottom-Right Corner</h4>
                  <p className="text-gray-700 text-sm">
                    YouTube overlays the video duration in the bottom-right corner. Keep important elements away from this area (approximately the right 15% and bottom 15%).
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Test at Small Sizes</h4>
                  <p className="text-gray-700 text-sm">
                    Before uploading, shrink your thumbnail to 168 x 94 pixels. If you can't understand what it's about at that size, simplify your design.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Maintain Brand Consistency</h4>
                  <p className="text-gray-700 text-sm">
                    Use consistent fonts, colors, and style across your thumbnails. Viewers should recognize your videos instantly when scrolling—this builds channel identity.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">4. A/B Test Your Thumbnails</h4>
                  <p className="text-gray-700 text-sm">
                    YouTube now offers thumbnail testing for eligible channels. If you don't have access, change thumbnails on underperforming videos and monitor CTR changes in Studio analytics.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I change my thumbnail after uploading a video?</h4>
                  <p className="text-gray-700 text-sm">
                    Yes, you can change thumbnails anytime in YouTube Studio. Many successful creators iterate on thumbnails for older videos to improve performance.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Why can't I upload a custom thumbnail?</h4>
                  <p className="text-gray-700 text-sm">
                    Custom thumbnails require a verified YouTube account. Verify your account by adding a phone number in YouTube Studio settings.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Should thumbnails match the actual video content?</h4>
                  <p className="text-gray-700 text-sm">
                    Yes—misleading thumbnails may get initial clicks but hurt watch time and channel reputation. YouTube's algorithm prioritizes videos that deliver on their thumbnail's promise.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">What CTR should I aim for?</h4>
                  <p className="text-gray-700 text-sm">
                    Average CTR varies by niche, but 4-10% is typical for most channels. Thumbnails are just one factor—title, topic, and audience relevance all contribute to CTR.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 border border-red-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Create Your Thumbnail Now</h2>
              <p className="text-gray-700 mb-6">
                Use our free tools to resize and optimize images for YouTube thumbnails.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  href="/tools/youtube-thumbnail-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  YouTube Thumbnail Resizer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/tools/youtube-banner-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg border border-gray-200"
                >
                  YouTube Banner Resizer
                </Link>
              </div>
            </div>

            <MoreFreeTools exclude={['/tools/youtube-thumbnail-size']} />
          </article>
        </div>
      </div>
      <MonetizationBar />
      <PostResultUpsell />
    </>
  );
}
