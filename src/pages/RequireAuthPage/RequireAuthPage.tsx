import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@/store';

import { Controls, Playback } from '@/modules/Player';

import { NavBar } from '@/components/NavBar';

export const RequireAuthPage: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, currentTrack } = useStore(({ user, currentTrack }) => ({
    user,
    currentTrack,
  }));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="
        grid
        grid-rows-[1fr_min-content]
        lg:grid-cols-[min-content_1fr]
        lg:grid-rows-none
      "
    >
      <NavBar className="order-2 lg:order-none" />

      <main className="order-1 lg:order-0">
        {children || <Outlet />}
        {currentTrack && (
          <div className="sticky bottom-0 z-10">
            <Controls />
          </div>
        )}
      </main>

      <Playback />
    </div>
  );
};
