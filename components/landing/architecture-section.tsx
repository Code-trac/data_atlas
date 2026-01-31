import { ArrowRight, Database, Globe, Cpu, Server, BarChart3 } from 'lucide-react';

const architectureFlow = [
  {
    icon: Globe,
    title: 'Data Sources',
    items: ['Kaggle API', 'GitHub API', 'HuggingFace Hub', 'Data.gov'],
  },
  {
    icon: Cpu,
    title: 'AI Processing',
    items: ['Semantic Embeddings', 'Quality Analysis', 'ML Task Detection'],
  },
  {
    icon: Database,
    title: 'Storage',
    items: ['PostgreSQL', 'Pinecone Vectors', 'Redis Cache'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['FastAPI', 'REST + GraphQL', 'Auth & Rate Limiting'],
  },
  {
    icon: BarChart3,
    title: 'Frontend',
    items: ['Next.js App', 'Real-time Updates', 'Interactive EDA'],
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Architecture Overview
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A scalable, production-ready architecture for intelligent dataset discovery.
          </p>
        </div>

        <div className="mt-16">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-0">
            {architectureFlow.map((stage, index) => (
              <div key={stage.title} className="flex items-center">
                <div className="w-56 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stage.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">{stage.title}</h3>
                  <ul className="space-y-1">
                    {stage.items.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < architectureFlow.length - 1 && (
                  <ArrowRight className="mx-2 hidden h-5 w-5 text-muted-foreground lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
