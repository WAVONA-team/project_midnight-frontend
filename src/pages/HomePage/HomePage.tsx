import { useStore } from '@/store';

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = React.memo(() => {
  const { user, registerSpotify } = useStore(({ user, registerSpotify }) => ({
    user,
    registerSpotify,
  }));

  return (
    <>
      <p>{user?.id}</p>

      <Link to={'/test'}>Test page (protected)</Link>

      <button type="button" onClick={registerSpotify}>
        Spotify
      </button>
    </>
  );
});

export default HomePage;
