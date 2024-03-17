import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useStore } from '@/store';

import { ExtendedPlayer } from '@/modules/Player/Components/ExtentedPlayer';

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
        <div>
          <ExtendedPlayer
            tracks={[
              'https://youtu.be/a9sHJdyVZ28?si=zTlhGY_sA17KnHzR',
              'https://youtu.be/VkTUP51JgWs?si=p_uIcis9EUUF7LHR',
              'https://youtu.be/UavO9mYpfuU?si=e_7TxNLQPvsFNB2B',
            ]}
          />
        </div>
      </main>

      <footer>Footer</footer>
    </>
  );
});

export default App;
