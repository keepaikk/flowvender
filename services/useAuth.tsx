// useAuth.tsx - React hook for authentication
// Persists auth state in localStorage

import { useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TOKEN_KEY = 'flowvender_token';
const USER_KEY = 'flowvender_user';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: 'customer' | 'vendor' | 'admin';
  verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  currentUser: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface LoginResult {
  user: AuthUser;
  token: string;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    currentUser: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser;
        setState({
          currentUser: user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setState({
          currentUser: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setState({
        currentUser: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: data.error || 'Login failed' };
      }

      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setState({
        currentUser: data.user,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  // Register function
  const register = useCallback(async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: data.error || 'Registration failed' };
      }

      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setState({
        currentUser: data.user,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Network error. Please try again.' };
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (token) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }

    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setState({
      currentUser: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  // Get current token
  const getToken = useCallback((): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  // Fetch current user from API (to refresh user data)
  const refreshUser = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setState(prev => ({
          ...prev,
          currentUser: data.user,
        }));
      } else {
        // Token invalid, logout
        logout();
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  }, [logout]);

  return {
    currentUser: state.currentUser,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    login,
    register,
    logout,
    getToken,
    refreshUser,
  };
};

export default useAuth;
