'use client';

import Link from 'next/link';
import { Clock, FileText, Image, Video, File, Plus, Grid, List } from 'lucide-react';
import { useState } from 'react';

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  thumbnailUrl?: string;
  href: string;
  timestamp?: string;
  appLabel?: string;
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

const FILE_TYPE_COLORS: Record<string, string> = {
  pdf: 'from-red-400 to-red-500',
  image: 'from-blue-400 to-blue-500',
  video: 'from-purple-400 to-purple-500',
  default: 'from-zinc-400 to-zinc-500',
};

export default function CloudRecentFilesRail({ 
  files, 
  title = 'Recent files' 
}: CloudRecentFilesRailProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm h-fit sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-zinc-900">
          {title}
        </h2>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors ml-1">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-500">
            Your recent files will appear here once you start using the tools.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
          {files.map((file) => {
            const IconComponent = FILE_TYPE_ICONS[file.type] || FILE_TYPE_ICONS.default;
            const colorGradient = FILE_TYPE_COLORS[file.type] || FILE_TYPE_COLORS.default;
            
            return (
              <Link
                key={file.id}
                href={file.href}
                className="group rounded-xl overflow-hidden border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all"
              >
                <div className="aspect-square relative">
                  {file.thumbnailUrl ? (
                    <img 
                      src={file.thumbnailUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${colorGradient} flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white/80" />
                    </div>
                  )}
                  
                  {file.appLabel && (
                    <span className="absolute bottom-2 right-2 inline-flex items-center rounded bg-white/90 backdrop-blur-sm text-zinc-800 text-[9px] font-semibold px-1.5 py-0.5 uppercase shadow-sm">
                      {file.appLabel}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-zinc-900 truncate group-hover:text-pink-600 transition-colors">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase">
                    {file.type}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          {files.map((file) => {
            const IconComponent = FILE_TYPE_ICONS[file.type] || FILE_TYPE_ICONS.default;
            const colorGradient = FILE_TYPE_COLORS[file.type] || FILE_TYPE_COLORS.default;
            
            return (
              <Link
                key={file.id}
                href={file.href}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all group"
              >
                {file.thumbnailUrl ? (
                  <img 
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorGradient} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate group-hover:text-pink-600 transition-colors">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="uppercase">{file.type}</span>
                    {file.timestamp && (
                      <>
                        <span className="text-zinc-300">·</span>
                        <span>{file.timestamp}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
