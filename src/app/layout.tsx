'use client';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CustomCursor from '@/components/ui/custom-cursor';
import { useState, useEffect } from 'react';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Duration for the loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", loading ? 'overflow-hidden' : 'overflow-auto')}>
        <div
          className={cn(
            'fixed inset-0 z-[9999] bg-background transition-opacity duration-1000',
            {
              'opacity-0 pointer-events-none': !loading,
            }
          )}
        >
          <Loader />
        </div>

        <div className={cn('transition-opacity duration-500', loading ? 'opacity-0' : 'opacity-100')}>
            <CustomCursor />
            <div className="scanline-effect"></div>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
        </div>
      </body>
    </html>
  );
}
