const techRow1 = [
  "React",
  "Next.js",
  "Python",
  "Node.js",
  "Java",
  "Django",
  "MySQL",
  "Tailwind",
  "Git",
  "GraphQL",
];
const techRow2 = [
  "TypeScript",
  "Firebase",
  "Docker",
  "Kubernetes",
  "AWS",
  "Zod",
  "Genkit",
  "Figma",
  "PostgreSQL",
  "Vercel"
];

const TechItem = ({ name }: { name: string }) => (
  <div
    className="border-2 border-border bg-background py-4 px-8 flex items-center justify-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_hsl(var(--primary))] hover:border-primary"
  >
    <p className="text-lg font-bold text-center whitespace-nowrap">{name}</p>
  </div>
);

export default function TechStackSection() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
            TECH_STACK
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>
      </div>
      <div className="mt-12 space-y-4 [--gap:1rem] group flex flex-col">
        <div className="flex w-full overflow-hidden">
            <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused] gap-[--gap]">
                {[...techRow1, ...techRow1].map((item, index) => (
                    <TechItem key={index} name={item} />
                ))}
            </div>
        </div>
        <div className="flex w-full overflow-hidden">
            <div className="flex w-max animate-scroll-reverse group-hover:[animation-play-state:paused] gap-[--gap]">
                {[...techRow2, ...techRow2].map((item, index) => (
                    <TechItem key={index} name={item} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
