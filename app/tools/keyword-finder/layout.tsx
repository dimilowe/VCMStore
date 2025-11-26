import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Low-Competition Keyword Finder | VCM Store SEO Tools',
  description: 'Discover low-competition SEO keywords you can actually rank for. Free AI-powered keyword tool that finds long-tail opportunities with estimated difficulty and volume.',
  openGraph: {
    title: 'Free Low-Competition Keyword Finder',
    description: 'Find SEO keywords you can actually rank for. AI-powered tool for long-tail, low-difficulty keyword ideas.',
    type: 'website',
  },
};

export default function KeywordFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
