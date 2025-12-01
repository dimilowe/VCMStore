import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GIF Maker – Video to GIF & Image to GIF Converter | VCM Suite',
  description: 'Free online GIF maker. Convert video to GIF or images to GIF directly in your browser. No watermark, no signup. Powered by VCM Suite creator tools.',
  keywords: ['gif maker', 'gif maker free', 'video to gif', 'image to gif', 'gif converter', 'free gif tool', 'online gif maker', 'create gif'],
  openGraph: {
    title: 'Free GIF Maker – Video to GIF & Image to GIF Converter | VCM Suite',
    description: 'Free online GIF maker. Convert video to GIF or images to GIF directly in your browser. No watermark, no signup.',
    type: 'website',
  },
};

export default function GifMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
