/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, time: number): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), time);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debounceValue;
};
