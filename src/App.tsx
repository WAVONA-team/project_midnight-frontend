import { useStore } from '@/store';

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Player from './modules/Player';
import Loader from './ui/Loader/Loader';

const App: React.FC = React.memo(() => {
  const { isChecked, checkAuth } = useStore(({ isChecked, checkAuth }) => ({
    isChecked,
    checkAuth,
  }));

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader size={{ height: 'h-8', width: 'w-8' }} />;
  }

  return (
    <>
      <header>Header</header>

      <main>
        <Outlet />
        <Player tracks={['https://youtu.be/xkmNe5TJRao?si=SJOg1n0QKdlF2utC', 'https://youtu.be/VkTUP51JgWs?si=p_uIcis9EUUF7LHR', 'https://youtu.be/UavO9mYpfuU?si=e_7TxNLQPvsFNB2B']}/>
      </main>

      <footer>Footer</footer>
    </>
  );
});

export default App;
