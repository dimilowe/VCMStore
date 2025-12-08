export type ProductData = {
  stripe_product_id?: string;
  primary_price_id: string;
  mode?: 'payment' | 'subscription';
  offer_key?: string;
  additional_prices?: {
    id: string;
    label: string;
    badge?: string;
    mode?: 'payment' | 'subscription';
    offer_key?: string;
  }[];

  hero_badge?: string;
  hero_title: string;
  hero_subtitle: string;

  bullets: string[];
  feature_sections?: {
    title: string;
    items: string[];
  }[];

  cta_primary_label: string;
  cta_primary_href?: string;
  checkout_strategy?: 'stripe' | 'external';
  external_url?: string;
  cta_secondary_label?: string;
  cta_secondary_href?: string;

  faq?: { question: string; answer: string }[];
  pro_tips?: string[];
  recommended_slugs?: string[];

  is_featured?: boolean;
  is_hidden_from_store?: boolean;
};

export type CMSObjectData = {
  title: string;
  description: string;
  seo_title?: string;
  seo_description?: string;
  thumbnail_url?: string;
  
  body?: ContentBlock[];
  faq?: { question: string; answer: string }[];
  pro_tips?: string[];
  
  product_data?: ProductData;
  
  interlink_parent?: string;
  interlink_siblings?: string[];
  interlink_tools?: string[];
  
  is_indexed?: boolean;
};

export type ContentBlock = {
  type: 'paragraph' | 'heading' | 'list' | 'image' | 'callout' | 'video';
  content?: string;
  level?: number;
  items?: string[];
  src?: string;
  alt?: string;
  variant?: 'info' | 'warning' | 'tip';
};

export type CMSObject = {
  id: string;
  slug: string;
  type: 'product' | 'tool' | 'article' | 'mbb' | 'cluster';
  cluster_slug?: string;
  data: CMSObjectData;
  word_count: number;
  health: 'thin' | 'ok' | 'strong';
  created_at: string;
  updated_at: string;
};
