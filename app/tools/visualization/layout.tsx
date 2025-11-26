import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Visualization Tool – Text to Diagram | VCM Store',
  description: 'Turn simple text into diagrams for funnels, workflows, and content systems. Free online visualization tool that runs in your browser. No signup required.',
  keywords: 'free visualization tool, text to diagram, flowchart maker, funnel diagram, workflow diagram, free diagram tool',
  openGraph: {
    title: 'Free Visualization Tool – Text to Diagram',
    description: 'Turn simple text into clean diagrams for funnels, workflows, and content systems. 100% free, runs in your browser.',
    type: 'website',
  },
};

export default function VisualizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
