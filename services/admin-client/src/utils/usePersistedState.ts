import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { saveLocalStorageItem, getLocalStorageItem } from 'utils/localStorage';

function usePersistedState<T>(
  key: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    const storageValue = getLocalStorageItem(key);
    if (storageValue) return storageValue;
    return initialState;
  });

  useEffect(() => {
    saveLocalStorageItem(key, state);
  }, [state, key]);

  return [state, setState];
}

export default usePersistedState;
