export interface ArticleSeoConfig {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
}

export interface ArticleMonetization {
  offerKey?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface ArticleForRenderer {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body: string | null;
  seo: ArticleSeoConfig;
  interlinkParent: string | null;
  interlinkSiblings: string[];
  interlinkTools: string[];
  monetization?: ArticleMonetization;
  clusterSlug?: string | null;
  isIndexed: boolean;
}

export interface RelatedToolItem {
  slug: string;
  name: string;
  description: string;
  path: string;
}

export interface RelatedArticleItem {
  slug: string;
  title: string;
  description: string | null;
  path: string;
}
