import React from 'react';

import { useStore } from '@/store/index';

import format from '@/modules/Player/helpers/format';

export const TimeRange: React.FC = React.memo(() => {
  const { currentTime, duration, changeSeeking, changeSeekTo } = useStore(
    ({ currentTime, duration, changeSeeking, changeSeekTo }) => ({
      currentTime,
      duration,
      changeSeeking,
      changeSeekTo,
    }),
  );

  const elapsed = format(currentTime * duration);
  const fullness = format(duration);

  return (
    <div>
      <p>{`${elapsed} : ${fullness}`}</p>

      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={currentTime}
        onMouseDown={() => {
          console.log('mouse down');
          changeSeeking(true);
        }}
        onMouseUp={(event) => {
          console.log('mouse up');
          changeSeeking(false);
          changeSeekTo(+event.currentTarget.value);
        }}
        className="w-56"
      />
    </div>
  );
});
