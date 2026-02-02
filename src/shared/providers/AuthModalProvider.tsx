'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type AuthModalType = 'login' | 'register' | null;

interface AuthModalContextType {
  modalType: AuthModalType;
  callbackUrl: string | null;
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | null>(null);

function AuthModalProviderInner({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<AuthModalType>(null);
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Check for auth query param on mount and when searchParams change
  useEffect(() => {
    const authParam = searchParams.get('auth');
    const callback = searchParams.get('callbackUrl');
    if (authParam === 'login') {
      setModalType('login');
      setCallbackUrl(callback);
    } else if (authParam === 'register') {
      setModalType('register');
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  const openLogin = useCallback(() => setModalType('login'), []);
  const openRegister = useCallback(() => setModalType('register'), []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setCallbackUrl(null);
    // Remove auth param from URL if present
    const params = new URLSearchParams(searchParams.toString());
    if (params.has('auth')) {
      params.delete('auth');
      params.delete('callbackUrl');
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newUrl);
    }
  }, [searchParams, pathname, router]);

  return (
    <AuthModalContext.Provider value={{ modalType, callbackUrl, openLogin, openRegister, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthModalProviderInner>{children}</AuthModalProviderInner>
    </Suspense>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
}
