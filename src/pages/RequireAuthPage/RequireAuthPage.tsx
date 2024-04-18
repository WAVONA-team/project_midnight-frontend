import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@/store';

import { NavBar } from '@/components/NavBar';
import { Controls } from '@/modules/Player';

export const RequireAuthPage: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useStore(({ user }) => ({
    user,
  }));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="
        h-full
        grid
        grid-rows-[1fr_min-content]
        lg:grid-cols-[min-content_1fr]
        lg:grid-rows-none
      "
    >
      <NavBar className="order-2 lg:order-none" />

      <main className="h-full order-1 lg:order-0">
        {children || <Outlet />}
        <Controls />
      </main>
    </div>
  );
};
