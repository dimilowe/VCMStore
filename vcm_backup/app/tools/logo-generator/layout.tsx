import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Logo Generator - Describe & Create Instantly',
  description: 'Describe your vision and get 4 unique logo designs instantly. Free AI-powered logo generator with chat interface. No signup, no watermark.',
  openGraph: {
    title: 'Free AI Logo Generator (Chat-Based)',
    description: 'Describe your vision in natural language. Get 4 unique professional logo designs instantly. No signup required.',
    type: 'website',
  },
};

export default function LogoGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
