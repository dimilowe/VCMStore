'use client';

import Link from 'next/link';
import { 
  Linkedin,
  Image,
  ArrowRight,
  CheckCircle,
  Maximize,
  FileImage,
  Users,
  Zap,
  Building,
  Briefcase
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function LinkedInBannerDimensionsGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/social-media-image-sizes" className="hover:text-orange-600">Social Media Image Sizes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">LinkedIn Banner Dimensions</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                LinkedIn Banner Dimensions Guide 2024
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Optimize your LinkedIn profile and company page banners with the correct dimensions for professional impact across all devices.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">Quick Resize Tool</span>
              </div>
              <p className="text-gray-700 mb-4">
                Create perfectly sized LinkedIn banners in seconds with our free resizing tool.
              </p>
              <Link 
                href="/tools/linkedin-banner-size"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Create LinkedIn Banner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                Personal Profile Banner Dimensions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Your LinkedIn banner is one of the first things recruiters, clients, and connections see. It's prime real estate for establishing your professional brand.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Personal Profile Banner Specs</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Recommended Size</p>
                        <p className="font-semibold text-gray-900">1584 x 396 pixels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aspect Ratio</p>
                        <p className="font-semibold text-gray-900">4:1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileImage className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">File Formats</p>
                        <p className="font-semibold text-gray-900">JPG, PNG, GIF</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Maximum File Size</p>
                        <p className="font-semibold text-gray-900">8 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <p className="text-gray-700">
                  <strong>Pro tip:</strong> Your profile photo overlaps the bottom-left corner of the banner. Keep important content away from the left 25% and bottom 20% to avoid obstruction.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-6 h-6 text-indigo-500" />
                Company Page Banner Dimensions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                LinkedIn Company pages use a slightly different banner size. This is crucial for businesses building their employer brand and B2B presence.
              </p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Company Page Banner Specs</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Maximize className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Recommended Size</p>
                        <p className="font-semibold text-gray-900">1128 x 191 pixels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aspect Ratio</p>
                        <p className="font-semibold text-gray-900">~6:1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Company Logo Safe Zone</h4>
                  <p className="text-gray-700 text-sm">
                    The company logo appears in the bottom-left corner. Avoid placing critical information in the left 20% of your banner design.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Cover Story Video</h4>
                  <p className="text-gray-700 text-sm">
                    LinkedIn now supports cover story videos on company pages. These must be between 20 seconds and 30 seconds, with the same dimensions as the static banner.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-500" />
                Safe Zones for All Devices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                LinkedIn banners display differently on desktop, tablet, and mobile. The banner gets cropped significantly on mobile devices—plan accordingly.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Desktop View</h4>
                  <p className="text-gray-700 text-sm">
                    Full banner displays at approximately 1400px wide. Your profile photo (152 x 152px on desktop) overlaps the bottom-left corner.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Mobile View</h4>
                  <p className="text-gray-700 text-sm">
                    The banner is cropped to display at roughly 800 x 200 pixels. Only the center portion is visible—keep your key message and branding centered.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">The Golden Center</h4>
                  <p className="text-gray-700 text-sm">
                    The safest area for text and logos is the center 60% horizontally. This region displays consistently across all device sizes and won't be obscured by profile photos.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">
                    <strong>Test tip:</strong> After uploading your banner, view your profile on both a desktop browser and the LinkedIn mobile app to verify that nothing important gets cut off.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                LinkedIn Banner Best Practices
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Keep It Professional</h4>
                  <p className="text-gray-700 text-sm">
                    LinkedIn is a professional network. Your banner should reflect your industry and role—abstract patterns work for creatives, while corporate professionals may prefer cityscapes, office settings, or branded graphics.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Include Your Value Proposition</h4>
                  <p className="text-gray-700 text-sm">
                    Use text sparingly but effectively. A tagline like "Helping SaaS companies grow through SEO" immediately communicates what you do. Keep text large enough to read on mobile.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Use Brand Colors</h4>
                  <p className="text-gray-700 text-sm">
                    If you have personal or company brand colors, incorporate them into your banner. This creates visual consistency with your other professional materials.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Update Seasonally</h4>
                  <p className="text-gray-700 text-sm">
                    Refresh your banner periodically—when you change roles, launch a project, speak at an event, or simply want to signal that your profile is actively maintained.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Why does my banner look blurry?</h4>
                  <p className="text-gray-700 text-sm">
                    LinkedIn compresses images on upload. Always upload at the full recommended resolution (1584 x 396 for profiles) and use JPEG at 80%+ quality or PNG. Avoid upscaling smaller images.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I use the same banner for personal and company pages?</h4>
                  <p className="text-gray-700 text-sm">
                    Not ideally—the dimensions differ (1584 x 396 for personal, 1128 x 191 for company). Using the same image will result in cropping. Design separate versions for best results.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">What makes a good LinkedIn banner?</h4>
                  <p className="text-gray-700 text-sm">
                    The best banners are simple, professional, and communicate something about you or your work. Whether it's your expertise, your company's values, or a memorable image—it should support your personal brand.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Should I include contact information?</h4>
                  <p className="text-gray-700 text-sm">
                    Generally no—LinkedIn has dedicated fields for contact info. Using banner space for email or phone numbers looks cluttered and may get obscured on mobile.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 border border-blue-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Create Your LinkedIn Banner</h2>
              <p className="text-gray-700 mb-6">
                Use our free tools to resize images for perfect LinkedIn banners.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  href="/tools/linkedin-banner-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  LinkedIn Banner Resizer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/tools/linkedin-post-size"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg border border-gray-200"
                >
                  LinkedIn Post Resizer
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
