import React, {useEffect}  from 'react';
import { useStore } from '../../store/index.ts'

const TimeRange: React.FC = React.memo(() => {

  const duration = useStore((state) => state.duration)
  const secondsLoaded = useStore((state) => state.secondsLoaded)
  const currentTime = useStore((state) => state.currentTime)
  const changeTrackNumber = useStore((state) => state.changeTrackNumber)
  const trackNumber = useStore((state) => state.trackNumber)

  const calculatePercentage = (value: number | undefined, total: number | undefined) => {

    if (typeof value === 'undefined' || typeof total === 'undefined' || total === 0) {
      return 0;
    }
    return (value / total) * 100;

  };

  const calculateMinutes = (seconds: number | undefined) => {
    if (typeof seconds === 'undefined') {
      return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutes}:${formattedSeconds}`;

  };

  const loadedPercentage = calculatePercentage(secondsLoaded, duration);
  const currentTimePercentage = calculatePercentage(currentTime, duration);
  const durationMinutes = calculateMinutes(duration)
  const currentMinutes = calculateMinutes(currentTime)

  useEffect(() => {
    if (Math.floor(currentTime + 1) == duration) {
      changeTrackNumber(trackNumber + 1)
    }
  }, [currentTime]);

  return (
    <div>
      <p>{currentMinutes} : {durationMinutes}</p>
      <div className='bg-on-secondary-dim-gray w-96 h-1 border-0 rounded-full relative'>
        <div className='bg-on-primary-lavender-blush absolute h-1' style={{width: `${loadedPercentage}%`}}>
        </div>
        <div className='bg-secondary-cadet-gray absolute h-1' style={{width: `${currentTimePercentage}%`}}>
        </div>
      </div>
    </div>
  );
});

export default TimeRange;
