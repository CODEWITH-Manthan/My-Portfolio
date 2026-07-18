'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold tracking-tight">Something went wrong!</h2>
        <p className="text-muted-foreground font-body max-w-[500px] mx-auto">
          An unexpected error has occurred. We've been notified and are looking into it.
        </p>
      </div>
      <Button
        onClick={() => reset()}
        className="font-body group"
      >
        Try again
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </Button>
    </div>
  );
}
