import type { Metadata } from 'next';
import { getRobotsDirective } from '@/lib/toolRollout';

const SLUG = 'ad-copy-analyzer';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Ad Copy Analyzer | Analyze & Improve Your Ad Copy',
    description: 'Analyze your ad copy with AI. Get scores, insights, and improved versions of your ad copy for Meta, TikTok, YouTube, Google, and LinkedIn. Free ad copy analysis tool.',
    keywords: ['ad copy', 'ad copy analyzer', 'ad copy analysis', 'facebook ad copy', 'instagram ad copy', 'ad copywriting', 'ad copy examples', 'improve ad copy'],
    openGraph: {
      title: 'Free Ad Copy Analyzer | Analyze & Improve Your Ad Copy',
      description: 'Analyze your ad copy with AI. Get scores, insights, and improved versions of your ad copy for all major platforms.',
      type: 'website',
    },
    robots: getRobotsDirective(SLUG),
  };
}

export default function AdCopyAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
