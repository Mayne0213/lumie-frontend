'use client';

import Link from 'next/link';
import { useUser, useIsAdmin } from '@/entities/session';
import { useLogout } from '@/features/auth';
import { Button } from '@/src/shared/ui/Button';

export function Header() {
  const user = useUser();
  const isAdmin = useIsAdmin();
  const { mutate: logout, isPending } = useLogout();

  const dashboardLink = isAdmin ? '/admin' : '/dashboard';

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={dashboardLink} className="text-xl font-bold text-gray-900">
            Lumie
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-gray-600">
                  {user.name}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    {user.role}
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  loading={isPending}
                >
                  로그아웃
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
