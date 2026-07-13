'use client';
import { useEffect, useRef, useState } from 'react';
import { Home, User, Cpu, BarChart2, Briefcase, Clock, Mail } from 'lucide-react';

const sections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'stats', label: 'Stats', icon: BarChart2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function FloatingDock() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(o => o?.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="floating-dock"
      style={{ transform: `translateX(-50%) scale(${scrolled ? 0.95 : 1})` }}
      role="navigation"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`dock-item ${active === id ? 'active' : ''}`}
          aria-label={`Navigate to ${label}`}
          title={label}
        >
          <Icon size={14} />
          <span className="hidden sm:block">{label}</span>
        </button>
      ))}
    </nav>
  );
}
