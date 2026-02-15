'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#about', label: '/ABOUT' },
  { href: '#skills', label: '/SKILLS' },
  { href: '#projects', label: '/PROJECTS' },
  { href: '#contact', label: '/CONTACT' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-bold text-lg md:text-xl font-headline tracking-widest">
          MANTHAN.I
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent-foreground font-bold"
          >
            <Link href="#contact">[ HIRE ME ]</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu can be added here */}
        </div>
      </div>
    </header>
  );
}
