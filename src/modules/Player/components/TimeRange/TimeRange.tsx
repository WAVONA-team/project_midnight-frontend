import React from 'react';

import { useStore } from '@/store';

import format from '@/modules/Player/helpers/format';

import InputRange from '@/ui/inputRange/InputRange.tsx';

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

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeCurrentTime(+event.target.value);
    changeSeekTo(+event.target.value);
  };

  return (
    <div>
      <p>{`${elapsed} : ${fullness}`}</p>

      <InputRange
        min={+elapsed}
        max={+fullness}
        value={currentTime}
        onChange={onChangeHandler}
        onMouseUp={() => changeSeeking(false)}
        onMouseDown={() => changeSeeking(true)}
      />
    </div>
  );
});
