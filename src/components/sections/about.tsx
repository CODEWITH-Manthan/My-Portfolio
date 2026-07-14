'use client';
import React, { useRef, useEffect, useState } from 'react';
import { GraduationCap, Target, Heart, Zap, Coffee, Lightbulb } from 'lucide-react';

type BentoCard = {
  title: string;
  content: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  accent?: string;
};

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function BentoItem({ card, delay }: { card: BentoCard; delay: number }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`bento-card ${card.className ?? ''}`}
      style={{
        transition: `opacity 0.6s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.6s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div style={{ color: card.accent ?? '#4F8CFF' }}>{card.icon}</div>
        <span className="text-white/30 text-xs tracking-widest uppercase">{card.title}</span>
      </div>
      <div>{card.content}</div>
    </div>
  );
}

const cards: BentoCard[] = [
  {
    title: 'Who I Am',
    icon: <Coffee size={16} />,
    accent: '#4F8CFF',
    content: (
      <div>
        <p className="text-white/60 text-sm leading-relaxed">
          Highly motivated <span className="text-electric font-medium">Full-Stack Developer</span> from Mumbai and an Electronics & Computer Science student. I love transforming ideas into fast, scalable, and user-centric web applications using React, Next.js, Node.js, TypeScript, and modern development practices. Always learning, always building, and constantly pushing myself to create better digital experiences.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Frontend', 'Backend', 'UI/UX'].map(t => (
            <span key={t} className="skill-chip" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>{t}</span>
          ))}
        </div>
      </div>
    ),
    className: 'md:col-span-2',
  },
  {
    title: 'Education',
    icon: <GraduationCap size={16} />,
    accent: '#8B5CF6',
    content: (
      <div>
        <p className="font-semibold text-white/80 text-sm">VESIT</p>
        <p className="text-white/35 text-xs mt-0.5 leading-relaxed">Vivekanand Education Society Institute of Technology</p>
        <p className="text-purple-acc text-xs mt-1.5">Electronics &amp; Computer Science Engineering</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-white/20 text-xs tracking-wider px-2 py-0.5 border border-white/6 rounded">2024</span>
          <span className="text-white/20 text-xs">→</span>
          <span className="text-white/20 text-xs tracking-wider px-2 py-0.5 border border-white/6 rounded">2028</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Career Goal',
    icon: <Target size={16} />,
    accent: '#22C55E',
    content: (
      <p className="text-white/50 text-sm leading-relaxed">
        Land an impactful internship at a <span className="text-success font-medium">top-tier tech company</span>, contribute to open source, and build products that reach millions.
      </p>
    ),
  },
  {
    title: 'Tech I Love',
    icon: <Heart size={16} />,
    accent: '#F97316',
    content: (
      <div className="flex flex-wrap gap-1.5">
        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind', 'PostgreSQL'].map(t => (
          <span key={t} className="skill-chip">{t}</span>
        ))}
      </div>
    ),
  },
  {
    title: 'Current Focus',
    icon: <Zap size={16} />,
    accent: '#4F8CFF',
    content: (
      <div className="space-y-2">
        {[
          { label: 'MERN Stack mastery', done: true },
          { label: 'System design patterns', done: false },
          { label: 'Open Source contributions', done: false },
          { label: 'Blockchain / Web3', done: false },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.done ? 'bg-success' : 'bg-white/15'}`} />
            <span className={`text-xs ${item.done ? 'text-white/60 line-through' : 'text-white/40'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Fun Fact',
    icon: <Lightbulb size={16} />,
    accent: '#8B5CF6',
    content: (
      <p className="text-white/45 text-sm leading-relaxed">
        I debug code at <span className="text-purple-acc">2 AM</span> with lo-fi beats and consider it peak productivity. Also a marketing strategist helping clients build unique brand strategies. ☕
      </p>
    ),
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-28 relative overflow-hidden" style={{ background: '#050505' }}>
      {/* Subtle grid */}
      <div className="animated-grid" aria-hidden="true" style={{ opacity: 0.4 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12">
          <div className="section-label">About me</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90">
            The person <span className="gradient-text-blue">behind the code</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-sm">
          {[
            { value: '3+', label: 'Projects' },
            { value: '2+', label: 'Yrs Coding' },
            { value: '100+', label: 'Commits' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-electric">{s.value}</p>
              <p className="text-white/25 text-xs tracking-widest mt-0.5">{s.label.toUpperCase()}</p>
            </div>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {cards.map((card, i) => (
            <BentoItem key={card.title} card={card} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}