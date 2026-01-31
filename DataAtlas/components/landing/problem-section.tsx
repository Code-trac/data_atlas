import { Clock, Search, FileQuestion, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: Search,
    title: 'Scattered Sources',
    description: 'Datasets are spread across Kaggle, GitHub, HuggingFace, and government portals with no unified search.',
  },
  {
    icon: Clock,
    title: 'Time Consuming',
    description: 'Hours spent manually searching, evaluating, and comparing datasets across different platforms.',
  },
  {
    icon: FileQuestion,
    title: 'Unknown Quality',
    description: 'No standardized way to assess dataset quality, completeness, or suitability for your use case.',
  },
  {
    icon: AlertTriangle,
    title: 'No Guidance',
    description: 'Lack of insights on which ML tasks or models are best suited for a given dataset.',
  },
];

export function ProblemSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Problem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Finding the right dataset for your ML project is harder than it should be.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <problem.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{problem.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
