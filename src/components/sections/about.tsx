'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Animated counter component
function AnimatedCounter({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-card group">
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-glow" />
    </div>
  );
}

// Typing effect for terminal
function TerminalTyping({ lines }: { lines: string[] }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started.current) return;
    if (currentLine >= lines.length) return;

    const timer = setTimeout(() => {
      if (currentChar < lines[currentLine].length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = (newLines[currentLine] || '') + lines[currentLine][currentChar];
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      } else {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, '']);
      }
    }, 25 + Math.random() * 30);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines]);

  return (
    <div ref={ref} className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="terminal-title">manthan@portfolio:~$ cat profile.sys</span>
      </div>
      <div className="terminal-body">
        {displayedLines.map((line, i) => (
          <div key={i} className="terminal-line">
            <span className="terminal-prompt">{i === 0 ? '>' : '│'}</span>
            <span>{line}</span>
            {i === currentLine && currentLine < lines.length && (
              <span className="terminal-cursor">█</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Floating 3D hex grid background
function HexGrid() {
  return (
    <div className="hex-grid-container" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="hex-cell"
          style={{
            left: `${(i % 6) * 17 + (Math.floor(i / 6) % 2 === 0 ? 0 : 8.5)}%`,
            top: `${Math.floor(i / 6) * 26}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

// Animated skill bar
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} className="skill-bar-wrapper">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{width}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%`, transitionDelay: `${delay}ms` }}
        />
        <div className="skill-bar-glow" style={{ width: `${width}%`, transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const terminalLines = [
    '> INITIALIZING PROFILE SCAN...',
    '> SUBJECT: Manthan Ilake',
    '> ROLE: Full-Stack Web Developer',
    '> STATUS: ACTIVE | ONLINE',
    '> CLEARANCE: LEVEL_5',
    '> ',
    '> Highly motivated web developer with a solid',
    '> computer science education. Extensive expertise',
    '> building responsive and interactive web pages.',
    '> Detail-oriented with focus on user experience.',
    '> Also a marketing strategist helping clients',
    '> create unique strategies to raise their profile.',
    '> ',
    '> [SCAN COMPLETE] ✓',
  ];

  const skills = [
    { name: 'Frontend Development', level: 90 },
    { name: 'Backend Systems', level: 75 },
    { name: 'Responsive Design', level: 95 },
    { name: 'Marketing Strategy', level: 80 },
    { name: 'UI/UX Design', level: 85 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
    >
      {/* Background effects */}
      <HexGrid />
      <div className="cyber-grid-bg" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          {/* <div className="glitch-label">
            <span className="label-bracket">[</span>
            <span className="label-text">SECTION_02</span>
            <span className="label-bracket">]</span>
          </div> */}
          <h2 className="section-title" data-text="ABOUT_ME">
            ABOUT<span className="text-primary">_</span>ME
          </h2>
          <div className="title-underline">
            <div className="title-underline-fill" />
          </div>
        </div>

        {/* Main content grid */}
        <div className="about-grid">
          {/* Left column - 3D Photo card */}
          <div className={`photo-column ${isVisible ? 'animate-in' : ''}`}>
            <div className="photo-card-3d">
              <div className="photo-card-inner">
                {/* Decorative corner brackets */}
                <div className="corner-bracket top-left" />
                <div className="corner-bracket top-right" />
                <div className="corner-bracket bottom-left" />
                <div className="corner-bracket bottom-right" />

                {/* Photo frame */}
                <div className="photo-frame">
                  <Image
                    src="/profile-photo.png"
                    alt="Manthan Ilake - Web Developer"
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                    className="profile-image"
                    priority
                  />
                  {/* Scan overlay */}
                  <div className="scan-overlay" />
                  {/* Glitch lines */}
                  <div className="glitch-overlay" />
                </div>

                {/* HUD overlay elements */}
                <div className="hud-top-bar">
                  <span className="hud-dot pulse" />
                  <span className="hud-label">SUBJECT_DATA</span>
                  <span className="hud-status">VERIFIED ✓</span>
                </div>

                <div className="hud-bottom-bar">
                  <span className="hud-coord">LAT: 19.2183</span>
                  <span className="hud-divider">|</span>
                  <span className="hud-coord">LNG: 72.9781</span>
                </div>

                {/* Side data strips */}
                <div className="data-strip-left">
                  {['0x4D', '0x41', '0x4E', '0x54', '0x48'].map((hex, i) => (
                    <span key={i} className="hex-byte" style={{ animationDelay: `${i * 0.2}s` }}>{hex}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="stats-row">
              <AnimatedCounter target={3} label="PROJECTS" suffix="+" />
              <AnimatedCounter target={2} label="YRS EXP" suffix="+" />
              <AnimatedCounter target={100} label="COMMITS" suffix="+" />
            </div>
          </div>

          {/* Right column - Terminal + Data */}
          <div className={`info-column ${isVisible ? 'animate-in' : ''}`}>
            {/* Terminal window */}
            <TerminalTyping lines={terminalLines} />

            {/* Education card */}
            <div className="data-card">
              <div className="data-card-header">
                <span className="data-card-icon">📡</span>
                <span className="data-card-title">EDUCATION_LOG</span>
              </div>
              <div className="data-card-body">
                <div className="edu-item">
                  <div className="edu-timeline-dot" />
                  <div className="edu-content">
                    <h4 className="edu-institution">VESIT</h4>
                    <p className="edu-subtitle">Vivekanand Education Society Institute of Technology</p>
                    <p className="edu-field">Electronic & Computer Science Engineering</p>
                    <div className="edu-year">
                      <span className="year-badge">2024</span>
                      <span className="year-separator">→</span>
                      <span className="year-badge">2028</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills bars */}
            <div className="data-card">
              <div className="data-card-header">
                <span className="data-card-icon">⚡</span>
                <span className="data-card-title">CAPABILITY_MATRIX</span>
              </div>
              <div className="data-card-body">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 200} />
                ))}
              </div>
            </div>

            {/* Info cards row */}
            <div className="info-cards-row">
              <div className="info-card">
                <div className="info-card-icon">📍</div>
                <div className="info-card-content">
                  <h4 className="info-card-label">LOCATION</h4>
                  <p className="info-card-value">Balkum, Thane (W)</p>
                  <p className="info-card-sub">Maharashtra, India</p>
                </div>
                <div className="info-card-pulse" />
              </div>
              <div className="info-card status-card">
                <div className="info-card-icon">🟢</div>
                <div className="info-card-content">
                  <h4 className="info-card-label">STATUS</h4>
                  <p className="info-card-value">Available</p>
                  <p className="info-card-sub">Open to opportunities</p>
                </div>
                <div className="status-beacon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}