'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatasetMetrics } from '@/lib/types';
import { Rows3, Columns3, AlertCircle, Copy } from 'lucide-react';

interface MetricsCardsProps {
  metrics: DatasetMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: 'Rows',
      value: metrics.rows.toLocaleString(),
      icon: Rows3,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      title: 'Columns',
      value: metrics.columns.toString(),
      icon: Columns3,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      title: 'Missing Data',
      value: `${metrics.missingPercent}%`,
      icon: AlertCircle,
      color: metrics.missingPercent > 5 ? 'text-destructive' : 'text-chart-3',
      bgColor: metrics.missingPercent > 5 ? 'bg-destructive/10' : 'bg-chart-3/10',
    },
    {
      title: 'Duplicates',
      value: `${metrics.duplicatePercent}%`,
      icon: Copy,
      color: metrics.duplicatePercent > 2 ? 'text-warning' : 'text-chart-4',
      bgColor: metrics.duplicatePercent > 2 ? 'bg-warning/10' : 'bg-chart-4/10',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
