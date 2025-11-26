import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GIF Compressor – Free Online GIF Size Reducer (Fast & No Watermark)',
  description: 'Compress GIF files online for free. Fast GIF compressor that reduces file size without watermark or sign-up. Perfect for memes, social media, and websites.',
  keywords: 'gif compressor, compress gif, reduce gif size, gif optimizer, free gif compressor, online gif compressor, gif size reducer',
  openGraph: {
    title: 'Free GIF Compressor – Reduce GIF Size Online',
    description: 'Compress GIF files online for free. Fast, no watermarks, no sign-up required.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GIF Compressor – Reduce GIF Size Online',
    description: 'Compress GIF files online for free. Fast, no watermarks, no sign-up required.',
  },
};

export default function GifCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
