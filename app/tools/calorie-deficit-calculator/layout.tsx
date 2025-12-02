import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Calorie Deficit Calculator - Free Food Photo Analyzer | VCM Suite",
  description: "Free AI calorie deficit calculator. Upload a photo of your meal and a screenshot of your Health app to instantly see your daily calorie surplus or deficit. Track your calories with AI-powered food recognition.",
  keywords: "calorie counter deficit, calorie deficit calculator, AI calorie counter, food calorie calculator, calorie tracker, photo calorie counter, health app calories, deficit calculator free",
  openGraph: {
    title: "AI Calorie Deficit Calculator - Free Photo Calorie Counter",
    description: "Snap your food + Health app screenshot to see today's calorie surplus or deficit in seconds. Free AI-powered calorie counter.",
    type: "website",
    url: "/tools/calorie-deficit-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Calorie Deficit Calculator",
    description: "Free AI calorie deficit calculator. Upload food photos to track your calories.",
  },
  alternates: {
    canonical: "/tools/calorie-deficit-calculator",
  },
};

export default function CalorieDeficitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
