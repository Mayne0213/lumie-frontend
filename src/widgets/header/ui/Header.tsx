'use client';

import { useUser } from '@/entities/session';
import { useLogout } from '@/features/auth';
import { Button } from '@/src/shared/ui/Button';

export function Header() {
  const user = useUser();
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex justify-end items-center w-full">
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-muted-foreground">
              {user.name}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
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
  );
}
