import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Walking for Fat Loss: How Many Calories Do You Really Burn? | VCM Suite',
  description: 'Discover how walking burns fat effectively. Learn the optimal walking strategy for sustainable fat loss with calorie burn data, tips, and a free walking calorie calculator.',
  keywords: ['walking for fat loss', 'walking weight loss', 'walking calories', 'fat burning walking', 'walking to lose weight'],
  openGraph: {
    title: 'Walking for Fat Loss: How Many Calories Do You Really Burn?',
    description: 'Discover how walking burns fat effectively. Learn the optimal walking strategy for sustainable fat loss.',
    type: 'article',
    url: 'https://vcmsuite.com/articles/walking-for-fat-loss',
  },
  alternates: {
    canonical: 'https://vcmsuite.com/articles/walking-for-fat-loss',
  },
};

export default function WalkingForFatLossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
