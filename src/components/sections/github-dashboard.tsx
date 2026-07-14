'use client';
import { useEffect, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (target === 0) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const duration = 1800;
        const animate = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ProgressRing({ value, total, color, label, sublabel }: { value: number; total: number; color: string; label: string; sublabel: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const [animated, setAnimated] = useState(false);
  const R = 36, C = 2 * Math.PI * R;
  const pct = total > 0 ? value / total : 0;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle
            ref={ref}
            cx="48" cy="48" r={R}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={animated ? C * (1 - pct) : C}
            className="progress-ring-circle"
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white/80 font-bold text-sm">{value}</span>
        </div>
      </div>
      <p className="text-white/50 text-xs font-medium">{label}</p>
      <p className="text-white/25 text-xs">{sublabel}</p>
    </div>
  );
}

export default function GitHubDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const [lc, setLc] = useState({ total: 0, easy: 0, medium: 0, hard: 0, loading: true });

  useEffect(() => {
    fetch('/api/leetcode')
      .then(res => res.json())
      .then(data => {
        setLc({
          total: data.total || 0,
          easy: data.easy || 0,
          medium: data.medium || 0,
          hard: data.hard || 0,
          loading: false,
        });
      })
      .catch(() => setLc(prev => ({ ...prev, loading: false })));
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-16 md:py-28 relative overflow-hidden"
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
          <div className="section-label">Developer Activity</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 mb-12">
            Code <span className="gradient-text-blue">at a glance</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 mb-8">
          {/* GitHub Contributions */}
          <div className="bento-card w-full overflow-hidden" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s 0.1s ease' }}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>GitHub Contributions</p>
            <div className="flex w-full overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-max mx-auto px-2">
                <GitHubCalendar 
                  username="CODEWITH-Manthan" 
                  colorScheme="dark"
                  blockSize={14}
                  blockMargin={4}
                  fontSize={12}
                  showWeekdayLabels={true}
                  theme={{
                    dark: ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353']
                  }}
                />
              </div>
            </div>
          </div>

          {/* LeetCode */}
          <div className="bento-card" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s 0.2s ease' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>LeetCode</p>
            {lc.loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-5 h-5 border-2 border-electric/30 border-t-electric rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-around py-4 gap-6 md:gap-0">
                <div className="text-center md:text-left md:w-32">
                  <p className="text-3xl font-bold text-electric text-center">
                    <AnimatedCounter target={lc.total} />
                  </p>
                  <p className="text-white/30 text-xs mt-1 text-center">Total Solved</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/8" />
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                  <ProgressRing value={lc.easy} total={954} color="#22C55E" label="Easy" sublabel={`${lc.easy} solved`} />
                  <ProgressRing value={lc.medium} total={2085} color="#F97316" label="Medium" sublabel={`${lc.medium} solved`} />
                  <ProgressRing value={lc.hard} total={953} color="#EF4444" label="Hard" sublabel={`${lc.hard} solved`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
