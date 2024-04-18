import React from 'react';
import loop from '@/assets/buttons/playerButtons/loop.svg';

import { useStore } from '@/store/index';

export const LoopButton: React.FC = React.memo(() => {
  const { changeIsLoop, isLoop } = useStore(({ changeIsLoop, isLoop }) => ({
    changeIsLoop,
    isLoop,
  }));

  const LoopHandler = () => {
    changeIsLoop(!isLoop);
  };

  return (
    <div>
      <button type="button" onClick={LoopHandler}>
        <img src={loop} alt="" />
      </button>
    </div>
  );
});
