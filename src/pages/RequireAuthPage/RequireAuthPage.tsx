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

  const [notificationGapControl, setNotificationGapControl] =
    useState<number>(15);
  const [notificationGapModal, setNotificationGapModal] = useState<number>(65);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleControlIsOpen = () => {
    if (currentTrack) {
      setNotificationGapControl(170);
      setNotificationGapModal(230);
    } else {
      setNotificationGapControl(15);
      setNotificationGapModal(65);
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

      <div className="absolute hidden lg:block">
        <Toaster
          position="bottom-center"
          containerStyle={{
            bottom: notificationGapControl,
            left: 300,
            color: 'rgba(235, 235, 235, 1)',
          }}
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 1000,
            style: {
              zIndex: 999,
              backgroundColor: 'rgba(23, 25, 22, 1)',
            },
          }}
        />
      </div>

      <div className="absolute block lg:hidden">
        <Toaster
          position="bottom-center"
          containerStyle={{
            bottom: notificationGapModal,
            left: 0,
            color: 'rgba(235, 235, 235, 1)',
          }}
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>

      <main className="order-1 lg:order-0">
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
