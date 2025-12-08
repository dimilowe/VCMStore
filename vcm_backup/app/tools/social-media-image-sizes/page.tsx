import { Metadata } from "next";
import Link from "next/link";
import { Youtube, Instagram, Video, Twitter, Linkedin, ExternalLink, CheckCircle, ArrowRight } from "lucide-react";
import { platformImagePresets } from "@/data/platformImagePresets";

export const metadata: Metadata = {
  title: "Social Media Image Size Guide 2025 - All Platform Dimensions",
  description: "Complete guide to social media image sizes for YouTube, Instagram, TikTok, Twitter/X, and LinkedIn. Free resizer tools included. Updated for 2025.",
  keywords: "social media image sizes, youtube thumbnail size, instagram post dimensions, tiktok cover size, twitter header dimensions, linkedin banner size",
};

const platformData = [
  {
    name: "YouTube",
    icon: Youtube,
    iconBg: "bg-red-500",
    tools: [
      { preset: platformImagePresets.find(p => p.id === "youtube-thumbnail")!, description: "Channel and video thumbnails" }
    ],
    tips: [
      "Thumbnails appear at various sizes across YouTube",
      "Use high-contrast colors for visibility",
      "Include expressive faces when possible",
      "Text should be large and readable at small sizes"
    ]
  },
  {
    name: "Instagram",
    icon: Instagram,
    iconBg: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    tools: [
      { preset: platformImagePresets.find(p => p.id === "instagram-post")!, description: "Feed posts (square format)" },
      { preset: platformImagePresets.find(p => p.id === "instagram-story")!, description: "Stories and Reels covers" }
    ],
    tips: [
      "Square posts display largest in the profile grid",
      "Stories have safe zones at top and bottom",
      "Portrait (4:5) posts take up more feed space",
      "Reels covers should have centered content"
    ]
  },
  {
    name: "TikTok",
    icon: Video,
    iconBg: "bg-black",
    tools: [
      { preset: platformImagePresets.find(p => p.id === "tiktok-cover")!, description: "Video cover images" }
    ],
    tips: [
      "Cover images appear in your profile grid",
      "Center of image shows in the grid preview",
      "Use vertical format for full-screen impact",
      "Text should be visible at small grid size"
    ]
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    iconBg: "bg-sky-500",
    tools: [
      { preset: platformImagePresets.find(p => p.id === "twitter-header")!, description: "Profile header banner" }
    ],
    tips: [
      "Profile photo overlaps bottom-left corner",
      "Mobile crops differently than desktop",
      "Keep important content centered",
      "Avoid text near edges for safe display"
    ]
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    iconBg: "bg-blue-700",
    tools: [
      { preset: platformImagePresets.find(p => p.id === "linkedin-banner")!, description: "Personal profile banner" }
    ],
    tips: [
      "Profile photo overlaps bottom-left",
      "Company pages use different dimensions",
      "Professional imagery works best",
      "Consider including your specialty or tagline"
    ]
  }
];

export default function SocialMediaImageSizesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full mb-4">
            Updated for 2025
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Social Media Image Size Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The complete reference for image dimensions across all major platforms. 
            Plus free resizer tools to get your images pixel-perfect.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Image Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Dimensions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Aspect Ratio</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Tool</th>
                </tr>
              </thead>
              <tbody>
                {platformImagePresets.map((preset) => (
                  <tr key={preset.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{preset.name.replace(' Resizer', '')}</td>
                    <td className="py-3 px-4 text-gray-600">{preset.name.split(' ').slice(0, -1).join(' ')}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-orange-600">{preset.width} × {preset.height}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{preset.aspectRatioLabel}</td>
                    <td className="py-3 px-4">
                      <Link 
                        href={`/tools/${preset.slug}`}
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Resize <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-12">
          {platformData.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <section key={platform.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 ${platform.iconBg} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{platform.name} Image Sizes</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Recommended Dimensions</h3>
                    <div className="space-y-3">
                      {platform.tools.map((tool) => (
                        <Link
                          key={tool.preset.id}
                          href={`/tools/${tool.preset.slug}`}
                          className="block p-4 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 group-hover:text-orange-600">
                                {tool.preset.name}
                              </p>
                              <p className="text-sm text-gray-500">{tool.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono text-lg text-orange-600">
                                {tool.preset.width} × {tool.preset.height}
                              </p>
                              <p className="text-xs text-gray-400">{tool.preset.aspectRatioLabel}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-sm text-orange-600 font-medium">
                            <ExternalLink className="w-4 h-4" />
                            Open Free Resizer Tool
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Pro Tips</h3>
                    <ul className="space-y-2">
                      {platform.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Need to Resize an Image?</h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Our free resizer tools automatically crop and resize your images to the perfect dimensions for each platform. No signup required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {platformImagePresets.slice(0, 4).map((preset) => (
              <Link
                key={preset.id}
                href={`/tools/${preset.slug}`}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                {preset.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Why do image dimensions matter for social media?</h3>
              <p className="text-gray-600">Correct dimensions ensure your images display without cropping, stretching, or quality loss. Each platform is optimized for specific sizes, and using the right dimensions helps your content look professional and stand out.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What happens if I upload the wrong size?</h3>
              <p className="text-gray-600">Platforms will automatically crop or resize your image, often cutting off important content or reducing quality. Using the correct dimensions gives you control over exactly how your image appears.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Are these tools really free?</h3>
              <p className="text-gray-600">Yes! All our image resizer tools are 100% free with no watermarks, no signup required, and no limits on usage. We process images securely on our servers and don't store your files.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What file formats do you support?</h3>
              <p className="text-gray-600">Our resizers accept JPG, PNG, and WebP images up to 10MB. Output is always high-quality JPG optimized for web display and fast loading.</p>
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Social Media Image Resizer Tools",
              description: "Free online tools to resize images for social media platforms",
              numberOfItems: platformImagePresets.length,
              itemListElement: platformImagePresets.map((preset, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "WebApplication",
                  name: preset.name,
                  description: preset.seo.description,
                  url: `https://vcmsuite.com/tools/${preset.slug}`,
                  applicationCategory: "DesignApplication",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD"
                  }
                }
              }))
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Why do image dimensions matter for social media?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Correct dimensions ensure your images display without cropping, stretching, or quality loss. Each platform is optimized for specific sizes."
                  }
                },
                {
                  "@type": "Question",
                  name: "What happens if I upload the wrong size?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Platforms will automatically crop or resize your image, often cutting off important content or reducing quality."
                  }
                },
                {
                  "@type": "Question",
                  name: "Are these tools really free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! All our image resizer tools are 100% free with no watermarks, no signup required, and no limits on usage."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </main>
  );
}
