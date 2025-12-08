import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Calorie Counter – 100% Free Online Calorie Calculator",
  description: "Track your daily calorie intake with our free calorie counter. No signup, no app download, no cost. Instantly calculate total calories consumed with our easy food tracker.",
  keywords: ["calorie counter for free", "free calorie counter", "free calorie calculator", "online calorie counter free", "calorie tracker free", "count calories free"],
  openGraph: {
    title: "Free Calorie Counter – 100% Free Online Calorie Calculator",
    description: "Track your daily calorie intake with our free calorie counter. No signup, no app download, no cost.",
    type: "website",
  },
};

export default function FreeCalorieCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
