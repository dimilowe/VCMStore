'use client';

import Link from 'next/link';
import { Clock, FileText, Image, Video, File } from 'lucide-react';

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  thumbnailUrl?: string;
  href: string;
}

interface CloudRecentFilesRailProps {
  files: RecentFile[];
  title?: string;
}

const FILE_TYPE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  image: Image,
  video: Video,
  default: File,
};

export default function CloudRecentFilesRail({ 
  files, 
  title = 'Recent files' 
}: CloudRecentFilesRailProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm h-fit sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-400" />
          {title}
        </h2>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors">
            <span className="sr-only">Add</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 p-6 text-center">
          <p className="text-sm text-zinc-500">
            Your recent files will appear here once you start using the tools.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
          {files.map((file) => {
            const IconComponent = FILE_TYPE_ICONS[file.type] || FILE_TYPE_ICONS.default;
            
            return (
              <Link
                key={file.id}
                href={file.href}
                className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all group"
              >
                {file.thumbnailUrl ? (
                  <img 
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-zinc-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate group-hover:text-pink-600 transition-colors">
                    {file.name}
                  </p>
                  <p className="text-xs text-zinc-500 uppercase">
                    {file.type}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
