import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emoji Combos Generator – Free Aesthetic Emoji Combinations',
  description: 'Generate and copy free emoji combos for TikTok, Instagram, YouTube, and more. Browse aesthetic, cute, funny, and meme emoji combinations for captions and bios.',
  keywords: 'emoji combos, emoji combinations, aesthetic emojis, cute emoji combos, emoji for captions, emoji for bios, instagram emojis, tiktok emojis',
  openGraph: {
    title: 'Emoji Combos Generator – Free Aesthetic Emoji Combinations',
    description: 'Copy-paste emoji combos for your captions, bios, and posts. Browse cute, aesthetic, funny, and meme combinations.',
    type: 'website',
  },
};

export default function EmojiCombosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
