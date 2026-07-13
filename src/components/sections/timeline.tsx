'use client';
import React, { useRef, useEffect, useState } from 'react';
import { GraduationCap, Briefcase, Trophy, Award, Star } from 'lucide-react';

type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  type: 'education' | 'work' | 'hackathon' | 'cert' | 'achievement';
};

const TIMELINE: TimelineItem[] = [
  {
    year: '2024 — Present',
    title: 'B.E. Electronics & Computer Science',
    subtitle: 'VESIT, Mumbai',
    description: 'Pursuing Bachelor of Engineering at Vivekanand Education Society Institute of Technology. Focused on software engineering, data structures, and full-stack web development.',
    icon: <GraduationCap size={16} />,
    accent: '#4F8CFF',
    type: 'education',
  },
  {
    year: '2024',
    title: 'Full Stack Developer Internship',
    subtitle: 'Internship Project',
    description: 'Worked on building and deploying web applications using React, Node.js, and Firebase. Gained hands-on experience in production-grade code and agile workflows.',
    icon: <Briefcase size={16} />,
    accent: '#8B5CF6',
    type: 'work',
  },
  {
    year: '2024',
    title: 'AlumniConnect — Hackathon Project',
    subtitle: 'Web Platform',
    description: 'Built a full-stack alumni networking platform during a college hackathon. Implemented real-time features with Firebase and deployed to Vercel.',
    icon: <Trophy size={16} />,
    accent: '#22C55E',
    type: 'hackathon',
  },
  {
    year: '2024',
    title: 'Blockchain Procurement System',
    subtitle: 'Web3 Project',
    description: 'Developed a decentralized procurement system using smart contracts and Web3.js, solving supply chain transparency problems.',
    icon: <Star size={16} />,
    accent: '#F97316',
    type: 'achievement',
  },
  {
    year: '2023',
    title: 'HSC — 12th Grade',
    subtitle: 'Maharashtra State Board',
    description: 'Completed Higher Secondary Certificate examination. Focused on Physics, Chemistry, Mathematics and Computer Science.',
    icon: <Award size={16} />,
    accent: '#06B6D4',
    type: 'cert',
  },
];

function TimelineCard({ item, delay, side }: { item: TimelineItem; delay: number; side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${side === 'left' ? 'md:pr-8 md:text-right' : 'md:pl-8'} md:w-1/2`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${side === 'left' ? '-' : ''}24px)`,
        transition: `all 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
        [side === 'left' ? 'marginLeft' : 'marginLeft']: side === 'right' ? 'auto' : '0',
      }}
    >
      <div className="bento-card">
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 w-0.5 h-full rounded-full"
          style={{ background: `linear-gradient(180deg, ${item.accent}, transparent)`, opacity: 0.5 }}
        />
        <div className="flex items-start gap-3 mb-3">
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}25` }}
          >
            {item.icon}
          </div>
          <div>
            <p className="text-white/25 text-xs tracking-widest mb-0.5">{item.year}</p>
            <h3 className="text-white/80 font-semibold text-sm">{item.title}</h3>
            <p style={{ color: item.accent }} className="text-xs mt-0.5 opacity-70">{item.subtitle}</p>
          </div>
        </div>
        <p className="text-white/35 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-28 relative overflow-hidden" style={{ background: '#050505' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="section-label">Journey</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-16">
          My <span className="gradient-text-blue">timeline</span>
        </h2>

        <div className="relative">
          {/* Center line */}
          <div className="timeline-line hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={item.title} className={`md:flex md:items-start md:gap-0 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} mb-8`}>
                <TimelineCard item={item} delay={i * 100} side={i % 2 === 0 ? 'left' : 'right'} />

                {/* Center dot (desktop) */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 mt-4 w-3 h-3 rounded-full border-2 border-current z-10"
                  style={{ color: item.accent, background: '#050505', marginTop: `${i * 0 + 16}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
