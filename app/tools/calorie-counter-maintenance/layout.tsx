import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Counter Maintenance – Free TDEE & Maintenance Calorie Calculator",
  description: "Calculate your maintenance calories (TDEE) with our free calorie counter maintenance tool. Uses the Mifflin-St Jeor formula to find how many calories you need to maintain your weight.",
  keywords: ["calorie counter maintenance", "maintenance calorie calculator", "TDEE calculator", "how many calories to maintain weight", "maintenance calories", "total daily energy expenditure"],
  openGraph: {
    title: "Calorie Counter Maintenance – Free TDEE Calculator",
    description: "Find your daily maintenance calories using the Mifflin-St Jeor equation. Free TDEE calculator for weight maintenance, fat loss, and muscle gain.",
    type: "website",
    url: "https://vcmsuite.com/tools/calorie-counter-maintenance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Counter Maintenance – Free TDEE Calculator",
    description: "Calculate your maintenance calories with our free TDEE calculator. Perfect for weight management and fitness goals.",
  },
  alternates: {
    canonical: "https://vcmsuite.com/tools/calorie-counter-maintenance",
  },
};

export default function CalorieCounterMaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
