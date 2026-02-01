'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from './schema';
import { storage } from '@/src/shared/lib/storage';

interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: user !== null,
        }),

      setTokens: (accessToken, refreshToken) => {
        storage.setTokens(accessToken, refreshToken);
      },

      login: (user, accessToken, refreshToken) => {
        storage.setTokens(accessToken, refreshToken);
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        storage.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'lumie-session',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);

// Selector hooks for common use cases
export const useUser = () => useSessionStore((state) => state.user);
export const useIsAuthenticated = () => useSessionStore((state) => state.isAuthenticated);
export const useUserRole = (): Role | null => useSessionStore((state) => state.user?.role ?? null);
export const useIsAdmin = () =>
  useSessionStore((state) => state.user?.role === 'ADMIN' || state.user?.role === 'DEVELOPER');
export const useIsStudent = () => useSessionStore((state) => state.user?.role === 'STUDENT');
