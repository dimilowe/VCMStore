import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affirmation About Self Love — Free Real AF Self-Love Affirmation Generator',
  description: 'Use this free Real AF self-love affirmation generator to get honest, powerful affirmations about self love. Choose your topic and tone, and let AI hype you up without the cringe.',
  keywords: 'affirmation about self love, self love affirmations, self love quotes, affirmations for self love, self esteem affirmations',
  openGraph: {
    title: 'Affirmation About Self Love — Free Real AF Generator',
    description: 'Get honest, powerful affirmations about self love. Choose your topic and tone, and let AI hype you up without the cringe.',
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
