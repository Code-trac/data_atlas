'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { User } from './types';
import { mockUser } from './mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session (mocked)
    const storedAuth = typeof window !== 'undefined' ? sessionStorage.getItem('auth') : null;
    if (storedAuth) {
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    const loggedInUser = { ...mockUser, email };
    setUser(loggedInUser);
    sessionStorage.setItem('auth', 'true');
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (email: string, _password: string, name: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newUser = { ...mockUser, email, name, id: `user-${Date.now()}` };
    setUser(newUser);
    sessionStorage.setItem('auth', 'true');
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('auth');
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
