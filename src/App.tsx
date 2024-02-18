import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import { AuthContext } from './components/AuthProvider/AuthProvider';
import Loader from './ui/Loader/Loader';

const App: React.FC = React.memo(() => {
  const { checkAuth, isChecked } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader heightValue="5" widthValue="5" />;
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
