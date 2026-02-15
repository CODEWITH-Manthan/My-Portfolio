import { Button } from '../ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
            CONTACT
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind or just want to say hi? Let's connect.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent-foreground font-bold text-lg"
            >
              <a href="mailto:manthanilake@gmail.com">manthanilake@gmail.com</a>
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-6">
            {socialLinks.map((social) => (
              <Button asChild key={social.label} variant="outline" size="icon" className="h-14 w-14 border-2">
                <Link href={social.href} target="_blank" aria-label={social.label}>
                  <social.icon className="h-6 w-6" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
