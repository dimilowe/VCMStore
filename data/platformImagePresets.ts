export type PlatformImagePreset = {
  id: string;
  slug: string;
  name: string;
  platformId: string;
  platformLabel: string;
  surfaceId: string;
  surfaceLabel: string;
  width: number;
  height: number;
  aspectRatioLabel: string;
  maxFileSizeMB: number;
  outputFormats: ("jpg" | "png")[];
  seo: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    faq: { question: string; answer: string }[];
  };
  ui: {
    showSafeZoneOverlay?: boolean;
    notes?: string[];
  };
  relatedToolSlugs: string[];
  relatedArticleSlugs: string[];
};

export const platformImagePresets: PlatformImagePreset[] = [
  {
    id: "youtube-thumbnail",
    slug: "youtube-thumbnail-resizer",
    name: "YouTube Thumbnail Resizer",
    platformId: "youtube",
    platformLabel: "YouTube",
    surfaceId: "thumbnail",
    surfaceLabel: "Thumbnail",
    width: 1280,
    height: 720,
    aspectRatioLabel: "16:9",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free YouTube Thumbnail Resizer - Resize Images to 1280x720",
      description: "Instantly resize any image to the perfect YouTube thumbnail size (1280x720). Free online tool with no signup required. Get perfectly sized thumbnails in seconds.",
      h1: "YouTube Thumbnail Resizer",
      intro: "Create perfectly sized YouTube thumbnails that grab attention and boost your CTR. Upload any image and instantly resize it to YouTube's recommended 1280×720 pixel dimensions.",
      faq: [
        {
          question: "What size should a YouTube thumbnail be?",
          answer: "YouTube recommends thumbnails be 1280x720 pixels with a 16:9 aspect ratio. The minimum width is 640 pixels, and images should be under 2MB. Our tool automatically resizes your images to these exact specifications."
        },
        {
          question: "What file format is best for YouTube thumbnails?",
          answer: "YouTube accepts JPG, GIF, and PNG formats. JPG is recommended for photographs as it offers good quality with smaller file sizes. PNG is better for graphics with text or transparent elements."
        },
        {
          question: "How do I make my YouTube thumbnail stand out?",
          answer: "Use high-contrast colors, large readable text, expressive faces, and keep the design simple. Avoid clutter and make sure your thumbnail looks good even at small sizes on mobile devices."
        },
        {
          question: "Can I use this tool on mobile?",
          answer: "Yes! Our YouTube Thumbnail Resizer works on all devices including smartphones and tablets. Simply upload your image and download the perfectly sized thumbnail."
        },
        {
          question: "Is this tool really free?",
          answer: "Yes, completely free with no hidden costs, watermarks, or signup required. Resize as many thumbnails as you need."
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Keep important elements away from edges (YouTube may crop slightly)",
        "Text should be large and readable at small sizes",
        "Use high-contrast colors for visibility"
      ]
    },
    relatedToolSlugs: [
      "instagram-post-resizer",
      "instagram-story-resizer",
      "tiktok-video-resizer",
      "twitter-header-resizer",
      "linkedin-banner-resizer"
    ],
    relatedArticleSlugs: [
      "youtube-thumbnail-design-tips",
      "youtube-thumbnail-dimensions-guide"
    ]
  },
  {
    id: "instagram-post",
    slug: "instagram-post-resizer",
    name: "Instagram Post Resizer",
    platformId: "instagram",
    platformLabel: "Instagram",
    surfaceId: "post",
    surfaceLabel: "Post",
    width: 1080,
    height: 1080,
    aspectRatioLabel: "1:1",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free Instagram Post Resizer - Resize Images to 1080x1080",
      description: "Resize any image to the perfect Instagram square post size (1080x1080). Free online tool, no signup required. Create perfectly sized Instagram posts instantly.",
      h1: "Instagram Post Resizer",
      intro: "Create perfectly square Instagram posts that display beautifully in the grid. Upload any image and instantly resize it to Instagram's ideal 1080×1080 pixel dimensions.",
      faq: [
        {
          question: "What is the best size for Instagram posts?",
          answer: "Instagram square posts should be 1080x1080 pixels (1:1 aspect ratio). This is the classic Instagram format that displays perfectly in the feed grid."
        },
        {
          question: "Can I post other sizes on Instagram?",
          answer: "Yes, Instagram supports portrait (1080x1350, 4:5) and landscape (1080x566, 1.91:1) formats. However, square posts display largest in the grid."
        },
        {
          question: "Is this tool free to use?",
          answer: "Yes, completely free with no watermarks or signup required."
        },
        {
          question: "Will resizing reduce my image quality?",
          answer: "Our tool uses high-quality resizing algorithms to maintain image sharpness. For best results, start with a high-resolution original image."
        }
      ]
    },
    ui: {
      notes: [
        "Square format displays largest in the Instagram grid",
        "Keep important content centered"
      ]
    },
    relatedToolSlugs: [
      "instagram-story-resizer",
      "youtube-thumbnail-resizer",
      "tiktok-video-resizer",
      "twitter-header-resizer",
      "linkedin-banner-resizer"
    ],
    relatedArticleSlugs: [
      "instagram-image-sizes-guide"
    ]
  },
  {
    id: "instagram-story",
    slug: "instagram-story-resizer",
    name: "Instagram Story Resizer",
    platformId: "instagram",
    platformLabel: "Instagram",
    surfaceId: "story",
    surfaceLabel: "Story",
    width: 1080,
    height: 1920,
    aspectRatioLabel: "9:16",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free Instagram Story Resizer - Resize Images to 1080x1920",
      description: "Resize any image to the perfect Instagram Story size (1080x1920). Free online tool for creating full-screen stories. No signup required.",
      h1: "Instagram Story Resizer",
      intro: "Create full-screen Instagram Stories that captivate your audience. Upload any image and instantly resize it to the perfect 1080×1920 vertical dimensions.",
      faq: [
        {
          question: "What size should Instagram Stories be?",
          answer: "Instagram Stories should be 1080x1920 pixels with a 9:16 vertical aspect ratio. This fills the entire phone screen."
        },
        {
          question: "Why is my Story getting cropped?",
          answer: "Instagram may crop images that don't match the 9:16 ratio. Use our resizer to ensure your images fit perfectly without cropping."
        },
        {
          question: "Is this tool free?",
          answer: "Yes, completely free with no watermarks or signup required."
        },
        {
          question: "What about safe zones for Stories?",
          answer: "Keep important content away from the top 14% and bottom 14% of the image. The username appears at the top, and interactive elements appear at the bottom."
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Keep text away from top and bottom edges",
        "Username appears at top, swipe-up at bottom"
      ]
    },
    relatedToolSlugs: [
      "instagram-post-resizer",
      "tiktok-video-resizer",
      "youtube-thumbnail-resizer",
      "twitter-header-resizer",
      "linkedin-banner-resizer"
    ],
    relatedArticleSlugs: [
      "instagram-story-best-practices"
    ]
  },
  {
    id: "tiktok-cover",
    slug: "tiktok-video-resizer",
    name: "TikTok Video Cover Resizer",
    platformId: "tiktok",
    platformLabel: "TikTok",
    surfaceId: "cover",
    surfaceLabel: "Video Cover",
    width: 1080,
    height: 1920,
    aspectRatioLabel: "9:16",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free TikTok Cover Resizer - Resize Images to 1080x1920",
      description: "Resize any image to the perfect TikTok video cover size (1080x1920). Free online tool for creating eye-catching TikTok thumbnails. No signup required.",
      h1: "TikTok Video Cover Resizer",
      intro: "Create eye-catching TikTok cover images that stop scrollers in their tracks. Upload any image and instantly resize it to TikTok's optimal 1080×1920 dimensions.",
      faq: [
        {
          question: "What size should TikTok covers be?",
          answer: "TikTok video covers should be 1080x1920 pixels with a 9:16 vertical aspect ratio, matching the full-screen video format."
        },
        {
          question: "Why do TikTok covers matter?",
          answer: "Your cover image is the first thing viewers see on your profile grid. A compelling cover can significantly increase video views."
        },
        {
          question: "Is this tool free?",
          answer: "Yes, completely free with no watermarks or signup required."
        },
        {
          question: "What makes a good TikTok cover?",
          answer: "Use bold text, expressive faces, bright colors, and keep the central area clear since that's what shows in your profile grid."
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Profile grid shows center portion - keep key elements centered",
        "Text should be large and readable"
      ]
    },
    relatedToolSlugs: [
      "instagram-story-resizer",
      "instagram-post-resizer",
      "youtube-thumbnail-resizer",
      "twitter-header-resizer",
      "linkedin-banner-resizer"
    ],
    relatedArticleSlugs: [
      "tiktok-cover-image-tips"
    ]
  },
  {
    id: "twitter-header",
    slug: "twitter-header-resizer",
    name: "Twitter/X Header Resizer",
    platformId: "twitter",
    platformLabel: "Twitter/X",
    surfaceId: "header",
    surfaceLabel: "Header Banner",
    width: 1500,
    height: 500,
    aspectRatioLabel: "3:1",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free Twitter/X Header Resizer - Resize Images to 1500x500",
      description: "Resize any image to the perfect Twitter/X header banner size (1500x500). Free online tool for creating professional profile headers. No signup required.",
      h1: "Twitter/X Header Resizer",
      intro: "Create a professional Twitter/X header that makes a strong first impression. Upload any image and instantly resize it to Twitter's recommended 1500×500 dimensions.",
      faq: [
        {
          question: "What size should a Twitter header be?",
          answer: "Twitter/X recommends header images be 1500x500 pixels with a 3:1 aspect ratio. This displays perfectly across desktop and mobile."
        },
        {
          question: "Why does my header look cropped on mobile?",
          answer: "Twitter crops headers differently on mobile vs desktop. Keep important elements centered and avoid placing text near the edges."
        },
        {
          question: "Is this tool free?",
          answer: "Yes, completely free with no watermarks or signup required."
        },
        {
          question: "What should I put in my Twitter header?",
          answer: "Popular choices include your tagline, current project, contact info, or branded graphics. Keep text minimal and readable."
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Profile picture overlaps bottom-left on desktop",
        "Keep important content centered for mobile compatibility"
      ]
    },
    relatedToolSlugs: [
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer",
      "instagram-post-resizer",
      "tiktok-video-resizer",
      "instagram-story-resizer"
    ],
    relatedArticleSlugs: [
      "twitter-header-design-tips"
    ]
  },
  {
    id: "linkedin-banner",
    slug: "linkedin-banner-resizer",
    name: "LinkedIn Banner Resizer",
    platformId: "linkedin",
    platformLabel: "LinkedIn",
    surfaceId: "banner",
    surfaceLabel: "Profile Banner",
    width: 1584,
    height: 396,
    aspectRatioLabel: "4:1",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free LinkedIn Banner Resizer - Resize Images to 1584x396",
      description: "Resize any image to the perfect LinkedIn profile banner size (1584x396). Free online tool for creating professional LinkedIn headers. No signup required.",
      h1: "LinkedIn Banner Resizer",
      intro: "Create a professional LinkedIn banner that establishes credibility. Upload any image and instantly resize it to LinkedIn's optimal 1584×396 dimensions.",
      faq: [
        {
          question: "What size should a LinkedIn banner be?",
          answer: "LinkedIn recommends banner images be 1584x396 pixels with a 4:1 aspect ratio for personal profiles. Company page banners should be 1128x191 pixels."
        },
        {
          question: "What makes a good LinkedIn banner?",
          answer: "Professional banners typically include your specialty, contact info, or a clean branded design. Avoid clutter and ensure text is readable."
        },
        {
          question: "Is this tool free?",
          answer: "Yes, completely free with no watermarks or signup required."
        },
        {
          question: "How do I make my banner look professional?",
          answer: "Use clean fonts, subtle colors, and minimal text. Include your value proposition or current role. Avoid busy backgrounds that distract from your profile photo."
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Profile picture overlaps bottom-left corner",
        "Keep key content in the right 2/3 of the image"
      ]
    },
    relatedToolSlugs: [
      "twitter-header-resizer",
      "youtube-thumbnail-resizer",
      "instagram-post-resizer",
      "tiktok-video-resizer",
      "instagram-story-resizer"
    ],
    relatedArticleSlugs: [
      "linkedin-banner-best-practices"
    ]
  }
];

export const PRESETS_BY_SLUG: Record<string, PlatformImagePreset> = platformImagePresets.reduce(
  (acc, preset) => {
    acc[preset.slug] = preset;
    return acc;
  },
  {} as Record<string, PlatformImagePreset>
);

export function getPresetBySlug(slug: string): PlatformImagePreset | undefined {
  return PRESETS_BY_SLUG[slug];
}

export function getPresetById(id: string): PlatformImagePreset | undefined {
  return platformImagePresets.find((preset) => preset.id === id);
}
