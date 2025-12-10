'use client';

import { ReactNode } from 'react';

interface CloudDashboardLayoutProps {
  hero: ReactNode;
  primaryCards?: ReactNode;
  tabs?: ReactNode;
  featured: ReactNode;
  sidebar?: ReactNode;
}

export default function CloudDashboardLayout({
  hero,
  primaryCards,
  tabs,
  featured,
  sidebar,
}: CloudDashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <section className="flex-1 min-w-0 flex flex-col gap-8">
            {hero}
            {primaryCards}
            {tabs}
            {featured}
          </section>
          {sidebar && (
            <aside className="w-72 flex-shrink-0 hidden lg:block">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
