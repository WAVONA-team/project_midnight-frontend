import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@/store';

import NavBar from '@/modules/NavBar';
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
    <>
      <div className=" flex flex-col justify-normal lg:flex-row-reverse lg:justify-end h-screen">
        <div className=' w-full'>
          <main className="">{children || <Outlet />}</main>
          <Controls />
        </div>
        <NavBar />
      </div>
    </>
  );
};
