import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 'project-01',
    title: 'AlumniConnect',
    description: 'A web platform for alumni of an institution to connect with each other, share experiences and opportunities.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS', 'Genkit']
  },
  {
    id: 'project-02',
    title: 'E-commerce Website Clone',
    description: 'A feature-rich clone of Amazon, demonstrating frontend and backend skills in a complex, real-world application.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    id: 'project-03',
    title: 'Developer Portfolio',
    description: 'This personal portfolio website, built with a retro-tech brutalist design to showcase my skills and projects.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion']
  },
  {
    id: 'project-04',
    title: 'Task Management App',
    description: 'A simple and intuitive task management application to help users stay organized and productive.',
    tech: ['Vue.js', 'Vuex', 'SCSS']
  }
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
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="bg-card border-2 h-full flex flex-col group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_hsl(var(--primary))] hover:border-primary">
                      <CardHeader className="p-4 border-b-2">
                        <p className="font-mono text-xs text-primary">[PROJECT_ID: {project.id}]</p>
                        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 flex-grow space-y-4">
                        <CardDescription>{project.description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(t => <Badge key={t} variant="outline" className="border-primary/50">{t}</Badge>)}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 mt-auto border-t-2 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-muted-foreground font-mono text-xs">OPERATIONAL</span>
                        </div>
                        <Button asChild variant="link" className="p-0 font-bold text-primary">
                          <Link href="#">
                            View <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
