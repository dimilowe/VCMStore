import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maker Quotes Generator – Free Inspiring Quotes for Creators",
  description: "Generate inspiring maker quotes for creators, builders, and entrepreneurs. Perfect for social posts, thumbnails, captions, and content. Free quote generator with themes and tones.",
};

export default function MakerQuotesGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
