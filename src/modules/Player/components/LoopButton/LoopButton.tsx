import React from 'react';

import { createPlayerSlice } from '@/modules/Player/store';

import LoopIcon from '@/ui/icons/LoopIcon/LoopIcon';

export const LoopButton: React.FC = React.memo(() => {
  const { isLoop, changeIsLoop } = createPlayerSlice();
  const LoopHandler = () => {
    changeIsLoop(!isLoop);
  };

  return (
    <div>
      <button
        type="button"
        onClick={LoopHandler}
        className="focus:outline-none"
      >
        <LoopIcon active={isLoop} />
      </button>
    </div>
  );
});
