import React from 'react';

type Props = {
  playerState: boolean;
  setPlayerState: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayButton: React.FC<Props> = React.memo(({playerState, setPlayerState}) => {

  const Play = () => {
    setPlayerState(true);
  };

  const Pause = () => {
    setPlayerState(false);
  };

  return (
    <div>
      {playerState ? (
        <button onClick={Pause}>Pause</button>
      ) : (
        <button onClick={Play}>Play</button>
      )}
    </div>
  );
});


export default PlayButton;
