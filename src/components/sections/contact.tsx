'use client';
import { useRef, useEffect, useState } from 'react';
import { Mail, Github, Linkedin, Instagram, MapPin, Copy, Check, Send, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EMAIL = 'manthanilake@gmail.com';

export default function ContactSection() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast({ title: 'Email copied!', description: EMAIL });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setForm({ name: '', email: '', message: '' });
    toast({ title: '✓ Message sent!', description: "Thanks! I'll get back to you soon." });
  };

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/CODEWITH-Manthan', handle: '@CODEWITH-Manthan' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manthan-s-ilake-131210370', handle: 'manthan-s-ilake' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/_manthannnnn_27', handle: '@_manthannnnn_27' },
    { icon: Code, label: 'LeetCode', href: 'https://leetcode.com/u/Manthan_Ilake/', handle: 'Manthan_Ilake' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            style={{
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
            }}
            className="mb-12"
          >
            <div className="section-label">Get in Touch</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 mb-4">
              Let&apos;s Build <span className="gradient-text-blue">Something Great</span>
            </h2>
            <p className="text-white/40 text-base max-w-xl">
              I'm actively seeking opportunities for 2025 and always eager to collaborate on innovative projects. I'd love to connect and create something impactful!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — Info */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s 0.1s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Availability */}
            <div className="bento-card">
              <div className="flex items-center gap-2 mb-1">
                <span className="online-dot" />
                <span className="text-success text-sm font-medium">Ready for New Challenges</span>
              </div>
              <p className="text-white/30 text-xs">Actively seeking opportunities — starting 2025</p>
            </div>

            {/* Email */}
            <div className="bento-card">
              <p className="section-label" style={{ margin: 0, marginBottom: '0.5rem' }}>Email</p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-electric/60" />
                  <a href={`mailto:${EMAIL}`} className="text-white/60 text-sm hover:text-white/90 transition-colors">
                    {EMAIL}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-1.5 border border-white/8 rounded-lg text-white/30 hover:text-white/70 hover:border-white/15 transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="bento-card">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-white/30" />
                <div>
                  <p className="text-white/50 text-sm">Mumbai, India</p>
                  <p className="text-white/25 text-xs">Thane (W), Maharashtra</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Socials */}
          <div
            className="space-y-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s 0.2s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <p className="section-label mb-2">Connect with me</p>
            <div className="space-y-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-card flex items-center gap-3 no-underline hover:border-white/15 transition-colors"
                >
                  <s.icon size={15} className="text-white/35 flex-shrink-0" />
                  <div>
                    <p className="text-white/50 text-xs font-medium">{s.label}</p>
                    <p className="text-white/25 text-xs">{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
