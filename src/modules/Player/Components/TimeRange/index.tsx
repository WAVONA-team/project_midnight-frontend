import React, { useEffect } from 'react';

import { useStore } from '@/store/index';

export const TimeRange: React.FC = React.memo(() => {
  const {
    trackNumber,
    currentTime,
    duration,
    changeSeeking,
    changeTrackNumber,
    changeSeekTo,
  } = useStore(
    ({
      trackNumber,
      currentTime,
      duration,
      changeSeeking,
      changeTrackNumber,
      changeSeekTo,
    }) => ({
      trackNumber,
      currentTime,
      duration,
      changeSeeking,
      changeTrackNumber,
      changeSeekTo,
    }),
  );
  const calculateMinutes = (seconds: number | undefined) => {
    if (typeof seconds === 'undefined') {
      return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  const durationMinutes = calculateMinutes(duration);
  const currentMinutes = calculateMinutes(currentTime);
  const rangeProcentage = (currentTime / duration) * 0.999999;
  useEffect(() => {
    if (Math.floor(currentTime + 1) == duration) {
      changeTrackNumber(trackNumber + 1);
    }
  }, [currentTime]);
  return (
    <div>
      <p>
        {currentTime.toString().slice(0,4)} : {durationMinutes}
      </p>
      <input
        type="range"
        min={0}
        max={0.999999}
        step="any"
        value={rangeProcentage}
        onMouseDown={() => {
          changeSeeking(true);
        }}
        onMouseUp={(event) => {
          changeSeeking(false);
          changeSeekTo(+event.currentTarget.value);
          console.log('event', event.currentTarget.value);
        }}
        className=" w-56"
      />
    </div>
  );
});
