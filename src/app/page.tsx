import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import TechStackSection from '@/components/sections/tech-stack';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manthan Ilake | Web Developer',
  description: 'Portfolio of Manthan Ilake, a passionate web developer.',
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
