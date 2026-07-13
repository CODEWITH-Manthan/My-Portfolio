'use client';
import { useRef, useEffect, useState } from 'react';

const SKILLS = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Firebase'],
  Database: ['MySQL', 'MongoDB', 'Firebase Firestore', 'PostgreSQL'],
  Languages: ['JavaScript', 'TypeScript', 'C', 'C++', 'Python'],
  Tools: ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Webpack', 'Vercel'],
  Cloud: ['Vercel', 'Firebase', 'Netlify', 'Apache'],
};

type Category = keyof typeof SKILLS;

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const CATEGORY_COLORS: Record<Category, string> = {
  Frontend: '#4F8CFF',
  Backend: '#8B5CF6',
  Database: '#22C55E',
  Languages: '#F97316',
  Tools: '#EC4899',
  Cloud: '#06B6D4',
};

export default function TechStackSection() {
  const [active, setActive] = useState<Category>('Frontend');
  const { ref, visible } = useInView(0.1);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          style={{
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="section-label">Tech Stack</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-12">
            Tools of the <span className="gradient-text-blue">trade</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(Object.keys(SKILLS) as Category[]).map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={{
                borderColor: active === cat ? CATEGORY_COLORS[cat] : 'rgba(255,255,255,0.08)',
                background: active === cat ? `${CATEGORY_COLORS[cat]}18` : 'transparent',
                color: active === cat ? CATEGORY_COLORS[cat] : 'rgba(255,255,255,0.4)',
                transitionDelay: `${i * 30}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap gap-3">
          {SKILLS[active].map((skill, i) => (
            <div
              key={skill}
              className="skill-chip"
              style={{
                transitionDelay: `${i * 40}ms`,
                borderColor: `${CATEGORY_COLORS[active]}20`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: CATEGORY_COLORS[active] }}
              />
              {skill}
            </div>
          ))}
        </div>

        {/* Scrolling marquee (all skills) */}
        <div className="mt-20 space-y-4 group overflow-hidden">
          <p className="text-white/15 text-xs tracking-widest mb-4">ALL TECHNOLOGIES</p>
          {[
            Object.values(SKILLS).flat().slice(0, 12),
            Object.values(SKILLS).flat().slice(12),
          ].map((row, ri) => (
            <div key={ri} className="flex w-full overflow-hidden">
              <div className={`flex w-max gap-4 ${ri === 0 ? 'animate-scroll' : 'animate-scroll-reverse'} group-hover:[animation-play-state:paused]`}>
                {[...row, ...row].map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 border border-white/5 rounded-lg text-white/25 text-sm font-medium whitespace-nowrap flex-shrink-0 hover:border-white/15 hover:text-white/50 transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
