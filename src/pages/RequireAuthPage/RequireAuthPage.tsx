import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@/store';

import { Controls, Playback } from '@/modules/Player';
import { createPlayerSlice } from '@/modules/Player/store';

import { NavBar } from '@/components/NavBar';

export const RequireAuthPage: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { currentTrack } = createPlayerSlice();

  const { user } = useStore(({ user }) => ({
    user,
  }));

  const [notificationGapMobile, setNotificationGapMobile] =
    useState<number>(80);
  const [notificationGapDesktop, setNotificationGapDesktop] =
    useState<number>(30);

  const handleControlIsOpen = () => {
    if (currentTrack) {
      setNotificationGapMobile(188);
      setNotificationGapDesktop(170);
    } else {
      setNotificationGapMobile(80);
      setNotificationGapDesktop(15);
    }
  };

  useEffect(() => {
    handleControlIsOpen();
  }, [currentTrack]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="
        h-dvh
        grid
        grid-rows-[1fr_max-content]
        lg:h-fit
        lg:grid-cols-[min-content_1fr]
        lg:grid-rows-none
      "
    >
      <NavBar className="order-2 lg:order-none" />

      <main className="order-1 lg:order-0">
        <Toaster
          containerClassName="lg:hidden"
          position="bottom-center"
          containerStyle={{
            bottom: notificationGapMobile,
            left: 0,
            right: 0,
            top: 0,
            color: 'rgba(235, 235, 235, 1)',
          }}
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
          }}
        />

        <Toaster
          containerClassName="absolute hidden lg:block"
          position="bottom-center"
          containerStyle={{
            bottom: notificationGapDesktop,
            left: 300,
            color: 'rgba(235, 235, 235, 1)',
          }}
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 1000,
          }}
        />

        {children || <Outlet />}

        {currentTrack && (
          <div className="sticky bottom-[4.5rem] lg:bottom-0">
            <Controls />
          </div>
        )}
      </main>

      <Playback />
    </div>
  );
};
