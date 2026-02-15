import { Badge } from '@/components/ui/badge';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
              WHO AM I?
            </h2>
            <p className="text-lg text-muted-foreground">
              I'm a full-stack developer with a passion for creating performant, scalable, and engaging digital experiences. My journey in tech is driven by a curiosity to solve complex problems and a desire to build software that makes a real impact. I thrive in collaborative environments and I'm always eager to learn new technologies.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">&gt;</span>
                Specialized in Modern Web Development
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">&gt;</span>
                Focused on Performance & AI Integration
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">&gt;</span>
                3+ years building scalable applications
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-4">
            <div className="border-2 p-4 w-full max-w-sm">
              <h3 className="font-bold text-lg mb-2 text-primary">LOCATION</h3>
              <p className="text-lg">India</p>
            </div>
            <div className="border-2 p-4 w-full max-w-sm">
              <h3 className="font-bold text-lg mb-2 text-primary">STATUS</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <p className="text-lg">Available for new opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
