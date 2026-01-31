import { 
  Search, 
  BarChart2, 
  Shield, 
  Layers, 
  GitBranch, 
  Download,
  Sparkles,
  Users
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Natural language queries understand your intent, not just keywords.',
  },
  {
    icon: Sparkles,
    title: 'AI Relevance Ranking',
    description: 'Smart scoring based on your project requirements and dataset characteristics.',
  },
  {
    icon: BarChart2,
    title: 'Auto EDA Preview',
    description: 'Instant visualizations, distributions, and statistical summaries.',
  },
  {
    icon: Shield,
    title: 'Quality Scoring',
    description: 'Automated assessment of completeness, accuracy, and reliability.',
  },
  {
    icon: Layers,
    title: 'Multi-Source',
    description: 'Unified access to Kaggle, GitHub, HuggingFace, and government data.',
  },
  {
    icon: GitBranch,
    title: 'ML Recommendations',
    description: 'Suggested tasks and models based on dataset structure.',
  },
  {
    icon: Download,
    title: 'Starter Code',
    description: 'Generate boilerplate code for your chosen ML framework.',
  },
  {
    icon: Users,
    title: 'Account Linking',
    description: 'Connect Kaggle, GitHub, and HuggingFace for seamless access.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to find and evaluate the perfect dataset.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="mb-1.5 font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
