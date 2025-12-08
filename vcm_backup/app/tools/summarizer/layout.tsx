import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Summarizer Generator | AI Text Summarizer & Key Points Extractor',
  description: 'Use this free AI summarizer generator to instantly summarize any text and extract key takeaways. Paste your article, essay, or notes and get a clean summary in seconds.',
  keywords: ['summarizer', 'summarizer generator', 'AI summarizer', 'text summarizer', 'summary generator', 'summarize text', 'key points extractor', 'article summarizer'],
  openGraph: {
    title: 'Free Summarizer Generator | AI Text Summarizer & Key Points Extractor',
    description: 'Use this free AI summarizer generator to instantly summarize any text and extract key takeaways. Paste your article, essay, or notes and get a clean summary in seconds.',
    type: 'website',
  },
};

export default function SummarizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
