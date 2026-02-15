import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const projects = [
  {
    id: 'project-1',
    title: 'AlumniConnect',
    description: 'A web platform for alumni of an institution to connect with each other, share experiences and opportunities.'
  },
  {
    id: 'project-2',
    title: 'E-commerce Website Clone',
    description: 'A feature-rich clone of Amazon, demonstrating frontend and backend skills.'
  },
  {
    id: 'project-3',
    title: 'Developer Portfolio',
    description: 'This personal portfolio website, built with Next.js and Tailwind CSS with a Retro Tech Brutalist design.'
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
            /PROJECTS
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A selection of my work.
          </p>
        </div>
        <div className="mt-12 relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project) => {
                const image = PlaceHolderImages.find(img => img.id === project.id);
                return (
                  <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="bg-background border-2 overflow-hidden group transition-all h-full flex flex-col hover:border-primary hover:shadow-[0_10px_20px_-5px_hsl(var(--primary)/0.3)]">
                        {image && (
                          <div className="aspect-video overflow-hidden border-b-2 relative">
                            <Image
                              src={image.imageUrl}
                              alt={image.description}
                              width={600}
                              height={400}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={image.imageHint}
                            />
                            <div className="absolute inset-0 bg-primary/30 mix-blend-hard-light group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                            <div className="absolute inset-0 bg-background/50 mix-blend-screen group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-grow">
                          <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                          <CardDescription className="mt-2 flex-grow">{project.description}</CardDescription>
                        </div>
                        <CardContent className="pt-0">
                          <Button asChild variant="link" className="p-0 font-bold text-primary">
                            <Link href="#">
                              View Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
