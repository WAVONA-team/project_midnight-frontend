import React from 'react';

import { useStore } from '@/store/index';

export const PlayButton: React.FC = React.memo(() => {
  const { playerState, changePlayerState } = useStore(
    ({ playerState, changePlayerState }) => ({
      playerState,
      changePlayerState,
    }),
  );
  const changeState = () => {
    changePlayerState(!playerState);
  };

  return (
    <div>
      <button onClick={changeState}>{playerState ? 'Pause' : 'Play'}</button>
    </div>
  );
});
