export interface OutfitEngineFaq {
  q: string;
  a: string;
}

export interface OutfitEngineConfig {
  slug: string;
  title: string;
  subtitle: string;
  badgeLabel: string;
  badgeIcon?: 'camera' | 'sparkles' | 'shopping-bag';
  uploadTitle: string;
  uploadDescription?: string;
  uploadHelpText: string;
  apiPath: string;
  faqs: OutfitEngineFaq[];
}

export const outfitPresets: Record<string, OutfitEngineConfig> = {
  'outfit-ideas-ai': {
    slug: 'outfit-ideas-ai',
    title: 'AI Outfit Finder',
    subtitle: 'Upload any outfit photo and instantly find similar pieces to shop. Powered by AI vision technology.',
    badgeLabel: 'Free AI Style Finder',
    badgeIcon: 'sparkles',
    uploadTitle: 'Upload Outfit Photo',
    uploadDescription: 'Upload a photo of an outfit you love',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: [
      {
        q: 'How does the AI outfit finder work?',
        a: 'Our AI analyzes your uploaded outfit photo to identify individual clothing items, then searches for similar products across multiple retailers.'
      },
      {
        q: 'Is this service free?',
        a: 'Yes! The outfit analyzer is completely free to use with no signup required.'
      },
      {
        q: 'What image formats are supported?',
        a: 'We support JPG, PNG, and WebP images up to 5MB in size.'
      },
      {
        q: 'Are my photos stored?',
        a: 'Photos are processed temporarily for analysis and are not permanently stored on our servers.'
      }
    ]
  },
  'streetwear-outfit-finder': {
    slug: 'streetwear-outfit-finder',
    title: 'Streetwear Outfit Finder',
    subtitle: 'Find streetwear pieces that match your style. Upload any street fashion photo and discover where to shop.',
    badgeLabel: 'Streetwear AI',
    badgeIcon: 'shopping-bag',
    uploadTitle: 'Upload Streetwear Photo',
    uploadDescription: 'Share your streetwear inspiration',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: [
      {
        q: 'What is streetwear style?',
        a: 'Streetwear combines casual, comfortable clothing with urban fashion influences, often featuring bold graphics, sneakers, and statement pieces.'
      },
      {
        q: 'Can I find specific brands?',
        a: 'Our AI identifies clothing styles and searches across multiple retailers. While we try to match exact items, we also suggest similar alternatives.'
      },
      {
        q: 'How accurate are the matches?',
        a: 'AI matching accuracy depends on image quality and how distinctive the items are. Clearer photos with visible details produce better matches.'
      }
    ]
  }
};

export function getOutfitPresetBySlug(slug: string): OutfitEngineConfig | null {
  return outfitPresets[slug] || null;
}
