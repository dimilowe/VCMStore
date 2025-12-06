'use client';

import Link from 'next/link';
import { 
  Music,
  Image,
  ArrowRight,
  CheckCircle,
  Maximize,
  FileImage,
  Video,
  Zap,
  Smartphone,
  Eye
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function TikTokCoverDimensionsGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/social-media-image-sizes" className="hover:text-orange-600">Social Media Image Sizes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">TikTok Cover Dimensions</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 via-pink-500 to-cyan-400 rounded-2xl mb-4 shadow-lg">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                TikTok Cover Dimensions Guide 2024
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Master TikTok video covers and profile images. Get the exact dimensions to make your content stand out in the feed and on your profile grid.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-cyan-50 rounded-2xl p-6 border border-pink-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-pink-600" />
                <span className="font-semibold text-gray-900">Quick Resize Tool</span>
              </div>
              <p className="text-gray-700 mb-4">
                Resize any image to perfect TikTok cover dimensions instantly—free and easy.
              </p>
              <Link 
                href="/tools/tiktok-size"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Create TikTok Cover
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-pink-500" />
                TikTok Video Cover Specifications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your TikTok video cover is the thumbnail that represents your video on your profile grid and in some browse contexts. A great cover can significantly increase views.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Video Cover Requirements</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Video Dimensions</p>
                        <p className="font-semibold text-gray-900">1080 x 1920 pixels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aspect Ratio</p>
                        <p className="font-semibold text-gray-900">9:16 (vertical)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cover Source</p>
                        <p className="font-semibold text-gray-900">Frame from video or upload</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Grid Display</p>
                        <p className="font-semibold text-gray-900">Cropped to ~3:4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-5 border border-pink-200">
                <p className="text-gray-700">
                  <strong>Pro tip:</strong> While TikTok allows you to select any frame from your video as the cover, you can also upload a custom image. Custom covers let you add text overlays and optimize for clicks.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-cyan-500" />
                Profile Grid Safe Zones
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                On your TikTok profile, video covers display in a 3-column grid. They're cropped from the full 9:16 ratio to approximately 3:4, cutting off the top and bottom.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Center Your Key Content</h4>
                  <p className="text-gray-700 text-sm">
                    The profile grid crops approximately 20% from the top and bottom of your cover. Keep faces, text, and important visuals in the center 60% of the image vertically.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Text Placement</h4>
                  <p className="text-gray-700 text-sm">
                    If adding text to your cover, place it in the middle third of the image. Text near the top or bottom edges will likely be cut off in the grid view.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Video Preview Considerations</h4>
                  <p className="text-gray-700 text-sm">
                    When viewers hover on desktop or long-press on mobile, a preview plays. Your cover should represent content that appears early in the video for visual consistency.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Image className="w-6 h-6 text-purple-500" />
                Profile Picture Dimensions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your TikTok profile picture appears in various sizes across the app—on your profile, in comments, and in the For You feed when someone follows you.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Profile Picture Specs</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Recommended size:</strong> 200 x 200 pixels minimum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Shape:</strong> Circular crop (upload square, TikTok crops to circle)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>File types:</strong> JPG, PNG, GIF (animated GIFs work!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Best practice:</strong> Upload at 400 x 400 for crisp display on all devices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Cover Design Best Practices
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Use Expressive Faces</h4>
                  <p className="text-gray-700 text-sm">
                    Covers featuring clear, expressive faces—especially with strong emotions—dramatically outperform generic screenshots. Eye contact with the camera is particularly effective.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Add Text Strategically</h4>
                  <p className="text-gray-700 text-sm">
                    A few words can hook viewers scrolling through your profile. Use bold, readable fonts. Popular phrases include questions ("Did you know...?"), numbers ("3 ways to..."), or emotional hooks.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Maintain Visual Consistency</h4>
                  <p className="text-gray-700 text-sm">
                    Your profile grid is your portfolio. Using consistent colors, fonts, or visual styles across covers creates a cohesive brand that encourages profile exploration.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Avoid Clutter</h4>
                  <p className="text-gray-700 text-sm">
                    Covers display small on the grid. Simple compositions with one focal point work best. Too many elements become unreadable at thumbnail size.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-orange-500" />
                Video Format Requirements
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Understanding TikTok's video specifications ensures your content looks its best:
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Resolution</p>
                      <p className="font-semibold text-gray-900">1080 x 1920 (recommended)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Aspect Ratio</p>
                      <p className="font-semibold text-gray-900">9:16 (vertical)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Video Length</p>
                      <p className="font-semibold text-gray-900">Up to 10 minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">File Format</p>
                      <p className="font-semibold text-gray-900">MP4, MOV</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Max File Size</p>
                      <p className="font-semibold text-gray-900">287.6 MB (mobile), 500 MB (web)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Frame Rate</p>
                      <p className="font-semibold text-gray-900">30fps or 60fps</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I change a video's cover after posting?</h4>
                  <p className="text-gray-700 text-sm">
                    Yes! Go to your video, tap the three dots, select "Set Cover," and choose a new frame or upload a custom image. This is a great way to test which covers perform best.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Why does my cover look blurry?</h4>
                  <p className="text-gray-700 text-sm">
                    This usually happens when selecting a frame from a low-quality video or when the original video resolution is below 1080p. Upload custom covers at 1080 x 1920 for best results.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Do covers affect video performance?</h4>
                  <p className="text-gray-700 text-sm">
                    Covers primarily affect profile browsing, not For You page performance. However, an organized, attractive profile encourages visitors to follow and explore more of your content.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I upload horizontal videos?</h4>
                  <p className="text-gray-700 text-sm">
                    Yes, but they'll display with black bars above and below on mobile. TikTok is optimized for vertical content—9:16 videos get the most screen real estate and perform best.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-2xl p-8 border border-pink-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Create Perfect TikTok Content</h2>
              <p className="text-gray-700 mb-6">
                Use our free tools to resize images and videos for TikTok.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  href="/tools/tiktok-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  TikTok Image Resizer
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
          </article>
        </div>
      </div>
      <MonetizationBar />
      <PostResultUpsell />
    </>
  );
}
