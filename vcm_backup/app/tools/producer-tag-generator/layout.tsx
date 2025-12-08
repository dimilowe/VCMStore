import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Producer Tag Generator | Create Custom Producer Tag Voice",
  description: "Free producer tag generator - create custom producer tag voice for your beats and vocals. Make your own producer tag with AI voice or use default tags. Protect your music with professional producer tags.",
  keywords: "producer tag, producer tag generator, producer tag voice, make your own producer tag, custom producer tag, beat tag generator, producer tag download, free producer tag",
  openGraph: {
    title: "Free Producer Tag Generator – Make Your Own Producer Tag",
    description: "Create a custom producer tag voice or use a default tag to protect your beats and vocals. Free AI-powered producer tag maker.",
    type: "website",
    url: "https://vcmsuite.com/tools/producer-tag-generator",
  },
  alternates: {
    canonical: "https://vcmsuite.com/tools/producer-tag-generator",
  },
};

export default function ProducerTagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
