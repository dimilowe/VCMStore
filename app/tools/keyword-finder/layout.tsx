import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Keyword Tool for SEO | Find Low-Competition Keywords',
  description: 'Free keyword tool for SEO that finds low-competition keywords you can actually rank for. Get long-tail keyword ideas with difficulty scores, search volume, and content suggestions.',
  keywords: 'free keyword tool, free keyword tool for seo, keyword research tool, low competition keywords, seo keyword finder, long tail keywords',
  openGraph: {
    title: 'Free Keyword Tool for SEO - Find Keywords You Can Rank For',
    description: 'Free AI-powered keyword tool for SEO. Discover low-competition, long-tail keywords with difficulty estimates and content ideas.',
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
