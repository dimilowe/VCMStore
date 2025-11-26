import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Logo Generator Online - Instant & No Watermark',
  description: 'Create a professional logo online for free. No signup. No watermark. Instant downloads. AI-powered logo generator for your business.',
  openGraph: {
    title: 'Free Online Logo Generator (No Signup)',
    description: 'Create professional logos instantly with AI. No signup, no watermark, free downloads.',
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
