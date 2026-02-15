const tech = [
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

export default function TechStackSection() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
            TECH_STACK
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tech.map((item) => (
            <div
              key={item}
              className="border-2 border-border bg-background p-6 flex items-center justify-center transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_hsl(var(--primary))]"
            >
              <p className="text-lg font-bold text-center">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
