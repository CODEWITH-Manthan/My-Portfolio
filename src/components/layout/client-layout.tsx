'use client';
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import FloatingDock from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CustomCursor from '@/components/ui/custom-cursor';
import ScrollProgress from '@/components/ui/scroll-progress';
import CommandPalette from '@/components/ui/command-palette';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  // Activates after loader — gives DOM time to settle
  useScrollReveal(loading ? 0 : 0.12);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn('antialiased', loading ? 'overflow-hidden h-screen' : 'overflow-auto')}>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loader */}
      <div className={cn('fixed inset-0 z-[9999] transition-opacity duration-700 bg-[#050505]', loading ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
        <Loader />
      </div>

      <div className={cn('transition-opacity duration-500', loading ? 'opacity-0' : 'opacity-100')}>
        <ScrollProgress />
        <CustomCursor />
        <div className="scanline-effect" aria-hidden="true" />
        <FloatingDock />
        <main>{children}</main>
        <Footer />
        <CommandPalette />
        <Toaster />
      </div>
    </div>
  );
}
