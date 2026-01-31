'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Distribution } from '@/lib/types';

interface DistributionChartProps {
  distributions: Distribution[];
}

export function DistributionChart({ distributions }: DistributionChartProps) {
  if (!distributions || distributions.length === 0) {
    return null;
  }

  const distribution = distributions[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Value Distribution</CardTitle>
        <CardDescription>
          Distribution of values in &quot;{distribution.column}&quot; column
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: 'Count',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution.bins} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                      <p className="text-sm font-medium text-card-foreground">
                        {payload[0].payload.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Count: {payload[0].value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
