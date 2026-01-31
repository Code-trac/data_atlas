const techStack = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Cache' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'Pinecone', category: 'Vector DB' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Vercel', category: 'Hosting' },
];

export function TechStackSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with modern, production-ready technologies.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-all hover:border-primary/50"
            >
              <span className="text-sm font-medium text-card-foreground">{tech.name}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
