import { useEffect, useState } from 'react';

export const useDebounce = (value, time: number) => {
  const [debounceValue, setDebounceValue] = useState();

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), time);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debounceValue;
};
