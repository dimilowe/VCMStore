import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steps vs Calories: How Walking Translates Into Calorie Burn | VCM Suite',
  description: 'Learn the science behind converting your step count into calories burned. Understand the relationship between steps, distance, and energy expenditure for effective weight management.',
  keywords: ['steps vs calories', 'steps to calories', 'walking calorie burn', 'step count calories', 'calories per step'],
  openGraph: {
    title: 'Steps vs Calories: How Walking Translates Into Calorie Burn',
    description: 'Learn the science behind converting your step count into calories burned.',
    type: 'article',
    url: 'https://vcmsuite.com/articles/steps-vs-calories-walking',
  },
  alternates: {
    canonical: 'https://vcmsuite.com/articles/steps-vs-calories-walking',
  },
};

export default function StepsVsCaloriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
