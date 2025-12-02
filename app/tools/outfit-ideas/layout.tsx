import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Outfit Ideas Generator – AI-Powered Style Finder | VCM Suite",
  description: "Upload any outfit photo and get outfit ideas with similar products to shop. AI-powered outfit finder helps you recreate any look. Free, no signup required.",
  keywords: ["outfit ideas", "outfit finder", "outfit inspiration", "shop the look", "style finder", "outfit generator", "similar clothes", "fashion finder", "recreate outfits", "outfit shopping"],
  openGraph: {
    title: "Free Outfit Ideas Generator – AI-Powered Style Finder | VCM Suite",
    description: "Upload any outfit photo and get outfit ideas with similar products to shop. AI analyzes your photo and finds matching items online.",
    type: "website",
    siteName: "VCM Suite",
    url: "https://vcmsuite.com/tools/outfit-ideas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Outfit Ideas Generator – AI-Powered Style Finder",
    description: "Upload outfit photos, get shopping links for similar items. Free AI-powered style finder.",
  },
  alternates: {
    canonical: "https://vcmsuite.com/tools/outfit-ideas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OutfitIdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
