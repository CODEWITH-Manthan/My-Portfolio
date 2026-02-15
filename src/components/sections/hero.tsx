import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="container px-4 md:px-6 text-center">
        <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm mb-4">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          SYSTEM STATUS: ONLINE
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase font-headline">
          Manthan Ilake<br/><span className="text-outline">Web Developer</span>
          <span className="inline-block animate-blink text-primary">_</span>
        </h1>
        <div className="mt-6">
          <p className="inline-block bg-accent text-accent-foreground p-2 md:p-4 text-lg md:text-xl font-medium">
            I build digital products that refuse to be boring.
          </p>
        </div>
        <p className="mt-6 text-muted-foreground text-lg tracking-widest">
          React • MySQL • Git • Webpack
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="font-bold border-2 border-primary-foreground text-base w-full sm:w-auto">
            <Link href="#projects">[ VIEW PROJECTS ]</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold border-2 text-base w-full sm:w-auto">
            <a href="/cv_placeholder.pdf" download>[ DOWNLOAD CV ]</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
