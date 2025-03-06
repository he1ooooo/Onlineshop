import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/app/lib/auth-store';
import Link from 'next/link'
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // navigate('/admin/login');
      <Link href="/admin/login">Dashboard</Link>
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
