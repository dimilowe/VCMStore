import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affirmation About Self Love — Free Daily Self-Love Affirmation Generator',
  description: 'Get your daily affirmation about self love. A new personalized self-love affirmation every day based on your focus area and tone. Free daily tool for building self-worth.',
  keywords: 'affirmation about self love, daily affirmation, self love affirmations, self love quotes, affirmations for self love, self esteem affirmations, daily self love',
  openGraph: {
    title: 'Affirmation About Self Love — Free Daily Generator',
    description: 'Get your daily affirmation about self love. A new personalized affirmation every day based on your focus area and tone.',
    type: 'website',
  },
};

export default function AffirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
