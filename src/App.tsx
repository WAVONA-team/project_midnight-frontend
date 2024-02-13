import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

const App: React.FC = React.memo(() => {
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
