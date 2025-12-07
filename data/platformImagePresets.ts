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
    platformGuide: string;
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
      platformGuide: `## YouTube Thumbnail Best Practices for 2025

### Official Size Requirements
YouTube's recommended thumbnail dimensions are **1280×720 pixels** with a **16:9 aspect ratio**. The minimum width is 640 pixels, and file size must stay under 2MB. Accepted formats include JPG, PNG, and GIF (non-animated). These specifications ensure your thumbnail displays crisp on all devices—from 4K monitors to mobile phones.

### The Safe Zone Rule
YouTube crops thumbnails slightly depending on where they appear (search results, suggested videos, homepage). Keep critical elements like faces and text at least **10% away from all edges**. The bottom-right corner often shows video duration overlays, so avoid placing important content there.

### Design Do's & Don'ts

**Do:**
- Use bold, high-contrast colors that pop against YouTube's white/dark backgrounds
- Include expressive human faces—eyes create emotional connection
- Add 3-5 words of large, readable text (minimum 24pt equivalent)
- Create visual consistency across your channel for brand recognition
- Test how your thumbnail looks at small sizes (mobile thumbnail preview)

**Don't:**
- Overcrowd with too many elements or excessive text
- Use low-resolution or blurry images
- Mislead viewers with clickbait that doesn't match content
- Rely on thin fonts or colors that blend into the background
- Ignore mobile users (60%+ of YouTube views are on phones)

### CTR Optimization Tips
Thumbnails with faces get **38% higher CTR** on average. Bright colors (yellow, orange, red) outperform muted tones. Contrast is king—your thumbnail competes against dozens of others. Consider A/B testing different designs using YouTube Studio's test feature.

### File Format Recommendations
Use **JPG** for photographs (smaller file size, faster loading). Choose **PNG** for graphics with text, logos, or flat colors (sharper edges). Always export at maximum quality—YouTube will compress it further.

### Mobile vs Desktop Considerations
On mobile, thumbnails appear smaller, so text must be significantly larger than you'd think. What looks readable on your desktop monitor may become illegible on a phone screen. Always preview at 100×56 pixels to simulate mobile appearance.`,
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
      platformGuide: `## Instagram Post Image Guide for 2025

### Current Size Standards
Instagram's classic square post format is **1080×1080 pixels** with a perfect **1:1 aspect ratio**. While Instagram now supports multiple formats, square posts still dominate the grid and display at the largest size in profile view. For 2025, Instagram continues to favor high-resolution images—always upload at 1080px width minimum.

### Understanding Instagram's Compression
Instagram compresses all uploaded images. To minimize quality loss: upload at exactly 1080px width, use JPG format for photos (PNG for graphics with text), and keep file sizes under 8MB. Images with lots of fine detail or gradients suffer most from compression—consider slightly over-sharpening before upload.

### Square vs Portrait vs Carousel

**Square (1:1):** The classic format. Displays largest in your profile grid and works best for standalone product shots, quotes, and centered compositions.

**Portrait (4:5):** Takes up more screen real estate in the feed. Ideal for fashion, portraits, and content where vertical space adds impact. Size: 1080×1350 pixels.

**Carousel:** Use 1080×1080 for consistency across slides, or 1080×1350 for maximum engagement. Keep aspect ratio consistent within a single carousel post.

### Color and Filter Best Practices
Instagram's algorithm favors bright, well-lit images with consistent color palettes. Over-filtering is outdated—subtle enhancements outperform heavy filters. Stick to your brand colors for a cohesive grid aesthetic. Test how your colors display on different phones; some screens oversaturate.

### Design Do's & Don'ts

**Do:**
- Center your main subject for square crops
- Use white space strategically
- Maintain a consistent visual style across posts
- Include your brand colors subtly
- Consider how single posts look in your overall grid

**Don't:**
- Place important elements near edges (cropping happens)
- Use text smaller than 24pt (illegible on mobile)
- Rely solely on stock photos (authenticity wins)
- Post low-resolution or pixelated images
- Ignore the preview before posting

### Engagement Optimization
Posts with faces receive 38% more likes. Carousel posts get 1.4x more reach than single images. The first image matters most—make it count. Consistency in posting time and aesthetic builds algorithmic favor.`,
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
      platformGuide: `## Instagram Story Dimensions & Best Practices 2025

### Official Size Specifications
Instagram Stories require **1080×1920 pixels** with a **9:16 vertical aspect ratio**. This full-screen format fills modern smartphone displays edge-to-edge. Stories support both images and videos up to 15 seconds per slide. Maximum file size is 30MB for video, 8MB for images.

### Critical Safe Zones
Instagram overlays UI elements on Stories that can hide your content:

**Top 14% (approximately 250-270 pixels):** Your username, profile picture, and "X" close button appear here. Keep critical text and faces below this zone.

**Bottom 14% (approximately 250-270 pixels):** Reply bar, stickers, and swipe-up/link buttons occupy this space. Never place call-to-actions or important text at the bottom.

**Center 72%:** This is your safe zone for all important visual content.

### Design Best Practices

**Do:**
- Use vertical compositions designed specifically for Stories
- Create visual hierarchy with your main message in the center
- Add movement or stickers to increase engagement
- Include clear calls-to-action (swipe, tap, reply)
- Maintain brand colors for instant recognition
- Use large, bold text (minimum 32pt equivalent)

**Don't:**
- Repurpose horizontal content without proper cropping
- Place text near edges where it might be cut off
- Use busy backgrounds that compete with your message
- Forget about the link sticker zone at the bottom
- Post Stories without previewing on mobile

### Text and Typography
Text on Stories must be readable in 2 seconds or less. Use high-contrast colors—white text with black outline works universally. Avoid placing text over complex backgrounds. Instagram's native fonts are optimized for readability, but custom text as images should be at least 48px.

### Mobile-First Considerations
100% of Story views happen on mobile devices. Always preview your Stories on an actual phone before posting. What looks perfect on desktop may have readability issues on smaller screens. Consider notched and dynamic island iPhone displays when designing.

### Engagement Optimization
Interactive stickers (polls, quizzes, sliders) increase engagement by 15-25%. Story sequences of 4-7 slides have the highest completion rates. Post during peak hours (11am-1pm, 7pm-9pm local time) for maximum visibility.`,
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
      platformGuide: `## TikTok Cover Image Guide for 2025

### Official Dimensions
TikTok video covers use **1080×1920 pixels** with a **9:16 vertical aspect ratio**—identical to the video format itself. Your cover image is extracted from your video or can be uploaded as a custom frame. For maximum impact, create dedicated cover images rather than relying on random video frames.

### Understanding the Profile Grid
When viewers visit your profile, they see a grid of your video covers. TikTok displays only the **center square portion** of each cover in this grid view. This means approximately **420 pixels on each side** are cropped in grid view, even though the full 9:16 ratio shows when viewing a video directly.

### Safe Zone Strategy

**Grid-Safe Center Zone:** Keep your main subject, text, and key visuals in the center 1080×1080 square (the middle portion of your 1080×1920 canvas). This ensures visibility in both grid and full views.

**Video Title Placement:** Position text in the center-top area. Avoid the bottom 200 pixels where TikTok overlays the caption and interaction buttons.

**Avoid Edge Content:** The top and bottom areas may be cropped or obscured by UI elements depending on the device.

### Design Best Practices

**Do:**
- Use bold, legible text (minimum 48pt equivalent)
- Include expressive human faces or reactions
- Create visual consistency across your covers for brand recognition
- Use bright, saturated colors that pop on mobile screens
- Design specifically for the center square that shows in grid view

**Don't:**
- Rely on video auto-generated thumbnails
- Place important text at the very bottom (caption overlay zone)
- Use thin fonts or low-contrast color combinations
- Overcrowd with too many elements
- Forget that most viewing happens on small phone screens

### Color and Contrast Tips
TikTok's dark-mode interface is popular among users. Design covers that stand out against both light and dark backgrounds. High saturation and strong contrast perform best. Yellow, red, and cyan tend to grab attention in the busy For You feed.

### Cover Selection Strategy
You can select any frame from your video or upload a custom cover image. Custom covers consistently outperform random frames for engagement. Consider creating a cover template with your branding that you can customize for each video.`,
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
      platformGuide: `## Twitter/X Header Banner Guide for 2025

### Official Size Requirements
Twitter/X recommends header images at **1500×500 pixels** with a **3:1 aspect ratio**. Maximum file size is 5MB. Accepted formats include JPG, PNG, and GIF (static only for headers). The ultra-wide format creates a cinematic backdrop for your profile that displays across all devices.

### Desktop vs Mobile Display Differences
Twitter displays headers very differently depending on the device:

**Desktop:** Full 1500×500 banner displays above your profile. Your profile picture overlays the bottom-left corner. The header extends edge-to-edge.

**Mobile:** Twitter crops the header to approximately **1500×420 pixels**, removing content from both top and bottom. Additionally, the profile picture and name may overlay different areas.

### Safe Zone Strategy
Design with the "mobile crop" in mind:

**Vertical Safe Zone:** Keep critical content in the center 420 pixels vertically (from approximately y=40 to y=460).

**Left Side:** Avoid the bottom-left 200×200 pixel area where the profile picture sits on desktop.

**Center Focus:** Place your main message, tagline, or branding in the center of the image for guaranteed visibility across all devices.

### Design Best Practices

**Do:**
- Use the space for your tagline, current project, or CTA
- Maintain consistency with your overall brand colors
- Create visual interest that complements your profile picture
- Update seasonally or for major announcements
- Test on both desktop and mobile before publishing

**Don't:**
- Place important text in the bottom-left corner (profile picture zone)
- Use text smaller than 24pt (readability issues on mobile)
- Clutter with too many elements—the space is wide but short
- Forget to check mobile preview (most Twitter users are on mobile)
- Use complex images that become confusing when cropped

### Professional vs Personal Branding
For professionals: Include your title, company, key skills, or portfolio link as visual elements. Subtle patterns with your brand colors create sophistication.

For creators: Showcase your content type, latest work, or community call-to-action. Use consistent visual language that matches your content style.

### Color and Composition Tips
The header sits behind your profile content, so choose colors that don't clash with your profile picture. Consider how white or dark mode affects appearance. High-contrast, clean designs perform best. Gradients and subtle textures add depth without distraction.`,
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
      platformGuide: `## LinkedIn Profile Banner Guide for 2025

### Official Size Requirements
LinkedIn personal profile banners should be **1584×396 pixels** with a **4:1 aspect ratio**. Company page banners differ at 1128×191 pixels. Maximum file size is 8MB. Accepted formats include JPG and PNG. The ultra-wide format provides a professional backdrop that frames your entire profile section.

### Desktop vs Mobile Display
LinkedIn adapts banner display across devices:

**Desktop:** Full banner displays behind your profile section. Your profile photo overlaps the bottom-left corner. The name/headline section sits below the banner.

**Mobile:** Banner is cropped more aggressively—approximately the center **1584×280 pixels** displays. The profile photo sits in the center-bottom, not left.

### Safe Zone Strategy

**Left Side (Desktop):** Avoid placing important content in the left 200×200 pixel area where your profile picture overlays.

**Center-Bottom (Mobile):** The profile photo sits center-bottom on mobile. Keep critical content in the top 2/3 of your banner.

**Right 2/3 Rule:** The safest area for text and key visuals is the right two-thirds of your banner, visible on all devices.

### Design Best Practices

**Do:**
- Include your value proposition or specialty
- Use your brand colors consistently
- Add subtle contact information or website
- Create clean, professional compositions
- Update for career changes or achievements

**Don't:**
- Use busy backgrounds that compete with your profile
- Place text over your profile photo zone
- Use generic stock photos (they look unprofessional)
- Include too much text (keep it scannable)
- Forget to preview on mobile before publishing

### Professional Branding Elements
Consider including: your job title and specialty, company logo (if appropriate), industry keywords, a clean tagline, or subtle contact icons. Many professionals use abstract gradients or subtle patterns with their brand colors for a polished look.

### What High-Performing Profiles Include
Top LinkedIn profiles often feature banners with: speaking engagements, book covers, achievement highlights, company branding, or clear value propositions. The banner should answer "what do you do?" at a glance.

### Color Psychology for LinkedIn
Blue (trust, professionalism), green (growth, finance), purple (creativity, innovation), and orange (energy, action) perform well. Avoid neon colors or busy patterns. Your banner should complement, not overpower, your professional photo.

### Common Mistakes to Avoid
Low-resolution images, outdated information, default gray banners, cluttered designs, and text that becomes unreadable when cropped. Always test on both desktop and the LinkedIn mobile app before finalizing.`,
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
