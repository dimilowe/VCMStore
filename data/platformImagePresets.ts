export type PlatformImagePreset = {
  id: string;
  slug: string;
  name: string;
  width: number;
  height: number;
  aspectRatioLabel: string;
  maxFileSizeMB: number;
  outputFormats: ("jpg" | "png")[];
  seo: {
    title: string;
    description: string;
    h1: string;
    faq: { question: string; answer: string }[];
  };
  ui: {
    showSafeZoneOverlay?: boolean;
    notes?: string[];
  };
};

export const platformImagePresets: PlatformImagePreset[] = [
  {
    id: "youtube-thumbnail",
    slug: "youtube-thumbnail-resizer",
    name: "YouTube Thumbnail Resizer",
    width: 1280,
    height: 720,
    aspectRatioLabel: "16:9",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free YouTube Thumbnail Resizer - Resize Images to 1280x720",
      description: "Instantly resize any image to the perfect YouTube thumbnail size (1280x720). Free online tool with no signup required. Get perfectly sized thumbnails in seconds.",
      h1: "YouTube Thumbnail Resizer",
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
    }
  },
  {
    id: "instagram-post",
    slug: "instagram-post-resizer",
    name: "Instagram Post Resizer",
    width: 1080,
    height: 1080,
    aspectRatioLabel: "1:1",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free Instagram Post Resizer - Resize Images to 1080x1080",
      description: "Resize any image to the perfect Instagram square post size (1080x1080). Free online tool, no signup required. Create perfectly sized Instagram posts instantly.",
      h1: "Instagram Post Resizer",
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
        }
      ]
    },
    ui: {
      notes: [
        "Square format displays largest in the Instagram grid",
        "Keep important content centered"
      ]
    }
  },
  {
    id: "instagram-story",
    slug: "instagram-story-resizer",
    name: "Instagram Story Resizer",
    width: 1080,
    height: 1920,
    aspectRatioLabel: "9:16",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free Instagram Story Resizer - Resize Images to 1080x1920",
      description: "Resize any image to the perfect Instagram Story size (1080x1920). Free online tool for creating full-screen stories. No signup required.",
      h1: "Instagram Story Resizer",
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
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Keep text away from top and bottom edges",
        "Username appears at top, swipe-up at bottom"
      ]
    }
  },
  {
    id: "tiktok-cover",
    slug: "tiktok-video-resizer",
    name: "TikTok Video Cover Resizer",
    width: 1080,
    height: 1920,
    aspectRatioLabel: "9:16",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free TikTok Cover Resizer - Resize Images to 1080x1920",
      description: "Resize any image to the perfect TikTok video cover size (1080x1920). Free online tool for creating eye-catching TikTok thumbnails. No signup required.",
      h1: "TikTok Video Cover Resizer",
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
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Profile grid shows center portion - keep key elements centered",
        "Text should be large and readable"
      ]
    }
  },
  {
    id: "twitter-header",
    slug: "twitter-header-resizer",
    name: "Twitter/X Header Resizer",
    width: 1500,
    height: 500,
    aspectRatioLabel: "3:1",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free Twitter/X Header Resizer - Resize Images to 1500x500",
      description: "Resize any image to the perfect Twitter/X header banner size (1500x500). Free online tool for creating professional profile headers. No signup required.",
      h1: "Twitter/X Header Resizer",
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
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Profile picture overlaps bottom-left on desktop",
        "Keep important content centered for mobile compatibility"
      ]
    }
  },
  {
    id: "linkedin-banner",
    slug: "linkedin-banner-resizer",
    name: "LinkedIn Banner Resizer",
    width: 1584,
    height: 396,
    aspectRatioLabel: "4:1",
    maxFileSizeMB: 10,
    outputFormats: ["jpg", "png"],
    seo: {
      title: "Free LinkedIn Banner Resizer - Resize Images to 1584x396",
      description: "Resize any image to the perfect LinkedIn profile banner size (1584x396). Free online tool for creating professional LinkedIn headers. No signup required.",
      h1: "LinkedIn Banner Resizer",
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
        }
      ]
    },
    ui: {
      showSafeZoneOverlay: true,
      notes: [
        "Profile picture overlaps bottom-left corner",
        "Keep key content in the right 2/3 of the image"
      ]
    }
  }
];

export function getPresetBySlug(slug: string): PlatformImagePreset | undefined {
  return platformImagePresets.find((preset) => preset.slug === slug);
}

export function getPresetById(id: string): PlatformImagePreset | undefined {
  return platformImagePresets.find((preset) => preset.id === id);
}
