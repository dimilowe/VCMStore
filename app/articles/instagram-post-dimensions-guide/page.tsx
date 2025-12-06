'use client';

import Link from 'next/link';
import { 
  Instagram,
  Square,
  Image,
  ArrowRight,
  CheckCircle,
  Maximize,
  FileImage,
  Grid,
  Zap,
  Crop
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';
import MoreFreeTools from '@/components/MoreFreeTools';

export default function InstagramPostDimensionsGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/social-media-image-sizes" className="hover:text-orange-600">Social Media Image Sizes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Instagram Post Dimensions</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
                <Grid className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Instagram Post Dimensions Guide 2024
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Master all Instagram post formats—square, portrait, landscape, and carousel. Get the exact dimensions for maximum impact on the feed.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-pink-600" />
                <span className="font-semibold text-gray-900">Quick Resize Tool</span>
              </div>
              <p className="text-gray-700 mb-4">
                Resize any image to perfect Instagram post dimensions in seconds—free, no signup required.
              </p>
              <Link 
                href="/tools/instagram-post-size"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Resize Image for Instagram
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Maximize className="w-6 h-6 text-pink-500" />
                Instagram Post Dimensions by Format
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Instagram supports three main aspect ratios for feed posts. Each has its optimal use case depending on your content type and goals.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Square className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Square Posts</h3>
                      <p className="text-sm text-gray-500">The classic Instagram format</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Dimensions</p>
                      <p className="font-semibold text-gray-900">1080 x 1080 px</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Aspect Ratio</p>
                      <p className="font-semibold text-gray-900">1:1</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    Best for: Product shots, quotes, infographics, and content that works equally well cropped from any direction.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Crop className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Portrait Posts</h3>
                      <p className="text-sm text-gray-500">Maximum feed real estate</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Dimensions</p>
                      <p className="font-semibold text-gray-900">1080 x 1350 px</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Aspect Ratio</p>
                      <p className="font-semibold text-gray-900">4:5</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    Best for: Photos with vertical subjects, fashion, portraits, and any content where you want to take up more screen space in the feed.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Image className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Landscape Posts</h3>
                      <p className="text-sm text-gray-500">Wide format for panoramic content</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Dimensions</p>
                      <p className="font-semibold text-gray-900">1080 x 566 px</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Aspect Ratio</p>
                      <p className="font-semibold text-gray-900">1.91:1</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    Best for: Landscape photography, group shots, and content originally created for other platforms. Note: takes up less feed space.
                  </p>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-5 border border-pink-200">
                <p className="text-gray-700">
                  <strong>Pro tip:</strong> Portrait (4:5) posts take up 25% more vertical space in the feed than square posts, making them more likely to stop scrollers. Use this format when you want maximum visibility.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Grid className="w-6 h-6 text-purple-500" />
                Carousel Post Specifications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Instagram carousels allow up to 10 images or videos per post. They're powerful for storytelling, tutorials, and showcasing multiple products.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Carousel Specifications</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Maximum slides:</strong> 10 images or videos per carousel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Consistent aspect ratio:</strong> All slides must share the same aspect ratio (first image sets the format)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Recommended:</strong> 1080 x 1080 (square) or 1080 x 1350 (portrait)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Video length:</strong> Up to 60 seconds per slide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Mix media:</strong> You can combine photos and videos in the same carousel</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileImage className="w-6 h-6 text-orange-500" />
                Profile Grid Considerations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your Instagram profile displays posts in a 3-column grid, cropping all images to square thumbnails. This affects how portrait and landscape posts appear.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Grid Thumbnail Cropping</h4>
                  <p className="text-gray-700 text-sm">
                    Portrait posts (4:5) get cropped to show the center square. Place your most important elements in the center 1080 x 1080 area to ensure they're visible on your profile grid.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Cover Image Selection</h4>
                  <p className="text-gray-700 text-sm">
                    For carousels, you can select which slide appears as the thumbnail. For videos, you can upload a custom cover image—use this to maintain a cohesive grid aesthetic.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Planning Your Grid</h4>
                  <p className="text-gray-700 text-sm">
                    Some creators plan their grid layout by designing 3 or 6 posts at once, ensuring colors and compositions flow together. Preview tools can help visualize before posting.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Image Quality Best Practices
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Always Upload at Full Resolution</h4>
                  <p className="text-gray-700 text-sm">
                    Instagram compresses all uploads. Starting with high-resolution images (at least 1080px wide) gives the algorithm more data to work with, resulting in sharper final images.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Export as JPEG with 80-95% Quality</h4>
                  <p className="text-gray-700 text-sm">
                    This balances file size with quality. PNG files are often larger and get compressed more aggressively. Use PNG only for images with text or sharp edges.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Avoid Over-Editing</h4>
                  <p className="text-gray-700 text-sm">
                    Heavy filters and sharpening can create artifacts that become more visible after Instagram's compression. Apply edits conservatively.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Use sRGB Color Space</h4>
                  <p className="text-gray-700 text-sm">
                    Convert images to sRGB before uploading. Other color profiles (like Adobe RGB) may display incorrectly on mobile screens.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">What's the minimum resolution for Instagram posts?</h4>
                  <p className="text-gray-700 text-sm">
                    Instagram requires a minimum width of 320 pixels, but images under 1080px wide will appear blurry. Always aim for 1080px or higher for best quality.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I change a post's aspect ratio after uploading?</h4>
                  <p className="text-gray-700 text-sm">
                    No, once posted, you cannot change the crop or aspect ratio. You would need to delete and repost with the new dimensions.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Why do my photos look different after uploading?</h4>
                  <p className="text-gray-700 text-sm">
                    Instagram compresses images to reduce file size and loading times. This compression can alter colors and reduce sharpness. Uploading at exact recommended dimensions minimizes quality loss.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Should I add borders to make images fit?</h4>
                  <p className="text-gray-700 text-sm">
                    You can add white or black borders to preserve your original aspect ratio, but this reduces the actual image size on screen. It's usually better to crop strategically than add borders.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 rounded-2xl p-8 border border-pink-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Resize Your Images Now</h2>
              <p className="text-gray-700 mb-6">
                Use our free tools to get perfect Instagram dimensions in seconds.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  href="/tools/instagram-post-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Instagram Post Resizer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/tools/instagram-story-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg border border-gray-200"
                >
                  Instagram Story Resizer
                </Link>
              </div>
            </div>

            <MoreFreeTools exclude={['/tools/instagram-post-size']} />
          </article>
        </div>
      </div>
      <MonetizationBar />
      <PostResultUpsell />
    </>
  );
}
