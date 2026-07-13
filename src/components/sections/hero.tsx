'use client';
import { useEffect, useRef, useState, useCallback } from 'react';


import Image from 'next/image';
import { Briefcase, Download, MapPin, ExternalLink } from 'lucide-react';

const ROLES = ['MERN Developer', 'React Enthusiast', 'Problem Solver', 'Open Source Learner'];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${40 + Math.random() * 60}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${5 + Math.random() * 8}s`,
  size: `${1 + Math.random() * 2}px`,
  opacity: 0.3 + Math.random() * 0.5,
}));

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="text-electric">
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--spotlight-x', `${x}%`);
    sectionRef.current.style.setProperty('--spotlight-y', `${y}%`);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Backgrounds */}
      <div className="animated-grid" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* Particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="particle"
          aria-hidden="true"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            background: p.id % 3 === 0 ? '#8B5CF6' : '#4F8CFF',
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Content */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-xs text-white/50 tracking-widest mb-8">
              <span className="online-dot" />
              AVAILABLE FOR INTERNSHIP
            </div>

            <p className="text-white/40 text-sm tracking-widest mb-3">Hello, I&apos;m</p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-4">
              <span className="gradient-text">Manthan</span>
              <br />
              <span className="text-white/90">Ilake</span>
            </h1>

            <p className="text-white/40 text-sm tracking-widest mb-2">
              Electronics &amp; Computer Science Student
            </p>

            <div className="text-xl md:text-2xl font-medium text-white/70 mb-4 h-8">
              <TypingText />
            </div>

            <p className="text-white/35 text-sm leading-relaxed max-w-md mb-10">
              Building scalable digital products with modern web technologies.
              Passionate about clean code, great UX, and open source.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-electric text-white font-medium text-sm transition-all hover:bg-electric/90 hover:shadow-[0_0_20px_rgba(79,140,255,0.3)]"
                style={{ background: '#4F8CFF' }}
              >
                <Briefcase size={14} /> View Projects
              </a>
              <a
                href="https://image2url.com/r2/default/images/1771150370252-5450d2ff-ca50-4e3d-8cd5-d0120a68684b.png"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/70 font-medium text-sm transition-all hover:border-white/20 hover:text-white hover:bg-white/4"
              >
                <Download size={14} /> Download Resume
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/70 font-medium text-sm transition-all hover:border-white/20 hover:text-white hover:bg-white/4"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right — Developer Card */}
          <div className="hidden lg:flex justify-center">
            <div className="dev-card animate-float w-72">
              <div className="dev-card-inner">
                {/* Avatar */}
                <div className="relative w-56 h-56 mx-auto mb-4 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/profile-photo.png"
                    alt="Manthan Ilake"
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-white text-lg">Manthan Ilake</h3>
                  <p className="text-white/40 text-sm mt-1">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="scroll-indicator flex flex-col items-center gap-1">
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          <span className="text-white/20 text-xs tracking-widest">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
