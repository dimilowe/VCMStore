import { Metadata } from "next";
import PredictionCenterClient from "./PredictionCenterClient";

export const metadata: Metadata = {
  title: "Prediction Center - Free Online Predictions & Voting | VCM Suite",
  description: "Submit predictions about future events and vote YES or NO. See what the crowd thinks with our free prediction center. No signup required.",
  keywords: "prediction center, predictions, voting, crowdsourced predictions, future predictions, yes no voting, prediction market, forecast, community forecasting, tech predictions, AI predictions, crypto predictions",
  openGraph: {
    title: "Prediction Center - Free Online Predictions & Voting",
    description: "Submit predictions about future events and vote YES or NO. See what the crowd thinks.",
    type: "website",
  },
};

export default function PredictionCenterPage() {
  const webAppSchema = {
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Prediction Center?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prediction Center is a free forecasting tool where anyone can submit predictions and vote Yes/No on future events."
        }
      },
      {
        "@type": "Question",
        "name": "Is this gambling or betting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. There is no money involved, no trading, and no payouts. It is strictly for fun, curiosity, and community forecasting."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need an account to vote?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Prediction Center uses anonymous cookies so each user gets one vote per prediction."
        }
      },
      {
        "@type": "Question",
        "name": "How do predictions get resolved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When the outcome becomes publicly verifiable, the prediction is marked as Resolved: YES or Resolved: NO."
        }
      },
      {
        "@type": "Question",
        "name": "Can anyone submit a prediction?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — anyone can submit a future question as long as it is clear and objectively resolvable."
        }
      },
      {
        "@type": "Question",
        "name": "Does Prediction Center use AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not for voting — results are entirely based on community sentiment. AI may be used to improve moderation and insights."
        }
      },
      {
        "@type": "Question",
        "name": "Is Prediction Center accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Accuracy depends on how informed the community is. The more people vote, the more reliable the percentages become."
        }
      },
      {
        "@type": "Question",
        "name": "Is the tool free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Prediction Center is completely free to use."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PredictionCenterClient />
    </>
  );
}
