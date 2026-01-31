import { 
  AuthResponse, 
  DatasetDetails, 
  LoginRequest, 
  SearchRequest, 
  SearchResponse, 
  SignupRequest, 
  User 
} from './types';

const API_BASE = '/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/profile');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Dataset endpoints
  async searchDatasets(params: SearchRequest): Promise<SearchResponse> {
    return this.request<SearchResponse>('/search', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getDataset(id: string): Promise<DatasetDetails> {
    return this.request<DatasetDetails>(`/dataset/${id}`);
  }

  async saveDataset(datasetId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/dataset/${datasetId}/save`, {
      method: 'POST',
    });
  }

  async unsaveDataset(datasetId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/dataset/${datasetId}/save`, {
      method: 'DELETE',
    });
  }

  // Account connections
  async connectAccount(provider: string): Promise<{ success: boolean; authUrl?: string }> {
    return this.request<{ success: boolean; authUrl?: string }>(`/connect/${provider}`, {
      method: 'POST',
    });
  }

  async disconnectAccount(provider: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/connect/${provider}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
