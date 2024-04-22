import React from 'react';

import { useStore } from '@/store/index';
import LoopIcon from '@/ui/icons/LoopIcon/LoopIcon';
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
        <LoopIcon active={isLoop} />
      </button>
    </div>
  );
});
