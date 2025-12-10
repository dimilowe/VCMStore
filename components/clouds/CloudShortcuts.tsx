'use client';

import Link from 'next/link';

export interface ShortcutItem {
  title: string;
  description: string;
  icon_tool_slug: string;
  target_tool_slug: string;
  preset_key?: string;
}

interface CloudShortcutsProps {
  shortcuts: ShortcutItem[];
  title?: string;
}

export default function CloudShortcuts({ shortcuts, title = 'Quick shortcuts' }: CloudShortcutsProps) {
  if (shortcuts.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-4">
        {title}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {shortcuts.map((shortcut, idx) => (
          <Link
            key={idx}
            href={`/tools/${shortcut.target_tool_slug}${
              shortcut.preset_key
                ? `?preset=${encodeURIComponent(shortcut.preset_key)}`
                : ""
            }`}
            className="rounded-xl border border-zinc-200 p-4 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all group"
          >
            <div className="text-sm font-medium text-zinc-900 mb-1 group-hover:text-pink-600 transition-colors">
              {shortcut.title}
            </div>
            <div className="text-xs text-zinc-500">
              {shortcut.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
