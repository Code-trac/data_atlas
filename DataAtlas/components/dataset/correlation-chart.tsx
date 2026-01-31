'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Correlation } from '@/lib/types';

interface CorrelationChartProps {
  correlations: Correlation[];
}

export function CorrelationChart({ correlations }: CorrelationChartProps) {
  if (!correlations || correlations.length === 0) {
    return null;
  }

  const data = correlations.map((c) => ({
    name: `${c.column1} vs ${c.column2}`,
    value: c.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Correlations</CardTitle>
        <CardDescription>Correlation coefficients between key features</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: 'Correlation',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 100, bottom: 10 }}
            >
              <XAxis
                type="number"
                domain={[0, 1]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                      <p className="text-sm font-medium text-card-foreground">
                        {payload[0].payload.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Correlation: {(payload[0].value as number).toFixed(2)}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.value > 0.7
                        ? 'hsl(var(--chart-1))'
                        : entry.value > 0.4
                          ? 'hsl(var(--chart-2))'
                          : 'hsl(var(--chart-3))'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
