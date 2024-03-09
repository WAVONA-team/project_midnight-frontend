import { useStore } from '@/store';

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingPage } from '@/pages';

const App: React.FC = React.memo(() => {
  const { isChecked, checkAuth } = useStore(({ isChecked, checkAuth }) => ({
    isChecked,
    checkAuth,
  }));

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <LoadingPage />;
  }

  return (
    <>
      <header>Header</header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
});

export default App;
