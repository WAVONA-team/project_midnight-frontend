import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
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

  const [notificationGapMobile, setNotificationGapMobile] =
    useState<number>(65);
  const [notificationGapDesktop, setNotificationGapDesktop] =
    useState<number>(15);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleControlIsOpen = () => {
    if (currentTrack) {
      setNotificationGapMobile(173);
      setNotificationGapDesktop(170);
    } else {
      setNotificationGapMobile(65);
      setNotificationGapDesktop(15);
    }
  };

  useEffect(() => {
    handleControlIsOpen();
  }, [currentTrack]);

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
          containerClassName="absolute block lg:hidden"
          position="bottom-center"
          containerStyle={{
            bottom: notificationGapMobile,
            left: 0,
            color: 'rgba(235, 235, 235, 1)',
          }}
          reverseOrder={false}
          gutter={8}
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
          <div className="sticky bottom-14 lg:bottom-0">
            <Controls />
          </div>
        )}
      </main>

      <Playback />
    </div>
  );
};
