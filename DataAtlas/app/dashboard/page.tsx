'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Database, TrendingUp } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { SearchForm } from '@/components/dashboard/search-form';
import { DatasetCard } from '@/components/dashboard/dataset-card';
import { useAuth } from '@/lib/auth-context';
import { mockDatasets } from '@/lib/mock-data';
import { Dataset, SearchFilters } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSearch = async (query: string, description: string, filters: SearchFilters) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Filter mock data based on query and filters
    let results = [...mockDatasets];

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(lowerQuery) ||
          d.description.toLowerCase().includes(lowerQuery) ||
          d.tags.some((t) => t.toLowerCase().includes(lowerQuery))
      );
    }

    if (description) {
      // Boost relevance scores based on description match (simplified)
      results = results.map((d) => ({
        ...d,
        relevanceScore: Math.min(100, d.relevanceScore + Math.floor(Math.random() * 10)),
      }));
    }

    if (filters.format?.length) {
      results = results.filter((d) => filters.format?.includes(d.format));
    }

    if (filters.source?.length) {
      results = results.filter((d) => filters.source?.includes(d.source));
    }

    if (filters.size && filters.size !== 'all') {
      results = results.filter((d) => {
        const bytes = d.sizeBytes;
        if (filters.size === 'small') return bytes < 10 * 1024 * 1024;
        if (filters.size === 'medium') return bytes >= 10 * 1024 * 1024 && bytes < 1024 * 1024 * 1024;
        if (filters.size === 'large') return bytes >= 1024 * 1024 * 1024;
        return true;
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    setDatasets(results);
    setIsSearching(false);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dataset Search</h1>
          <p className="mt-2 text-muted-foreground">
            Find the perfect dataset for your machine learning project
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={isSearching} />

        <div className="mt-8">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Searching datasets...</p>
            </div>
          ) : hasSearched ? (
            datasets.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found <span className="font-medium text-foreground">{datasets.length}</span> datasets
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Sorted by relevance
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {datasets.map((dataset) => (
                    <DatasetCard key={dataset.id} dataset={dataset} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Database className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No datasets found</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Try adjusting your search query or filters to find what you're looking for.
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Start your search</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Enter a dataset name or description above to discover datasets from Kaggle, GitHub,
                HuggingFace, and government sources.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
