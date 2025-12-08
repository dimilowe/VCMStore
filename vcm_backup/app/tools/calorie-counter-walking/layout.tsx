import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calorie Counter Walking – Walking Calorie Calculator | VCM Suite',
  description: 'Calculate how many calories you burn walking with our free calorie counter walking tool. Enter your duration, weight, and pace to get instant estimates based on MET formulas.',
  keywords: ['calorie counter walking', 'walking calorie calculator', 'calories burned walking', 'walking calories', 'MET walking calculator'],
  openGraph: {
    title: 'Calorie Counter Walking – Walking Calorie Calculator',
    description: 'Calculate how many calories you burn walking with our free calorie counter walking tool. Get instant estimates based on MET formulas.',
    type: 'website',
    url: 'https://vcmsuite.com/tools/calorie-counter-walking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Counter Walking – Walking Calorie Calculator',
    description: 'Calculate how many calories you burn walking with our free calorie counter walking tool.',
  },
  alternates: {
    canonical: 'https://vcmsuite.com/tools/calorie-counter-walking',
  },
};

export default function CalorieCounterWalkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
