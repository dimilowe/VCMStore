import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Title Split-Test Tool – A/B Test Your Video Titles Free",
  description: "Auto-rotate your YouTube video titles, track impressions and views per variant, and find the winning title by CTR. Free tool for YouTube creators to optimize their video performance.",
};

export default function YouTubeTitleSplitTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
