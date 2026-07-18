'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Briefcase, Download, ArrowDown } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';

const ROLES = ['MERN Developer', 'React Enthusiast', 'Problem Solver', 'Open Source Learner'];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${30 + Math.random() * 70}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 10}s`,
  size: `${1 + Math.random() * 2.5}px`,
  opacity: 0.2 + Math.random() * 0.5,
  color:
    i % 4 === 0 ? '#8B5CF6'
    : i % 4 === 1 ? '#e879f9'
    : i % 4 === 2 ? '#14b8a6'
    : '#4F8CFF',
}));

// ─── Typing role animator ────────────────────────────────────────────────────
function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 58);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="text-electric" style={{ fontFamily: "'DM Mono', monospace" }}>
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse spotlight
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
      {/* ── Gradient mesh background ─────────────────────────────────── */}
      <div className="animated-grid" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />
      {/* Extra orbs rendered as divs (CSS ::before/::after handles two; these add two more) */}
      <div className="aurora-orb3" aria-hidden="true" />
      <div className="aurora-orb4" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {/* ── Ambient rim light (bottom) ───────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.3), rgba(139,92,246,0.3), transparent)' }}
        aria-hidden="true"
      />

      {/* ── Particles ────────────────────────────────────────────────── */}
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
            background: p.color,
          }}
        />
      ))}

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Mobile-only compact profile card — shows ABOVE text on small screens */}
          <div className="flex lg:hidden justify-center hero-entrance" style={{ animationDelay: '0ms' }}>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/profile-photo.png"
                  alt="Manthan Ilake"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3
                  className="text-white text-base mb-0.5"
                  style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.03em' }}
                >
                  Manthan Ilake
                </h3>
                <p className="text-white/40 text-xs mb-2">Full Stack Developer</p>
                <div className="flex flex-wrap gap-1">
                  {['React', 'Node.js', 'MongoDB', 'Next.js'].map(s => (
                    <span
                      key={s}
                      className="skill-chip"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', padding: '0.15rem 0.5rem' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Left — Content with staggered entrance */}
          <div>
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-xs text-white/50 tracking-widest mb-6 md:mb-8 hero-entrance"
              style={{ animationDelay: '0ms', fontFamily: "'DM Mono', monospace" }}
            >
              <span className="online-dot" />
              AVAILABLE FOR INTERNSHIP
            </div>

            {/* Greeting */}
            <p
              className="text-white/40 text-sm tracking-[0.2em] uppercase mb-2 md:mb-3 hero-entrance"
              style={{ animationDelay: '100ms', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem' }}
            >
              Hello, I&apos;m
            </p>

            {/* Name — Syne display */}
            <h1
              className="hero-entrance"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.05em',
                marginBottom: '1.1rem',
                animationDelay: '180ms',
              }}
            >
              <span className="gradient-text">Manthan</span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.88)' }}>Ilake</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-white/35 text-sm tracking-widest mb-3 hero-entrance"
              style={{ animationDelay: '280ms', fontFamily: "'DM Mono', monospace", fontSize: '0.68rem' }}
            >
              Electronics &amp; Computer Science Student
            </p>

            {/* Typing role */}
            <div
              className="text-lg md:text-xl font-medium text-white/70 mb-5 h-8 hero-entrance"
              style={{ animationDelay: '360ms' }}
            >
              <TypingText />
            </div>

            {/* Bio */}
            <p
              className="text-white/35 text-sm leading-relaxed max-w-sm mb-8 md:mb-10 hero-entrance"
              style={{ animationDelay: '440ms' }}
            >
              Building scalable digital products with modern web technologies.
              Passionate about clean code, great UX, and open source.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-2 sm:gap-3 hero-entrance"
              style={{ animationDelay: '520ms' }}
            >
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #4F8CFF, #8B5CF6)',
                    boxShadow: '0 0 0 1px rgba(79,140,255,0.3)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(79,140,255,0.45), 0 0 0 1px rgba(79,140,255,0.5)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(79,140,255,0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <Briefcase size={14} />
                  View Projects
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://image2url.com/r2/default/images/1771150370252-5450d2ff-ca50-4e3d-8cd5-d0120a68684b.png"
                  download
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg border border-white/10 text-white/70 font-medium text-sm transition-all"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    (e.currentTarget as HTMLElement).style.background = '';
                  }}
                >
                  <Download size={14} />
                  Resume
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg border border-white/10 text-white/70 font-medium text-sm transition-all"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    (e.currentTarget as HTMLElement).style.background = '';
                  }}
                >
                  Contact Me
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right — Developer Card (desktop only — mobile version is above) */}
          <div className="hidden lg:flex justify-center hero-entrance" style={{ animationDelay: '300ms' }}>
            <div className="dev-card animate-float w-72">
              <div className="dev-card-inner">
                {/* Avatar */}
                <div className="relative w-56 h-56 mx-auto mb-5 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/profile-photo.png"
                    alt="Manthan Ilake"
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3
                    className="text-white text-lg mb-0.5"
                    style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.03em' }}
                  >
                    Manthan Ilake
                  </h3>
                  <p className="text-white/40 text-sm">Full Stack Developer</p>

                  {/* Skills mini-pills */}
                  <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                    {['React', 'Node.js', 'MongoDB', 'Next.js'].map(s => (
                      <span
                        key={s}
                        className="skill-chip"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-entrance"
        style={{ animationDelay: '700ms' }}
      >
        <div className="scroll-indicator flex flex-col items-center gap-1">
          <ArrowDown size={14} className="text-white/25" strokeWidth={1.5} />
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
          <span
            className="text-white/20 text-xs tracking-widest"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem' }}
          >
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
