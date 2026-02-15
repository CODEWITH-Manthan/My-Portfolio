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

          <div className="md:col-span-3 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
              WHO AM I?
            </h2>
            <p className="text-lg text-muted-foreground">
              Highly motivated web developer with a solid computer science education. I have extensive expertise building responsive and interactive web pages. I'm incredibly detail-oriented and focused on user experience. I'm excited about the possibility to work in a professional context, where I can contribute to exciting projects and provide solutions.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">&gt;</span>
                Frontend Development
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">&gt;</span>
                Backend Development
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">&gt;</span>
                Responsive Design
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="border-2 p-4 w-full">
                <h3 className="font-bold text-lg mb-2 text-primary">LOCATION</h3>
                <p className="text-lg">India</p>
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
