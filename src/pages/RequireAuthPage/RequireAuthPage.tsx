import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useStore } from '@/store';

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
      <header>header</header>

      <main>{children || <Outlet />}</main>

      <footer>footer</footer>
    </>
  );
};
