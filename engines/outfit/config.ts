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
  contentGuide?: string;
}

export const BASE_FAQS: OutfitEngineFaq[] = [
  {
    q: 'How does this outfit finder work?',
    a: 'Upload any outfit photo and our AI analyzes it to identify items like tops, pants, shoes, and accessories. For each item, we generate search keywords and find similar products from shopping sites so you can recreate the look.'
  },
  {
    q: 'Is this outfit generator free?',
    a: 'Yes, this outfit ideas tool is 100% free to use. No signup or account required. Just upload a photo and get instant shopping suggestions.'
  },
  {
    q: 'What kind of photos work best?',
    a: 'Clear, well-lit photos work best. Full-body outfit shots, Instagram fashion posts, celebrity looks, or Pinterest inspiration boards all work great. The AI can identify multiple items in a single photo.'
  },
  {
    q: 'Can I use screenshots from social media?',
    a: 'Yes. You can upload screenshots from Instagram, TikTok, Pinterest, or any site. The AI will identify shoppable items and find similar products.'
  },
  {
    q: 'Are the product links always exact matches?',
    a: 'We look for visually similar items. Prices and availability may vary. Always double-check details on the retailer\'s website before purchasing.'
  }
];

export const OUTFIT_PRESETS: Record<string, OutfitEngineConfig> = {
  'outfit-ideas-ai': {
    slug: 'outfit-ideas-ai',
    title: 'Outfit Ideas Generator – Shop Any Look',
    subtitle:
      'Upload any outfit photo and instantly find similar items to shop. Recreate celebrity looks, Pinterest inspiration, or your favorite Instagram styles with AI-powered product matching.',
    badgeLabel: 'Free AI Style Finder',
    badgeIcon: 'camera',
    uploadTitle: 'Upload Outfit Photo',
    uploadDescription: '',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## How This AI Outfit Generator Works

This tool uses computer vision to analyze any outfit photo you upload. The AI identifies individual clothing items, accessories, and shoes, then generates search keywords to find similar products online.

### Step 1: Upload Any Outfit Photo

You can upload photos from anywhere:
- Instagram screenshots of influencer outfits
- Pinterest boards with fashion inspiration
- Celebrity red carpet or street style photos
- TikTok outfit of the day screenshots

### Step 2: AI Identifies Each Item

The AI breaks down the outfit into individual pieces like tops, bottoms, outerwear, shoes, and accessories. For each item, it generates descriptive keywords based on color, style, and material.

### Step 3: Shop Similar Items

For each detected item, you get links to similar products from popular retailers. Click any product to view it on the retailer's website.

### Tips for Best Results

- Use clear, well-lit photos where clothing is visible
- Full-body outfit shots work better than close-ups
- Avoid photos with multiple people or busy backgrounds
- Higher resolution images give more accurate results`
  },

  'streetwear-outfit-finder': {
    slug: 'streetwear-outfit-finder',
    title: 'Streetwear Outfit Finder – Shop Urban Looks',
    subtitle:
      'Upload any streetwear outfit photo and get instant shoppable matches for cargos, graphic tees, hoodies, and statement sneakers.',
    badgeLabel: 'Streetwear AI Stylist',
    badgeIcon: 'shopping-bag',
    uploadTitle: 'Upload Streetwear Outfit Photo',
    uploadDescription:
      'Perfect for Instagram fits, Pinterest moodboards, or celebrity street style screenshots.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## The Streetwear Outfit Finder Guide

Streetwear is about statement pieces, bold graphics, and mixing high and low fashion. This tool helps you find shoppable versions of any streetwear look you see online.

### What Streetwear Pieces This Tool Finds

- **Graphic tees and hoodies:** Band merch, vintage prints, designer collabs
- **Cargo pants and baggy jeans:** Wide-leg fits, utility pockets, distressed denim
- **Statement sneakers:** Jordans, Dunks, designer kicks, chunky trainers
- **Outerwear:** Bomber jackets, puffer coats, varsity jackets
- **Accessories:** Bucket hats, chains, crossbody bags

### Best Sources for Streetwear Inspo

Upload screenshots from these to find similar pieces:
- Instagram fits from streetwear accounts
- Pinterest boards with urban fashion
- TikTok outfit check videos
- Celebrity street style paparazzi shots

### How to Layer Streetwear Outfits

Streetwear is all about layering. Start with a base tee, add an open button-up or hoodie, and finish with outerwear. The AI will identify each layer separately so you can shop the full look.`
  },

  'date-night-outfit-generator': {
    slug: 'date-night-outfit-generator',
    title: 'Date Night Outfit Generator – Recreate Any Romantic Look',
    subtitle:
      'Upload your date-night inspo photo and get AI-powered outfit matches for dinners, cocktails, and special nights out.',
    badgeLabel: 'AI Date Night Stylist',
    badgeIcon: 'sparkles',
    uploadTitle: 'Upload Date Night Outfit Photo',
    uploadDescription:
      'Use screenshots from Instagram, TikTok, or Pinterest date-night looks.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Date Night Outfit Ideas with AI

Finding the perfect date night outfit is easier when you have a reference photo. Upload any romantic outfit inspo and get shoppable alternatives in seconds.

### Date Night Outfit Categories

- **Dinner dates:** Elegant dresses, chic blouses with trousers, sophisticated jumpsuits
- **Cocktail bars:** Statement tops, leather pants, strappy heels
- **Casual dates:** Elevated basics, nice jeans, cute flats or ankle boots
- **Special occasions:** Little black dresses, satin pieces, dressy accessories

### Styling Tips for Date Night

**Keep it simple:** One statement piece is enough. If your dress is bold, keep jewelry minimal.

**Comfort matters:** You want to feel confident, not uncomfortable. If you never wear heels, stick with elegant flats.

**Consider the venue:** A rooftop cocktail bar calls for different shoes than a beachside restaurant.

### Finding Your Date Night Aesthetic

Upload photos that match your personality. The AI will find pieces that recreate the vibe without forcing you into a style that doesn't feel like you.`
  },

  'office-outfit-generator': {
    slug: 'office-outfit-generator',
    title: 'Office Outfit Generator – Smart Casual Work Looks',
    subtitle:
      'Upload any office outfit photo and get shoppable suggestions for blazers, trousers, blouses, and smart shoes.',
    badgeLabel: 'Workwear AI Stylist',
    badgeIcon: 'shopping-bag',
    uploadTitle: 'Upload Office Outfit Photo',
    uploadDescription:
      'Great for business casual inspiration, LinkedIn-style looks, and corporate outfits.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Office Outfit Ideas for Every Dress Code

Whether your workplace is business formal or smart casual, this tool helps you find workwear pieces that match your office aesthetic.

### Business Casual Essentials

- **Blazers:** Structured jackets in neutral colors work with almost everything
- **Trousers:** Tailored pants in black, navy, or gray
- **Blouses:** Clean silhouettes, minimal patterns
- **Smart shoes:** Loafers, low heels, polished flats

### Building a Work Wardrobe

The key to office dressing is having versatile pieces that mix and match. A good blazer, quality trousers, and a few neutral blouses can create weeks of outfits.

### Dress Codes Explained

**Business formal:** Suits, ties, structured dresses
**Business casual:** Blazers optional, dress pants or chinos, collared shirts
**Smart casual:** Nice jeans allowed, polished sneakers okay, no ties required

### Finding Office Inspo

Upload screenshots from LinkedIn, corporate Instagram accounts, or business fashion blogs. The AI will identify each piece so you can rebuild the look at your budget.`
  },

  'capsule-wardrobe-outfit-finder': {
    slug: 'capsule-wardrobe-outfit-finder',
    title: 'Capsule Wardrobe Outfit Finder – Mix & Match Essentials',
    subtitle:
      'Upload your closet or inspo photos and get outfits built around timeless essentials, neutral palettes, and repeatable pieces.',
    badgeLabel: 'Capsule AI Stylist',
    badgeIcon: 'camera',
    uploadTitle: 'Upload Capsule Wardrobe Photo',
    uploadDescription:
      'Perfect for minimalists and anyone trying to get more outfits from fewer pieces.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Building a Capsule Wardrobe with AI

A capsule wardrobe is a small collection of versatile pieces that mix and match to create many outfits. This tool helps you find pieces that work together.

### The Core Capsule Formula

- **5 tops:** Neutral colors, simple patterns, quality fabrics
- **3 bottoms:** Jeans, trousers, skirt or shorts
- **2 outerwear pieces:** Blazer, jacket, or cardigan
- **3 pairs of shoes:** Sneakers, boots, and dress shoes
- **Accessories:** Belt, bag, and a few pieces of jewelry

### How to Use This Tool for Capsule Building

Upload photos of outfits you love. The AI will identify each piece, and you can look for items that would work with what you already own.

### Capsule Wardrobe Color Palettes

Stick to a base of neutrals (black, white, gray, navy, beige) and add 1-2 accent colors. Every piece should work with at least 3 other items in your closet.`
  },

  'vacation-outfit-generator': {
    slug: 'vacation-outfit-generator',
    title: 'Vacation Outfit Generator – Beach & Resort Looks',
    subtitle:
      'Upload any vacation inspo photo and get shoppable matches for beachwear, resort outfits, and travel fits.',
    badgeLabel: 'Vacation AI Stylist',
    badgeIcon: 'sparkles',
    uploadTitle: 'Upload Vacation Outfit Photo',
    uploadDescription:
      'Use travel photos, Pinterest boards, or Instagram resort outfits as your starting point.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Vacation Outfit Planning with AI

Packing for vacation is easier when you plan outfits in advance. Upload inspo photos and find pieces that work for your trip.

### Vacation Outfit Categories

- **Beach days:** Swimwear, coverups, sandals, sun hats
- **City exploring:** Comfortable walking shoes, breathable layers
- **Resort dinners:** Flowy dresses, linen pants, dressy sandals
- **Day trips:** Practical but cute outfits that photograph well

### Packing Light Tips

Choose pieces that work double duty. A linen shirt works for beach coverup and dinner. Neutral bottoms pair with multiple tops.

### Finding Vacation Inspo

Upload photos from travel bloggers, resort Instagram accounts, or Pinterest vacation boards. The AI will break down each look so you can recreate it.`
  },

  'winter-outfit-generator': {
    slug: 'winter-outfit-generator',
    title: 'Winter Outfit Generator – Coats, Layers & Boots',
    subtitle:
      'Upload any cold-weather outfit photo and get matches for coats, knitwear, scarves, and boots.',
    badgeLabel: 'Winter AI Stylist',
    badgeIcon: 'shopping-bag',
    uploadTitle: 'Upload Winter Outfit Photo',
    uploadDescription:
      'Great for layered streetwear, city coats, and cozy knitwear inspiration.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Winter Outfit Ideas with AI

Cold weather doesn't mean boring outfits. This tool helps you find coats, layers, and boots that look as good as they feel.

### Winter Wardrobe Essentials

- **Coats:** Wool coats, puffer jackets, parkas
- **Knitwear:** Chunky sweaters, cardigans, turtlenecks
- **Layers:** Long-sleeve tees, thermals, fleece
- **Boots:** Ankle boots, knee-high boots, waterproof styles
- **Accessories:** Scarves, beanies, gloves

### Layering for Warmth and Style

Start with a thin base layer, add a sweater or fleece, and finish with outerwear. The AI identifies each layer so you can shop the full look.

### Winter Color Palettes

Dark neutrals, rich jewel tones, and pops of color work well in winter. Upload photos that inspire you and find similar pieces.`
  },

  'summer-outfit-generator': {
    slug: 'summer-outfit-generator',
    title: 'Summer Outfit Generator – Light & Airy Looks',
    subtitle:
      'Upload any summer outfit photo and get shoppable suggestions for dresses, shorts, sandals, and breezy tops.',
    badgeLabel: 'Summer AI Stylist',
    badgeIcon: 'sparkles',
    uploadTitle: 'Upload Summer Outfit Photo',
    uploadDescription:
      'Ideal for vacation fits, festivals, and warm-weather everyday outfits.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Summer Outfit Ideas with AI

Hot weather calls for light fabrics and breezy silhouettes. Upload summer outfit inspo and find pieces that keep you cool.

### Summer Wardrobe Staples

- **Dresses:** Sundresses, midi dresses, maxi dresses
- **Tops:** Tank tops, linen shirts, crop tops
- **Bottoms:** Shorts, linen pants, flowy skirts
- **Shoes:** Sandals, espadrilles, white sneakers
- **Accessories:** Straw bags, sunglasses, sun hats

### Fabrics That Keep You Cool

Look for linen, cotton, and lightweight blends. Avoid synthetic fabrics that trap heat.

### Summer Outfit Formulas

Dress + sandals. Shorts + breezy top + sneakers. Skirt + tank + espadrilles. Keep it simple and breathable.`
  },

  'party-outfit-generator': {
    slug: 'party-outfit-generator',
    title: 'Party Outfit Generator – Club & Night Out Looks',
    subtitle:
      'Upload any night-out inspo photo and get shoppable matches for dresses, heels, jewelry, and statement pieces.',
    badgeLabel: 'Party AI Stylist',
    badgeIcon: 'sparkles',
    uploadTitle: 'Upload Party Outfit Photo',
    uploadDescription:
      'Use screenshots from IG, TikTok, or Pinterest party fits.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Party Outfit Ideas with AI

Going out calls for statement pieces and bold choices. Upload party outfit inspo and find pieces that make an entrance.

### Party Outfit Categories

- **Club nights:** Mini dresses, bodysuits, statement tops
- **Birthday parties:** Sequins, metallics, dressy jumpsuits
- **Cocktail events:** LBDs, sleek heels, elegant accessories
- **House parties:** Elevated casual, nice jeans, cute tops

### Statement Pieces That Work

Pick one hero piece and build around it. A sequin dress needs minimal jewelry. A bold top pairs with simple bottoms.

### Finding Party Inspo

Upload screenshots from party TikToks, club Instagram accounts, or Pinterest night-out boards. The AI will identify each piece so you can recreate the vibe.`
  },

  'gym-outfit-generator': {
    slug: 'gym-outfit-generator',
    title: 'Gym Outfit Generator – Athleisure & Workout Looks',
    subtitle:
      'Upload any gym or athleisure outfit photo and get matches for leggings, sports bras, pumps, and tracksuits.',
    badgeLabel: 'Athleisure AI Stylist',
    badgeIcon: 'shopping-bag',
    uploadTitle: 'Upload Gym Outfit Photo',
    uploadDescription:
      'Great for gym mirror selfies, athleisure sets, and performance gear.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Gym & Athleisure Outfit Ideas with AI

Whether you're hitting the gym or running errands, this tool helps you find activewear that performs and looks good.

### Gym Wardrobe Essentials

- **Leggings:** High-waist, squat-proof, compression
- **Sports bras:** Supportive for your workout type
- **Tops:** Tank tops, crop tops, long-sleeve layers
- **Shoes:** Training shoes, running shoes, lifters
- **Accessories:** Gym bags, headbands, water bottles

### Athleisure vs Performance Gear

Athleisure is for everyday wear—looks good, comfortable, but not necessarily performance-focused. Performance gear is built for specific workouts.

### Finding Gym Inspo

Upload gym mirror selfies, fitness influencer photos, or athleisure Pinterest boards. The AI identifies each piece so you can shop matching sets.`
  },

  'wedding-guest-outfit-generator': {
    slug: 'wedding-guest-outfit-generator',
    title: 'Wedding Guest Outfit Generator – Formal & Semi-Formal Looks',
    subtitle:
      'Upload any wedding guest inspo photo and get AI-powered matches for dresses, suits, heels, and accessories.',
    badgeLabel: 'Wedding Guest AI Stylist',
    badgeIcon: 'sparkles',
    uploadTitle: 'Upload Wedding Guest Outfit Photo',
    uploadDescription:
      'Use Pinterest boards or IG photos for dress codes like black tie, cocktail, or garden party.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Wedding Guest Outfit Ideas with AI

Dress codes can be confusing. Upload wedding guest inspo and find pieces that match the vibe without overdoing it.

### Wedding Dress Codes Explained

- **Black tie:** Floor-length gowns, tuxedos
- **Formal:** Cocktail dresses, dark suits
- **Semi-formal:** Midi dresses, blazer combos
- **Casual:** Sundresses, linen suits, nice separates
- **Garden party:** Floral prints, pastels, dressy flats

### What Not to Wear

Avoid white, cream, or anything that could upstage the couple. Check if the invitation specifies colors to avoid.

### Finding Wedding Guest Inspo

Upload photos from wedding Pinterest boards, guest outfit TikToks, or formal event Instagram posts. The AI breaks down each look so you can recreate it within your budget.`
  },

  'aesthetic-outfit-generator': {
    slug: 'aesthetic-outfit-generator',
    title: 'Aesthetic Outfit Generator – TikTok & Pinterest Styles',
    subtitle:
      'Upload any aesthetic outfit photo (clean girl, coquette, Y2K, grunge, etc.) and get shoppable matches in that vibe.',
    badgeLabel: 'Aesthetic AI Stylist',
    badgeIcon: 'camera',
    uploadTitle: 'Upload Aesthetic Outfit Photo',
    uploadDescription:
      'Perfect for TikTok-core aesthetics, Pinterest boards, and moodboards.',
    uploadHelpText: 'JPG, PNG, or WebP. Max 5MB.',
    apiPath: '/api/tools/outfit-analyzer',
    faqs: BASE_FAQS,
    contentGuide: `## Aesthetic Outfit Ideas with AI

TikTok and Pinterest are full of distinct aesthetics. Upload any aesthetic outfit and find pieces that match the vibe.

### Popular Aesthetics

- **Clean girl:** Minimal makeup, slicked hair, neutral basics
- **Coquette:** Bows, lace, soft pinks, feminine details
- **Y2K:** Low-rise, butterfly clips, velour, baby tees
- **Grunge:** Oversized flannels, combat boots, dark layers
- **Dark academia:** Plaid, wool, Oxford shoes, structured pieces
- **Coastal grandma:** Linen, neutrals, relaxed silhouettes

### Building an Aesthetic Wardrobe

Pick one aesthetic and commit. Upload multiple photos from that style to find recurring pieces and patterns.

### Finding Aesthetic Inspo

Use TikTok aesthetic hashtags, Pinterest moodboards, or Instagram style accounts. Upload your favorites and let the AI find shoppable matches.`
  }
};

export function getOutfitPresetBySlug(slug: string): OutfitEngineConfig | null {
  return OUTFIT_PRESETS[slug] || null;
}
