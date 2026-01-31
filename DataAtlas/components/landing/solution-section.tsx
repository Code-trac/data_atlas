import { CheckCircle2, Zap, BarChart3, Brain } from 'lucide-react';

const solutions = [
  {
    icon: Zap,
    title: 'Unified Search',
    description: 'Search across all major dataset sources from a single interface with semantic understanding.',
  },
  {
    icon: BarChart3,
    title: 'Quality Scoring',
    description: 'Automatic quality assessment including completeness, freshness, and reliability metrics.',
  },
  {
    icon: Brain,
    title: 'AI Recommendations',
    description: 'Get ML task suggestions and model recommendations based on dataset characteristics.',
  },
  {
    icon: CheckCircle2,
    title: 'Auto EDA',
    description: 'Instant exploratory data analysis with visualizations, correlations, and insights.',
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Solution
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Data Atlas brings intelligence to dataset discovery.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <solution.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{solution.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
