import { useState } from 'react';

// I have to set the returned type as tuple
// Otherwise, value would have type of T or Function
type TUseLocalStorage<T> = [T, (updatedValue: Function | T) => void];

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): TUseLocalStorage<T> => {
  const [value, setValue] = useState<T>(
    JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  const setLocal = (updatedValue: Function | T) => {
    const newValue =
      updatedValue instanceof Function ? updatedValue(value) : updatedValue;
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, setLocal];
};

export default useLocalStorage;
