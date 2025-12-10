'use client';

import Link from 'next/link';

export interface AppRowItem {
  tool_slug: string;
}

interface CloudAppRowProps {
  apps: AppRowItem[];
  title?: string;
}

export default function CloudAppRow({ apps, title = 'Apps in this cloud' }: CloudAppRowProps) {
  if (apps.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {apps.map((app) => (
          <Link
            key={app.tool_slug}
            href={`/tools/${app.tool_slug}`}
            className="inline-flex items-center rounded-full px-4 py-2 text-sm border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-colors text-zinc-700"
          >
            {app.tool_slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
        ))}
      </div>
    </div>
  );
}
