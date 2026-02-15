'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={cn(
        'custom-cursor',
        { 'pointer': isPointer }
      )}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    ></div>
  );
}
