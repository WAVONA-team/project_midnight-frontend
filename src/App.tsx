import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import { AuthContext } from './components/AuthProvider/AuthProvider';

const App: React.FC = React.memo(() => {
  const { checkAuth, isChecked } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <p>Checking...</p>;
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
