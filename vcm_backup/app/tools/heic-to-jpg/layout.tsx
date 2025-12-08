import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free HEIC to JPG Converter – Online & Private | VCM Suite",
  description: "Convert heic u jpg free online. Transform iPhone HEIC photos to JPG directly in your browser. No upload to servers, no watermark, no signup. Batch convert heic u jpg with adjustable quality settings. Powered by VCM Suite creator tools.",
  keywords: ["heic u jpg", "heic to jpg", "heic converter", "heic to jpeg", "convert heic", "iphone photos to jpg", "heic to jpg online", "free heic converter", "batch heic converter"],
  openGraph: {
    title: "Free HEIC to JPG Converter – Online & Private | VCM Suite",
    description: "Convert heic u jpg free. Transform iPhone HEIC photos to universally compatible JPG format. No upload, no watermark, no signup required.",
    type: "website",
    siteName: "VCM Suite",
    url: "https://vcmsuite.com/tools/heic-to-jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free HEIC to JPG Converter – Online & Private",
    description: "Convert heic u jpg free online. Transform iPhone photos to JPG in your browser. No upload, no watermark.",
  },
  alternates: {
    canonical: "https://vcmsuite.com/tools/heic-to-jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HeicToJpgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
