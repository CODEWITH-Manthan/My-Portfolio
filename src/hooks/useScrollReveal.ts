'use client';
import { useEffect } from 'react';

/**
 * useScrollReveal — attaches an IntersectionObserver to all .reveal*
 * elements, adding .revealed when they enter the viewport.
 *
 * Call once in a top-level client component (e.g. ClientLayout).
 * Supports threshold tuning and re-observing on route change.
 */
export function useScrollReveal(threshold = 0.12) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Once revealed, unobserve for performance
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}
