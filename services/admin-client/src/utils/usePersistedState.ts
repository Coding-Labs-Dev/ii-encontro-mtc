import { useState, useEffect, Dispatch, SetStateAction } from 'react';


export default function usePersistedState<T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      try {
        return JSON.parse(storageValue);
      } catch (_) {
        return initialState;
      }
    }
    return initialState;

  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
