import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Link in SEO: Free Internal Linking Audit Tool & Guide',
  description: 'Run a free internal link in SEO audit. Paste your domain or sitemap URL and instantly find orphan pages, weak internal links, and easy SEO wins.',
  keywords: ['internal link in seo', 'internal linking audit', 'orphan pages', 'seo audit tool', 'internal links checker', 'site structure analysis'],
  openGraph: {
    title: 'Internal Link in SEO: Free Internal Linking Audit Tool',
    description: 'Run a free internal link in SEO audit. Find orphan pages, weak internal links, and get actionable recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internal Link in SEO: Free Internal Linking Audit Tool',
    description: 'Run a free internal link in SEO audit. Find orphan pages, weak internal links, and get actionable recommendations.',
  },
};

export default function InternalLinkSeoAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
