export type PriceEngineMode = 'generic' | 'amazon' | 'shein' | 'aliexpress' | 'zara';

export interface PriceEngineCTA {
  id: 'track-price-drops' | 'find-cheaper-alternatives' | 'add-to-closet' | 'generate-outfits';
  label: string;
  description?: string;
  requiresPlan: 'shopping-cloud-pro';
}

export interface PriceEngineFaq {
  q: string;
  a: string;
}

export interface PriceEngineConfig {
  slug: string;
  title: string;
  subtitle?: string;

  mode: PriceEngineMode;
  allowUrlInput: boolean;
  allowNameInput: boolean;

  urlLabel?: string;
  urlPlaceholder?: string;
  nameLabel?: string;
  namePlaceholder?: string;

  showFakePriceHistory: boolean;
  showCurrentPriceBlock: boolean;
  showRetailerBadge: boolean;

  ctas: PriceEngineCTA[];

  cloudTag: 'shopping';
  featureFlagKey?: string;
  
  faqs?: PriceEngineFaq[];
  contentGuide?: string;
}

export const BASE_FAQS: PriceEngineFaq[] = [
  {
    q: 'How does this price tracker work?',
    a: 'Enter a product URL or name, and our tool will show you current pricing information. Upgrade to Shopping Cloud Pro to get automatic price-drop alerts and find cheaper alternatives.'
  },
  {
    q: 'Is this price tracker free?',
    a: 'Yes, basic price checking is 100% free. Pro features like automatic tracking, alerts, and finding cheaper alternatives require Shopping Cloud Pro.'
  },
  {
    q: 'What stores can I track prices from?',
    a: 'You can check prices from most major online retailers including Amazon, Shein, AliExpress, Zara, and thousands more. Just paste the product URL.'
  },
  {
    q: 'How accurate is the price history?',
    a: 'We show historical pricing data when available. Some retailers have more complete history than others. Pro users get more detailed price charts and alerts.'
  }
];

export const PRICE_ENGINE_PRESETS: Record<string, PriceEngineConfig> = {
  'track-price': {
    slug: 'track-price',
    title: 'Track Price of Any Product',
    subtitle: 'Paste a link or type the product name to see price info and set up alerts.',

    mode: 'generic',
    allowUrlInput: true,
    allowNameInput: true,
    urlLabel: 'Product URL',
    urlPlaceholder: 'Paste a product link from any store...',
    nameLabel: 'Product name',
    namePlaceholder: 'e.g. "red satin slip dress size M"',

    showFakePriceHistory: true,
    showCurrentPriceBlock: true,
    showRetailerBadge: true,

    ctas: [
      {
        id: 'track-price-drops',
        label: 'Track Price Drops Automatically (AI)',
        description: 'Get notified when this item gets cheaper.',
        requiresPlan: 'shopping-cloud-pro',
      },
      {
        id: 'find-cheaper-alternatives',
        label: 'Find 10 Cheaper Alternatives',
        description: 'See similar items at lower prices from top retailers.',
        requiresPlan: 'shopping-cloud-pro',
      },
      {
        id: 'add-to-closet',
        label: 'Save to Virtual Closet',
        description: 'Save this item and build outfits around it.',
        requiresPlan: 'shopping-cloud-pro',
      },
    ],

    cloudTag: 'shopping',
    faqs: BASE_FAQS,
    contentGuide: `## How This Free Price Tracker Works

This tool lets you check current prices for products from any online store. Just paste a URL or enter the product name to get started.

### Step 1: Enter Product Details

You can either:
- Paste a direct product URL from any online retailer
- Type the product name if you don't have a link

### Step 2: View Price Information

We'll show you:
- Current price range
- Which retailer it's from
- Basic price history (when available)

### Upgrade to Shopping Cloud Pro

Pro users get access to:
- **Automatic price-drop alerts** – Get notified when prices fall
- **Cheaper alternatives finder** – Find similar items at lower prices
- **Virtual closet** – Save items and build outfits around them
- **AI outfit generator** – Create complete looks using saved pieces`
  },

  'track-prices-on-amazon': {
    slug: 'track-prices-on-amazon',
    title: 'Track Prices on Amazon',
    subtitle: 'Paste an Amazon link or search by product name to monitor price changes.',

    mode: 'amazon',
    allowUrlInput: true,
    allowNameInput: true,
    urlLabel: 'Amazon Product URL',
    urlPlaceholder: 'https://www.amazon.com/...',
    nameLabel: 'Amazon product name',
    namePlaceholder: 'e.g. "Levi\'s 511 men\'s jeans"',

    showFakePriceHistory: true,
    showCurrentPriceBlock: true,
    showRetailerBadge: true,

    ctas: [
      {
        id: 'track-price-drops',
        label: 'Track Amazon Price Drops',
        description: 'Get alerts when this product gets cheaper.',
        requiresPlan: 'shopping-cloud-pro',
      },
      {
        id: 'find-cheaper-alternatives',
        label: 'Find Cheaper Amazon Alternatives',
        description: 'See similar items at a lower price.',
        requiresPlan: 'shopping-cloud-pro',
      },
      {
        id: 'generate-outfits',
        label: 'Generate 5 Outfits Using This Item',
        description: 'Combine this with other pieces for full looks.',
        requiresPlan: 'shopping-cloud-pro',
      },
    ],

    cloudTag: 'shopping',
    faqs: [
      ...BASE_FAQS,
      {
        q: 'Why track Amazon prices specifically?',
        a: 'Amazon prices change frequently – sometimes multiple times per day. Tracking helps you buy at the lowest price point.'
      },
      {
        q: 'Can I track Prime Day and Black Friday deals?',
        a: 'Yes! Price tracking is especially useful during sales events. Pro users get real-time alerts for Lightning Deals and limited-time offers.'
      }
    ],
    contentGuide: `## Amazon Price Tracker – Monitor Prices and Save

Amazon prices fluctuate constantly. This free tool helps you check current prices, and with Pro you can track them automatically.

### How Amazon Pricing Works

Amazon uses dynamic pricing that changes based on:
- Demand and availability
- Competitor pricing
- Time of day and season
- Your browsing history (sometimes)

### Getting the Best Amazon Deals

1. **Check current prices** – Use this tool to see today's price
2. **View price history** – See if now is a good time to buy
3. **Set alerts (Pro)** – Get notified when prices drop

### Amazon Price Tracker Pro Features

- **Real-time alerts** – Know the moment prices drop
- **Lightning Deal notifications** – Don't miss time-limited offers
- **Alternative finder** – Find the same product cheaper elsewhere
- **AI outfit ideas** – For fashion items, see how to style them`
  }
};

export function getPricePresetBySlug(slug: string): PriceEngineConfig | null {
  return PRICE_ENGINE_PRESETS[slug] || null;
}
