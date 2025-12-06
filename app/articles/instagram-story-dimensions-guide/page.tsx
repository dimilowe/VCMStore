'use client';

import Link from 'next/link';
import { 
  Instagram,
  Smartphone,
  Image,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Maximize,
  FileImage,
  Video,
  Zap
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function InstagramStoryDimensionsGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/social-media-image-sizes" className="hover:text-orange-600">Social Media Image Sizes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Instagram Story Dimensions</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Instagram Story Dimensions Guide 2024
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The complete guide to Instagram Story sizes, aspect ratios, and specifications. Get your Stories looking pixel-perfect on every device.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-pink-600" />
                <span className="font-semibold text-gray-900">Quick Resize Tool</span>
              </div>
              <p className="text-gray-700 mb-4">
                Instantly resize any image to perfect Instagram Story dimensions with our free tool.
              </p>
              <Link 
                href="/tools/instagram-story-size"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Resize Image for Instagram Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Maximize className="w-6 h-6 text-pink-500" />
                Official Instagram Story Dimensions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Instagram Stories occupy the full screen of mobile devices, designed for vertical viewing. Getting the dimensions right ensures your content displays without awkward cropping or black bars.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Instagram Story Specifications</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dimensions</p>
                        <p className="font-semibold text-gray-900">1080 x 1920 pixels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aspect Ratio</p>
                        <p className="font-semibold text-gray-900">9:16 (vertical)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Image Formats</p>
                        <p className="font-semibold text-gray-900">JPG, PNG</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Video Length</p>
                        <p className="font-semibold text-gray-900">Up to 60 seconds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-5 border border-pink-200">
                <p className="text-gray-700">
                  <strong>Pro tip:</strong> While 1080 x 1920 is the standard, Instagram accepts images between 600 x 1067 (minimum) and up to 1080 x 1920. However, uploading at full resolution ensures the sharpest quality across all devices.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                Safe Zones: Avoid Content Getting Cut Off
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Instagram Stories have UI elements that overlay your content—your profile picture, username at the top, and interactive elements at the bottom. Keep important content within safe zones to prevent cropping.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Top Safe Zone</h4>
                  <p className="text-gray-700 text-sm">
                    Keep text and important visuals at least <strong>250 pixels from the top</strong>. Your profile picture, username, and Story timestamp appear here.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Bottom Safe Zone</h4>
                  <p className="text-gray-700 text-sm">
                    Avoid placing key content within the <strong>bottom 340 pixels</strong>. This area contains the message bar, swipe-up link, and other interactive elements.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Side Margins</h4>
                  <p className="text-gray-700 text-sm">
                    Leave at least <strong>64 pixels on each side</strong> to account for varying device screen widths and ensure content doesn't feel cramped.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">
                    <strong>Important:</strong> If you're using the swipe-up link or "See More" feature, the bottom safe zone extends even higher. Test your Stories on multiple devices before publishing to ensure nothing critical gets hidden.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Image className="w-6 h-6 text-pink-500" />
                Image vs Video Stories: What Works Best?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Both images and videos have their place in your Story strategy. Here's how to optimize each format:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <FileImage className="w-5 h-5 text-pink-500" />
                    <h4 className="font-semibold text-gray-900">Image Stories</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Display for 5 seconds by default</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Max file size: 30MB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Best for announcements & quotes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Easier to read text quickly</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="w-5 h-5 text-purple-500" />
                    <h4 className="font-semibold text-gray-900">Video Stories</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Up to 60 seconds per clip</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Formats: MP4, MOV (H.264)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Higher engagement rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Best for tutorials & behind-scenes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Best Practices for Instagram Stories
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Design Mobile-First</h4>
                  <p className="text-gray-700 text-sm">
                    99% of Instagram users access the app via mobile. Always preview your Stories on a phone before publishing—what looks good on a desktop preview may not translate to smaller screens.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Use High Contrast Text</h4>
                  <p className="text-gray-700 text-sm">
                    If adding text overlays, ensure strong contrast against your background. Use Instagram's text background feature or add a semi-transparent overlay behind text.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Keep File Sizes Optimized</h4>
                  <p className="text-gray-700 text-sm">
                    Large files upload slower and may get compressed more aggressively. Aim for images under 10MB and videos under 50MB while maintaining quality.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Test on Multiple Devices</h4>
                  <p className="text-gray-700 text-sm">
                    Screen sizes vary significantly between iPhone and Android devices. What fits perfectly on an iPhone 14 Pro Max might get cropped on a Samsung Galaxy A series.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I post horizontal images to Stories?</h4>
                  <p className="text-gray-700 text-sm">
                    Yes, but horizontal images will appear with black bars above and below, filling only a portion of the screen. For best results, crop or resize to the 9:16 vertical format before uploading.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Why does my Story look blurry?</h4>
                  <p className="text-gray-700 text-sm">
                    Instagram compresses uploads to save bandwidth. To minimize quality loss: upload at exactly 1080 x 1920, keep file sizes reasonable, and avoid zooming in on small portions of larger images.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">How long do Instagram Stories last?</h4>
                  <p className="text-gray-700 text-sm">
                    Stories disappear after 24 hours unless you save them to Highlights. Highlights remain on your profile permanently until you remove them.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">What's the best resolution for Story videos?</h4>
                  <p className="text-gray-700 text-sm">
                    Export videos at 1080 x 1920 pixels, 30fps, H.264 codec. This balances quality with file size and matches Instagram's display resolution exactly.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 rounded-2xl p-8 border border-pink-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Create Perfect Stories?</h2>
              <p className="text-gray-700 mb-6">
                Use our free tools to resize and optimize your images for Instagram Stories instantly.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  href="/tools/instagram-story-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Instagram Story Resizer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/tools/instagram-post-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg border border-gray-200"
                >
                  Instagram Post Resizer
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
      <MonetizationBar />
      <PostResultUpsell />
    </>
  );
}
