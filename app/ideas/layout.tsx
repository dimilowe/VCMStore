import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VCM Ideas Hub — Unbuilt Opportunities & Startup Ideas',
  description: 'Browse and share startup ideas that should exist. A community-driven feed of unbuilt opportunities, side project ideas, and business concepts waiting to be built.',
  keywords: 'startup ideas, business ideas, side project ideas, app ideas, saas ideas, unbuilt opportunities',
  openGraph: {
    title: 'VCM Ideas Hub — Unbuilt Opportunities',
    description: 'Browse and share startup ideas that should exist. A community-driven feed of unbuilt opportunities.',
    type: 'website',
  },
};

export default function IdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
