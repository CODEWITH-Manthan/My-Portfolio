import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutSection() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-picture');

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 relative border-2 border-primary p-2">
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-sm font-bold">[SUBJECT_DATA]</div>
            <div className="absolute bottom-2 right-2 text-primary text-xs font-mono">FILE: /usr/dev/p_data.bin</div>
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                width={600}
                height={800}
                className="w-full object-cover"
                data-ai-hint={profileImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-background/50 mix-blend-hard-light pointer-events-none"></div>
            <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none"></div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
                PROFILE SUMMARY
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Highly motivated web developer with a solid computer science education and previous experience working on personal projects. I have extensive expertise building responsive and interactive web pages, am incredibly detail-oriented, and am concerned with user experience. I'm delighted about the possibility to work as a web developer in a professional context, where I can contribute to exciting projects and provide solutions. As a marketing strategist, I also help clients create effective and unique marketing strategies to raise their online profile.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline tracking-tighter mb-4">EDUCATION</h3>
              <div className="border-l-2 border-primary pl-4">
                <p className="text-lg font-semibold">Vivekanand Education Society Institute of Technology</p>
                <p className="text-muted-foreground">Electronic and Computer Science Engineering</p>
                <p className="text-sm text-primary font-mono">2024-2028</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline tracking-tighter mb-4">SKILLS & INTERESTS</h3>
              <div className="grid sm:grid-cols-2 gap-6 text-lg">
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Frontend & Backend</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Responsive Design</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Supervising</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Event Planning</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Propel Marketing</li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Newsletter Design</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Fluent in English</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Sports</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Social Media Management</li>
                  <li className="flex items-start"><span className="text-primary font-bold mr-3">&gt;</span>Graphic Design</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="border-2 p-4 w-full">
                <h3 className="font-bold text-lg mb-2 text-primary">LOCATION</h3>
                <p className="text-lg">Balkum Thane (W), India</p>
              </div>
              <div className="border-2 p-4 w-full">
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
      </div>
    </section>
  );
}