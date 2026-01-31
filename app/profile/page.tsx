'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Loader2,
  User,
  Mail,
  Calendar,
  Link as LinkIcon,
  Check,
  ExternalLink,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { useAuth } from '@/lib/auth-context';
import { mockDatasets } from '@/lib/mock-data';
import { Dataset } from '@/lib/types';

const providerLogos: Record<string, { name: string; color: string; bgColor: string }> = {
  kaggle: { name: 'Kaggle', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  github: { name: 'GitHub', color: 'text-gray-400', bgColor: 'bg-gray-500/10' },
  huggingface: { name: 'HuggingFace', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, updateUser } = useAuth();
  const [savedDatasets, setSavedDatasets] = useState<Dataset[]>([]);
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user?.savedDatasets) {
      const datasets = mockDatasets.filter((d) => user.savedDatasets.includes(d.id));
      setSavedDatasets(datasets);
    }
  }, [user?.savedDatasets]);

  const handleConnect = async (provider: string) => {
    setConnectingProvider(provider);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (user) {
      const updatedAccounts = user.connectedAccounts.map((acc) =>
        acc.provider === provider
          ? { ...acc, connected: !acc.connected, username: acc.connected ? undefined : 'demo_user' }
          : acc
      );
      updateUser({ connectedAccounts: updatedAccounts });
    }
    setConnectingProvider(null);
  };

  const handleRemoveSaved = (datasetId: string) => {
    if (user) {
      const newSaved = user.savedDatasets.filter((id) => id !== datasetId);
      updateUser({ savedDatasets: newSaved });
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Profile</h1>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details and account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{user?.name || 'User'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user?.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Member since {memberSince}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connected Accounts Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              Link your accounts for seamless dataset access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user?.connectedAccounts.map((account) => {
                const provider = providerLogos[account.provider];
                return (
                  <div
                    key={account.provider}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${provider.bgColor}`}>
                        <span className={`text-sm font-bold ${provider.color}`}>
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{provider.name}</p>
                        {account.connected ? (
                          <p className="text-sm text-muted-foreground">
                            Connected as @{account.username}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={account.connected ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => handleConnect(account.provider)}
                      disabled={connectingProvider === account.provider}
                    >
                      {connectingProvider === account.provider ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : account.connected ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Connected
                        </>
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Saved Datasets Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Saved Datasets
            </CardTitle>
            <CardDescription>
              {savedDatasets.length > 0
                ? `You have ${savedDatasets.length} saved dataset${savedDatasets.length > 1 ? 's' : ''}`
                : 'No saved datasets yet'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedDatasets.length > 0 ? (
              <div className="space-y-3">
                {savedDatasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{dataset.title}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {dataset.source}
                        </Badge>
                      </div>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {dataset.description}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <Link href={`/dataset/${dataset.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSaved(dataset.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  You haven't saved any datasets yet. Search for datasets and save them for quick
                  access.
                </p>
                <Link href="/dashboard">
                  <Button className="mt-4">Search Datasets</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
