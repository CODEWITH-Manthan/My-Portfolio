import type { Metadata } from 'next';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import TechStackSection from '@/components/sections/tech-stack';
import GitHubDashboard from '@/components/sections/github-dashboard';
import ProjectsSection from '@/components/sections/projects';
import TimelineSection from '@/components/sections/timeline';
import ContactSection from '@/components/sections/contact';

export const metadata: Metadata = {
  title: 'Manthan Ilake | Full Stack Developer',
  description: 'Electronics & Computer Science student and Full Stack Developer from Mumbai. Building scalable digital products with modern web technologies.',
  keywords: ['Manthan Ilake', 'Full Stack Developer', 'React', 'Next.js', 'MERN', 'Mumbai'],
  authors: [{ name: 'Manthan Ilake' }],
  openGraph: {
    title: 'Manthan Ilake | Full Stack Developer',
    description: 'Building scalable digital products with modern web technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manthan Ilake | Full Stack Developer',
    description: 'Building scalable digital products with modern web technologies.',
  },
};

export default function Home() {
  return (
    <div style={{ background: '#050505' }}>
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <GitHubDashboard />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
    </div>
  );
}
