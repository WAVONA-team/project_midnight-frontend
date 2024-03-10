import React from 'react';
import { useStore } from '../../store/index.ts'

const PlayButton: React.FC = React.memo(() => {

  const changePlayerState = useStore((state) => state.changePlayerState)
  const playerState = useStore((state) => state.playerState)

  const changeState = () => {
    changePlayerState(!playerState);
  };

  return (
    <div>
      {playerState ? (
        <button onClick={changeState}>Pause</button>
      ) : (
        <button onClick={changeState}>Play</button>
      )}
    </div>
  );
});


export default PlayButton;
