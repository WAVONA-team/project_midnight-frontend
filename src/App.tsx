import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingPage } from '@/pages';
import { useStore } from '@/store';

const App: React.FC = React.memo(() => {
  const { isChecked, checkAuth } = useStore(({ isChecked, checkAuth }) => ({
    isChecked,
    checkAuth,
  }));

  useEffect(() => {
    checkAuth();
  }, []);

  return isChecked ? <Outlet /> : <LoadingPage />;
});

export default App;
