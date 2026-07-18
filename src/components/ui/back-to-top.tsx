'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import MagneticButton from './magnetic-button';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 mix-blend-difference"
        >
          <MagneticButton>
            <button
              onClick={scrollToTop}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                'bg-foreground/10 text-foreground backdrop-blur-md',
                'border border-foreground/20 hover:bg-foreground/20 transition-colors'
              )}
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
