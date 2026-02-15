import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    id: 'project-1',
    title: 'Project Alpha',
    description: 'A cutting-edge web application built with Next.js and AI, designed for high performance and scalability.'
  },
  {
    id: 'project-2',
    title: 'Project Beta',
    description: 'An interactive data visualization platform using React and Python, providing real-time analytics.'
  },
  {
    id: 'project-3',
    title: 'Project Gamma',
    description: 'A robust back-end system developed with Node.js and GraphQL, powering a large-scale mobile app.'
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
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const image = PlaceHolderImages.find(img => img.id === project.id);
            return (
              <Card key={project.id} className="bg-background border-2 overflow-hidden group transition-all hover:border-primary hover:shadow-[0_10px_20px_-5px_hsl(var(--primary)/0.3)]">
                <CardHeader>
                  {image && (
                    <div className="aspect-video overflow-hidden border-b-2">
                       <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <CardTitle className="pt-4 text-2xl font-bold">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0 font-bold text-primary">
                    <Link href="#">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
