import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Humanizer Free | Make Your AI Writing Sound Human",
  description: "AI humanizer free tool – paste your blog or article and instantly see how likely it is AI-written, then rewrite it to sound more human and natural.",
  keywords: "ai humanizer free, AI writing detector, humanize AI text, AI content detector, make AI writing sound human, AI text rewriter",
  openGraph: {
    title: "AI Humanizer Free – Humanize Your AI Writing",
    description: "AI humanizer free tool – paste your blog or article and instantly see how likely it is AI-written, then rewrite it to sound more human and natural.",
    type: "website",
    url: "https://vcmsuite.com/tools/ai-humanizer-free",
  },
  alternates: {
    canonical: "https://vcmsuite.com/tools/ai-humanizer-free",
  },
};

export default function AIHumanizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
