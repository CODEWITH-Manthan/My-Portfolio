'use client';
import { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'alumni-connect',
    title: 'AlumniConnect',
    tagline: 'Where alumni meet, connect, and grow',
    description: 'A full-featured web platform for alumni of an institution to connect, share experiences, post opportunities, and mentor juniors. Built for scale and engagement.',
    problem: 'Alumni had no unified, digital space to stay connected with their institution or each other after graduation.',
    solution: 'A real-time platform with authentication, profiles, opportunity board, and event management.',
    tech: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Vercel'],
    features: ['Real-time notifications', 'Profile management', 'Opportunity board', 'Event calendar', 'Admin dashboard'],
    github: 'https://github.com/CODEWITH-Manthan',
    live: 'https://alumni-connect-uk2q.vercel.app/',
    accent: '#4F8CFF',
    gradient: 'from-electric/10 to-transparent',
  },
  {
    id: 'blockchain-procurement',
    title: 'Blockchain Procurement System',
    tagline: 'Transparent. Secure. Decentralized.',
    description: 'A decentralized procurement system built on blockchain technology, eliminating fraud, increasing transparency, and automating supplier workflows with smart contracts.',
    problem: 'Traditional procurement is opaque, prone to fraud, and paper-heavy with no audit trail.',
    solution: 'Smart-contract driven procurement with immutable records, automatic escrow, and real-time tracking.',
    tech: ['Blockchain', 'Web3.js', 'Solidity', 'TypeScript', 'Node.js'],
    features: ['Smart contract automation', 'Immutable audit trail', 'Multi-party approval', 'Real-time tracking', 'Decentralized storage'],
    github: 'https://github.com/CODEWITH-Manthan',
    live: 'https://aphelion-phi.vercel.app/login',
    accent: '#8B5CF6',
    gradient: 'from-purple-acc/10 to-transparent',
  },
];

function BlockchainFlow() {
  const steps = ['Buyer Request', 'Smart Contract', 'Supplier Approval', 'Escrow Lock', 'Delivery', 'Auto Release'];
  return (
    <div className="flex flex-wrap gap-2 items-center mt-4">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-purple/20 bg-purple/5 text-purple-acc text-xs font-medium whitespace-nowrap">
            {step}
          </div>
          {i < steps.length - 1 && <ArrowRight size={12} className="text-white/20 flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="project-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
        borderColor: expanded ? `${project.accent}30` : undefined,
      }}
    >
      {/* Header gradient strip */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      <div className="p-6 md:p-8">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-white/25 text-xs tracking-widest mb-1">{project.id.toUpperCase()}</p>
            <h3 className="text-2xl font-bold text-white/90">{project.title}</h3>
            <p style={{ color: project.accent }} className="text-sm mt-1 font-medium">{project.tagline}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="p-2 border border-white/8 rounded-lg text-white/40 hover:text-white/80 hover:border-white/15 transition-colors"
              aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="p-2 border border-white/8 rounded-lg text-white/40 hover:text-white/80 hover:border-white/15 transition-colors"
              aria-label="Live demo">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <p className="text-white/45 text-sm leading-relaxed mb-6">{project.description}</p>

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg border border-white/5 bg-white/2">
            <p className="text-white/25 text-xs tracking-widest mb-2">PROBLEM</p>
            <p className="text-white/50 text-sm leading-relaxed">{project.problem}</p>
          </div>
          <div className="p-4 rounded-lg border border-white/5 bg-white/2">
            <p className="text-xs tracking-widest mb-2" style={{ color: `${project.accent}60` }}>SOLUTION</p>
            <p className="text-white/50 text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Blockchain flow (only for blockchain project) */}
        {project.id === 'blockchain-procurement' && (
          <div className="mb-6">
            <p className="text-white/25 text-xs tracking-widest mb-2">WORKFLOW</p>
            <BlockchainFlow />
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span
              key={t}
              className="tech-badge"
              style={{ borderColor: `${project.accent}20`, color: `${project.accent}80` }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Features toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest flex items-center gap-2"
        >
          {expanded ? '↑ HIDE' : '↓ SHOW'} FEATURES
        </button>

        {expanded && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {project.features.map(f => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                <span className="text-white/40 text-xs">{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-medium text-sm transition-all"
            style={{
              borderColor: `${project.accent}30`,
              color: project.accent,
              background: `${project.accent}08`,
            }}
          >
            View Live <ExternalLink size={13} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/8 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <Github size={14} /> Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden" style={{ background: '#050505' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="section-label">Featured Work</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-12">
          Things I&apos;ve <span className="gradient-text-blue">built</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
