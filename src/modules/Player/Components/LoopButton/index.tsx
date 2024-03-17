import React from 'react';

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
      <button onClick={LoopHandler}>{isLoop ? 'UnLoop' : 'Loop'}</button>
    </div>
  );
});
