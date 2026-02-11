'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, apiClient } from '../lib/api';

interface User {
  id: string;
  clientId?: string;
  email: string;
  name?: string;
  phone?: string;
  country?: string;
  role: string;
  status: string;
  emailVerified: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    // Demo Mode: Skip checkAuth and set mock user immediately
    setUser({
      id: 'demo-user-id',
      email: 'demo@zuperior.com',
      name: 'Demo User',
      role: 'user',
      status: 'active',
      emailVerified: true
    });
    setIsLoading(false);
  }, []);

  const checkAuth = async () => {
    // No-op for demo
  };

  const login = async (email: string, password: string) => {
    // No-op for demo
  };

  const register = async (email: string, password: string, name?: string, phone?: string) => {
    // No-op for demo
  };

  const logout = async () => {
    // No-op for demo
  };

  const refreshUser = async () => {
    // No-op for demo
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: true, // Always authenticated in demo
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
