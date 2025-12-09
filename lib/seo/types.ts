export interface SeoSnapshot {
  id: string;
  slug: string;
  url: string;
  status_code: number;
  load_time_ms: number | null;
  has_title: boolean;
  has_h1: boolean;
  has_meta_description: boolean;
  word_count: number;
  robots_index: 'index' | 'noindex' | 'missing';
  canonical_target: string | null;
  internal_links_out_count: number;
  internal_links_in_count: number;
  is_thin_content: boolean;
  has_expected_schema: boolean;
  page_type: 'tool' | 'article' | 'cluster' | 'blog' | 'static' | 'other';
  snapshot_date: Date;
  overall_score: number;
  title_text: string | null;
  meta_description_text: string | null;
  h1_text: string | null;
  issues: string[];
}

export interface ScanResult {
  slug: string;
  url: string;
  status_code: number;
  load_time_ms: number;
  has_title: boolean;
  has_h1: boolean;
  has_meta_description: boolean;
  word_count: number;
  robots_index: 'index' | 'noindex' | 'missing';
  canonical_target: string | null;
  internal_links_out_count: number;
  internal_link_targets: string[];
  is_thin_content: boolean;
  has_expected_schema: boolean;
  page_type: string;
  overall_score: number;
  title_text: string | null;
  meta_description_text: string | null;
  h1_text: string | null;
  issues: string[];
}

export interface GlobalUrl {
  id: string;
  url: string;
  title: string | null;
  type: string;
  is_indexed: boolean;
  canonical: string | null;
}

export interface ScanSummary {
  total_scanned: number;
  successful: number;
  failed: number;
  errors: string[];
}
