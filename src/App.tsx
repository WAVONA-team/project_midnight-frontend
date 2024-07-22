import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { LoadingPage } from '@/pages';
import { useStore } from '@/store';

import { NotificationMessage } from '@/ui/NotificationMessage';

const App: React.FC = React.memo(() => {
  const { isChecked, checkAuth } = useStore(({ isChecked, checkAuth }) => ({
    isChecked,
    checkAuth,
  }));

  useEffect(() => {
    checkAuth().catch(() => {
      toast.custom(() => (
        <NotificationMessage message="Во время авторизации произошла ошибка, попробуйте еще раз" />
      ));
    });
  }, []);

  return isChecked ? <Outlet /> : <LoadingPage />;
});

export default App;
