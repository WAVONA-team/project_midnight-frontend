import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

const RequireAuthPage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default RequireAuthPage;
