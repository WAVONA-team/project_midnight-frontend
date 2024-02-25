import { useStore } from '@/store';

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuthPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useStore(({ user }) => ({
    user,
  }));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};
