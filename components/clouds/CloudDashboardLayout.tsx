'use client';

import { ReactNode } from 'react';

interface CloudDashboardLayoutProps {
  hero: ReactNode;
  primaryCards?: ReactNode;
  tabs?: ReactNode;
  featured: ReactNode;
  appRow?: ReactNode;
  shortcuts?: ReactNode;
  sidebar?: ReactNode;
}

export default function CloudDashboardLayout({
  hero,
  primaryCards,
  tabs,
  featured,
  appRow,
  shortcuts,
  sidebar,
}: CloudDashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="flex-1 min-w-0 flex flex-col gap-8">
            {hero}
            {primaryCards}
            {appRow}
            {tabs}
            {featured}
            {shortcuts}
          </section>
          {sidebar && (
            <aside className="w-full lg:w-72 flex-shrink-0 lg:border-l lg:border-zinc-200 lg:pl-8">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
