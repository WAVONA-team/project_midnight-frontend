import React, { useContext } from 'react';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

const HomePage: React.FC = React.memo(() => {
  const { user } = useContext(AuthContext);

  return <p>{user?.id}</p>;
});

export default HomePage;
