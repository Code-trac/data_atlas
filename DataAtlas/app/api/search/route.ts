import { NextResponse } from 'next/server';
import { mockDatasets } from '@/lib/mock-data';
import { SearchFilters } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, description, filters, page = 1, limit = 20 } = body;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let results = [...mockDatasets];

    // Filter by query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(lowerQuery) ||
          d.description.toLowerCase().includes(lowerQuery) ||
          d.tags.some((t: string) => t.toLowerCase().includes(lowerQuery))
      );
    }

    // Apply semantic boost from description
    if (description) {
      results = results.map((d) => ({
        ...d,
        relevanceScore: Math.min(100, d.relevanceScore + Math.floor(Math.random() * 10)),
      }));
    }

    // Apply filters
    if (filters) {
      const typedFilters = filters as SearchFilters;

      if (typedFilters.format?.length) {
        results = results.filter((d) => typedFilters.format?.includes(d.format));
      }

      if (typedFilters.source?.length) {
        results = results.filter((d) => typedFilters.source?.includes(d.source));
      }

      if (typedFilters.quality?.length) {
        results = results.filter((d) => typedFilters.quality?.includes(d.qualityScore));
      }

      if (typedFilters.size && typedFilters.size !== 'all') {
        results = results.filter((d) => {
          const bytes = d.sizeBytes;
          if (typedFilters.size === 'small') return bytes < 10 * 1024 * 1024;
          if (typedFilters.size === 'medium') return bytes >= 10 * 1024 * 1024 && bytes < 1024 * 1024 * 1024;
          if (typedFilters.size === 'large') return bytes >= 1024 * 1024 * 1024;
          return true;
        });
      }

      if (typedFilters.freshness && typedFilters.freshness !== 'all') {
        const now = new Date();
        const cutoffs: Record<string, number> = {
          day: 1,
          week: 7,
          month: 30,
          year: 365,
        };
        const days = cutoffs[typedFilters.freshness];
        if (days) {
          const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
          results = results.filter((d) => new Date(d.lastUpdated) >= cutoffDate);
        }
      }
    }

    // Sort by relevance
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Paginate
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      datasets: paginatedResults,
      total,
      page,
      totalPages,
    });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
