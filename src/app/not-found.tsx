import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2 relative">
        <h1 className="text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted/20 absolute -z-10 opacity-20 left-1/2 -translate-x-1/2 -top-10 blur-[2px]">
          404
        </h1>
        <h2 className="text-3xl font-display font-bold tracking-tight mt-10">Page not found</h2>
        <p className="text-muted-foreground font-body max-w-[400px] mx-auto pt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link href="/">
        <Button className="font-body group">
          Return Home
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Button>
      </Link>
    </div>
  );
}
