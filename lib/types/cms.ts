import type { CloudSlug } from '@/lib/clouds';

export type ProductData = {
  stripe_product_id?: string;
  primary_price_id: string | null;
  mode?: 'payment' | 'subscription' | null;
  offer_key?: string;
  
  checkout_strategy: 'stripe' | 'external';
  external_url?: string;
  
  success_path?: string | null;
  cancel_path?: string | null;
  
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

export type CloudDashboardEngineConfig = {
  hero: {
    title: string;
    subtitle?: string;
    primaryToolSlug: string;
    mode: "image" | "video" | "text";
    showModeSwitcher: boolean;
  };
  featuredProducts: {
    title: string;
    description: string;
    product_slug?: string;
    tool_slug?: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    badge?: "Pro" | "New" | "Beta";
  }[];
  appRow: {
    tool_slug: string;
  }[];
  shortcuts: {
    title: string;
    description: string;
    icon_tool_slug: string;
    target_tool_slug: string;
    preset_key?: string;
  }[];
  showRecentFiles: boolean;
};

export type CMSObject = {
  id: string;
  slug: string;
  type: 'product' | 'tool' | 'article' | 'mbb' | 'cluster' | 'cloud_dashboard';
  cluster_slug?: string;
  cloud_tags?: CloudSlug[];
  engine?: string;
  engine_config?: CloudDashboardEngineConfig;
  data: CMSObjectData;
  word_count: number;
  health: 'thin' | 'ok' | 'strong';
  created_at: string;
  updated_at: string;
};
