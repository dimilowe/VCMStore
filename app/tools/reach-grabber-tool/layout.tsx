import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reach Grabber Tool – Free AI SEO Optimizer for Blog Posts",
  description: "Use the Reach Grabber Tool to instantly optimize your blog posts for SEO. Paste your article, add your target keyword, and let AI rewrite it for better rankings.",
  keywords: "reach grabber tool, SEO optimizer, blog optimizer, content optimization, keyword optimization, AI SEO, SEO tool",
  openGraph: {
    title: "Reach Grabber Tool – Free AI SEO Optimizer",
    description: "Use the Reach Grabber Tool to instantly optimize your blog posts for SEO. Paste your article, add your target keyword, and let AI rewrite it for better rankings.",
    type: "website",
    url: "https://vcmsuite.com/tools/reach-grabber-tool",
  },
  alternates: {
    canonical: "https://vcmsuite.com/tools/reach-grabber-tool",
  },
};

export default function ReachGrabberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
