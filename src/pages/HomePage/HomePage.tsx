import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';

const HomePage: React.FC = React.memo(() => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <p>{user?.id}</p>

      <Link to={'/test'}>Test page (protected)</Link>
    </>
  );
});

export default HomePage;
