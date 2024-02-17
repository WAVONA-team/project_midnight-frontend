import React from 'react';
import { Outlet } from 'react-router-dom';

const RequireAuthPage: React.FC = React.memo(() => {
  return <Outlet />;
});

export default RequireAuthPage;
