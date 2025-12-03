import { Metadata } from "next";
import PredictionCenterClient from "./PredictionCenterClient";

export const metadata: Metadata = {
  title: "Prediction Center - Free Online Predictions & Voting | VCM Suite",
  description: "Submit predictions about future events and vote YES or NO. See what the crowd thinks with our free prediction center. No signup required.",
  keywords: "prediction center, predictions, voting, crowdsourced predictions, future predictions, yes no voting, prediction market, forecast",
  openGraph: {
    title: "Prediction Center - Free Online Predictions & Voting",
    description: "Submit predictions about future events and vote YES or NO. See what the crowd thinks.",
    type: "website",
  },
};

export default function PredictionCenterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Prediction Center",
    "description": "Submit predictions about future events and vote YES or NO. See what the crowd thinks with our free prediction center.",
    "url": "https://vcmsuite.com/tools/prediction-center",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Submit predictions about future events",
      "Vote YES or NO on predictions",
      "See crowdsourced probability percentages",
      "Track prediction outcomes",
      "No signup required"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PredictionCenterClient />
    </>
  );
}
