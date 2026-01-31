'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Code,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Loader2,
  FileText,
  Calendar,
  User,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { MetricsCards } from '@/components/dataset/metrics-cards';
import { DataPreviewTable } from '@/components/dataset/data-preview-table';
import { DistributionChart } from '@/components/dataset/distribution-chart';
import { CorrelationChart } from '@/components/dataset/correlation-chart';
import { MLRecommendation } from '@/components/dataset/ml-recommendation';
import { useAuth } from '@/lib/auth-context';
import { mockDatasetDetails } from '@/lib/mock-data';
import { DatasetDetails } from '@/lib/types';
import { cn } from '@/lib/utils';

const sourceColors: Record<string, string> = {
  kaggle: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  github: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  huggingface: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  government: 'bg-green-500/10 text-green-500 border-green-500/20',
};

const qualityColors: Record<string, string> = {
  high: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function DatasetDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user, updateUser } = useAuth();
  const [dataset, setDataset] = useState<DatasetDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchDataset = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = mockDatasetDetails[resolvedParams.id];
      if (data) {
        setDataset(data);
        setIsSaved(user?.savedDatasets?.includes(resolvedParams.id) || false);
      }
      setIsLoading(false);
    };

    if (isAuthenticated) {
      fetchDataset();
    }
  }, [resolvedParams.id, isAuthenticated, user?.savedDatasets]);

  const handleSave = () => {
    if (!user) return;
    const newSaved = isSaved
      ? user.savedDatasets.filter((id) => id !== resolvedParams.id)
      : [...user.savedDatasets, resolvedParams.id];
    updateUser({ savedDatasets: newSaved });
    setIsSaved(!isSaved);
  };

  const handleDownload = () => {
    // Mock download action
    alert('Download started! (This is a mock action)');
  };

  const handleGenerateCode = () => {
    // Mock code generation
    const code = `# Auto-generated starter code for ${dataset?.title}
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
df = pd.read_csv('${dataset?.title.toLowerCase().replace(/\s+/g, '_')}.csv')

# Basic preprocessing
print(f"Dataset shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(df.head())

# Suggested target column: ${dataset?.mlRecommendation.targetColumn || 'target'}
# Suggested task: ${dataset?.mlRecommendation.task}
`;
    navigator.clipboard.writeText(code);
    alert('Starter code copied to clipboard!');
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Dataset not found</h1>
            <p className="mt-2 text-muted-foreground">
              The dataset you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/dashboard">
              <Button className="mt-4">Back to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(dataset.lastUpdated).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={cn('capitalize', sourceColors[dataset.source])}>
                  {dataset.source}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn('capitalize', qualityColors[dataset.qualityScore])}
                >
                  {dataset.qualityScore} quality
                </Badge>
                <div className="flex h-7 items-center justify-center rounded-full bg-primary/10 px-3">
                  <span className="text-sm font-bold text-primary">{dataset.relevanceScore}% match</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{dataset.title}</h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">{dataset.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                {isSaved ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="uppercase">{dataset.format}</span>
              <span className="text-border">|</span>
              <span>{dataset.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated {formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{dataset.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>{dataset.license}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {dataset.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download Dataset
          </Button>
          <Button variant="outline" onClick={handleGenerateCode} className="gap-2 bg-transparent">
            <Code className="h-4 w-4" />
            Generate Starter Code
          </Button>
          <Button variant="outline" asChild className="gap-2 bg-transparent">
            <a href={dataset.downloadUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View Source
            </a>
          </Button>
        </div>

        {/* Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Dataset Metrics</h2>
          <MetricsCards metrics={dataset.metrics} />
        </section>

        {/* Column Info */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Column Information</CardTitle>
              <CardDescription>Overview of dataset columns and their types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dataset.metrics.columnTypes.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-mono text-sm font-medium text-foreground">{col.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{col.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {col.uniqueCount.toLocaleString()} unique
                      </p>
                      {col.nullCount > 0 && (
                        <p className="text-xs text-warning">{col.nullCount.toLocaleString()} nulls</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Preview */}
        <section className="mb-8">
          <DataPreviewTable data={dataset.metrics.sampleData} />
        </section>

        {/* Auto EDA Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Automated EDA</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <DistributionChart distributions={dataset.distributions} />
            <CorrelationChart correlations={dataset.correlations} />
          </div>
        </section>

        {/* ML Recommendation */}
        <section className="mb-8">
          <MLRecommendation recommendation={dataset.mlRecommendation} />
        </section>
      </main>
    </div>
  );
}
