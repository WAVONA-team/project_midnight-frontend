import React from 'react';

import { useStore } from '@/store';

import format from '@/shared/helpers/format';

import { RangeInput } from '@/ui/Input';

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
      <RangeInput
        min={0}
        max={1}
        step="any"
        value={currentTime}
        multiplier={100}
        onChange={onChangeHandler}
        onMouseUp={() => changeSeeking(false)}
        onMouseDown={() => changeSeeking(true)}
        rangeColor="bg-track-range-gradient"
        inputClassName="[&::-webkit-slider-thumb]:bg-primary-poppy"
      />
      <div className="lg:flex justify-between text-on-primary-anti-flash-white hidden mt-3 text-sm">
        <p>{`${elapsed}`}</p>
        <p>{`${fullness}`}</p>
      </div>
    </div>
  );
});
