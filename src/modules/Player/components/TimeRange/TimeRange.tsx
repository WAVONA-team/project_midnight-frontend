import React from 'react';

import { useStore } from '@/store/index';

import format from '@/modules/Player/helpers/format';

export const TimeRange: React.FC = React.memo(() => {
  const {
    currentTime,
    duration,
    changeSeeking,
    changeSeekTo,
    changeCurrentTime,
  } = useStore(
    ({
      currentTime,
      duration,
      changeSeeking,
      changeSeekTo,
      changeCurrentTime,
    }) => ({
      currentTime,
      duration,
      changeSeeking,
      changeSeekTo,
      changeCurrentTime,
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
          changeSeeking(true);
        }}
        onChange={(event) => {
          changeCurrentTime(+event.target.value);
          changeSeekTo(+event.target.value);
        }}
        onMouseUp={() => {
          changeSeeking(false);
        }}
        className="w-56"
      />
    </div>
  );
});
